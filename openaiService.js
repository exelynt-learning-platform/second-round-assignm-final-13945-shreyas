export const sendMessageToAPI = async (message, history = []) => {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          ...history, // ✅ include full conversation
          { role: "user", content: message },
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => null);
      throw new Error(err?.error?.message || "API Error");
    }

    const data = await response.json();

    return data.choices[0].message.content;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};