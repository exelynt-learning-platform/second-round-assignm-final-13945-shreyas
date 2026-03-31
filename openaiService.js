export const sendMessageToAPI = async (message) => {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",   //  updated model
      messages: [
        { role: "user", content: message }
      ],
    }),
  });

  const data = await response.json();
  //  return "Hello! This is temparary data";
  if (!response.ok) {
    console.error(data);   
    throw new Error(data.error?.message || "API Error");
  }

  return data.choices[0].message.content;
};