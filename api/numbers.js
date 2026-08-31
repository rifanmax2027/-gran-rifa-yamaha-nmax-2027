export default async function handler(req, res) {
  try {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !key) {
      return res.status(500).json({
        error: "Faltan las variables de Supabase en Vercel"
      });
    }

    const response = await fetch(
      `${url}/rest/v1/numbers?select=id,numero,estado&order=numero.asc`,
      {
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`
        }
      }
    );

    if (!response.ok) {
      const error = await response.text();

      return res.status(response.status).json({
        error
      });
    }

    const data = await response.json();

    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({
      error: "Error conectando con Supabase"
    });
  }
}
