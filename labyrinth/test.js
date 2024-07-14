const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: "ok",
  baseURL: "https://api.aimlapi.com",
});

(async () => {
  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are here to help people with coding" },
      { role: "user", content: "Explain how verctor works in c++" }
    ],
    temperature: 0.7,
    max_tokens: 128,
  });
  console.log("AI/ML API:\n", chatCompletion.choices[0].message.content);
})();

