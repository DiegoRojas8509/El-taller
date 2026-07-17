create table public.registros (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  instagram_username text not null,
  codigo text not null unique,
  estado text not null default 'pendiente' check (estado in ('pendiente', 'confirmado')),
  created_at timestamptz not null default now()
);

alter table public.registros enable row level security;

-- No hay política de insert directo para anon: el único camino para crear
-- un registro es la función registrar_participante() de abajo, que revisa
-- el cupo de forma atómica antes de insertar.

create policy "solo autenticados pueden ver registros"
  on public.registros for select
  to authenticated
  using (true);

create policy "solo autenticados pueden confirmar registros"
  on public.registros for update
  to authenticated
  using (true)
  with check (true);

-- ── Contador de cupo (una sola fila, id fijo = 1) ────────────────────────

create table public.registro_contador (
  id smallint primary key default 1 check (id = 1),
  total int not null default 0,
  cupo_maximo int not null default 100
);

insert into public.registro_contador (id, total, cupo_maximo) values (1, 0, 100);

alter table public.registro_contador enable row level security;

create policy "cualquiera puede leer el contador"
  on public.registro_contador for select
  to anon, authenticated
  using (true);
-- Sin política de insert/update/delete para anon/authenticated: el único
-- camino para modificar `total` es la función registrar_participante().

-- ── RPC atómico: revisa cupo + inserta + incrementa, todo o nada ────────

create or replace function public.registrar_participante(
  p_nombre text,
  p_instagram_username text,
  p_codigo text
)
returns public.registros
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_total int;
  v_max   int;
  v_registro public.registros;
begin
  -- Bloqueo de fila sobre el contador: cualquier llamada concurrente a esta
  -- función espera aquí hasta que la anterior termine, lo que vuelve atómica
  -- la secuencia leer-revisar-incrementar sin importar cuántas lleguen a la vez.
  select total, cupo_maximo into v_total, v_max
  from public.registro_contador
  where id = 1
  for update;

  if v_total >= v_max then
    raise exception 'CUPO_LLENO';
  end if;

  insert into public.registros (nombre, instagram_username, codigo)
  values (trim(p_nombre), lower(trim(p_instagram_username)), p_codigo)
  returning * into v_registro;
  -- Si p_codigo colisiona con uno existente, esto lanza 23505 y toda la
  -- función (incluido el lock) hace rollback — total NO se incrementa.
  -- El cliente debe capturar 23505 y reintentar con un código nuevo.

  update public.registro_contador
  set total = total + 1
  where id = 1;

  return v_registro;
end;
$$;

revoke all on function public.registrar_participante(text, text, text) from public;
grant execute on function public.registrar_participante(text, text, text) to anon, authenticated;

-- ── Realtime en el contador (para que el badge suba en vivo) ────────────

alter publication supabase_realtime add table public.registro_contador;

-- ── Sorteo: entrega la lista solo si la clave secreta es correcta ───────
-- La tabla `registros` NO es legible por anon (ver políticas de arriba).
-- Esta función es el único camino para leerla sin sesión iniciada, y exige
-- la clave que vive en la URL de la ruta secreta del sorteo.

create or replace function public.sortear_participantes(p_clave text)
returns setof public.registros
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if p_clave is distinct from 'RULETA-TALLER-2026' then
    raise exception 'CLAVE_INVALIDA';
  end if;

  return query select * from public.registros order by created_at;
end;
$$;

revoke all on function public.sortear_participantes(text) from public;
grant execute on function public.sortear_participantes(text) to anon, authenticated;
