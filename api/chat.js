export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body || {};

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Faltan los mensajes" });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://paranati.vercel.app",
        "X-Title": "Paranati"
      },
      body: JSON.stringify({
        model: "openrouter/free",
        messages: [
          {
            role: "system",
            content: "Eres un asistente especializado en parafarmacia. Responde siempre en español, de forma clara, útil y profesional. Explica conceptos de dermocosmética, nutrición, fitoterapia, medicamentos OTC, higiene, ortopedia, puericultura y salud general sin sonar demasiado técnico. Si algo requiere diagnóstico médico o urgencia, recomienda consultar a un profesional sanitario."
          },
          ...messages
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data?.error?.message || "Error al llamar a OpenRouter"
      });
    }

    const reply =
      data?.choices?.[0]?.message?.content ||
      "No hubo respuesta del modelo.";

    return res.status(200).json({ reply });
  } catch (error) {
    return res.status(500).json({
      error: "Error interno del servidor"
    });
  }
}
