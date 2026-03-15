export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body || {};

    if (!message) {
      return res.status(400).json({ error: "Falta el mensaje" });
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://paranati.vercel.app",
          "X-Title": "Paranati",
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct:free",
          messages: [
            {
              role: "user",
              content: message,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data?.error?.message || "Error OpenRouter",
        details: data,
      });
    }

    const reply =
      data?.choices?.[0]?.message?.content ||
      "No hubo respuesta";

    return res.status(200).json({ reply });

  } catch (error) {
    return res.status(500).json({
      error: "Error interno",
      details: error.message,
    });
  }
}
