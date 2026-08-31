export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return res.status(500).json({ error: 'Falta configuración de Supabase' });
  }

  const r = await fetch(
    `${url}/rest/v1/numeros_publicos?select=numero,estado&order=numero.asc`,
    {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`
      }
    }
  );

  const d = await r.json();
  return res.status(r.status).json(d);
}
