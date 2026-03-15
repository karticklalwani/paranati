export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array required' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: `Eres un experto en parafarmacia y farmacia. Ayudas a estudiantes de parafarmacia a comprender conceptos.
Responde siempre en español, de forma clara, precisa y didáctica.
Estructura tus respuestas con definición, uso principal y dato clave a recordar cuando sea útil.
Si preguntan algo no relacionado con salud o parafarmacia, redirige amablemente.
Usa negritas (**texto**) y listas cuando ayuden a la comprensión.`,
        messages,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || 'API error' });
    }

    return res.status(200).json({ reply: data.content?.[0]?.text || '' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
