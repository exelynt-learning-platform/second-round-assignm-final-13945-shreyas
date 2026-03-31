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
          ...history, // ✅ conversation context
          { role: "user", content: message },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.error?.message || "API request failed");
    }

    const data = await response.json();

    if (!data?.choices?.length) {
      throw new Error("Invalid API response");
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};