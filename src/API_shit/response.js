export async function generatePlan() {
  const res = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=YOUR_API_KEY",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: "Say hello in one sentence." }
            ]
          }
        ]
      })
    }
  );

  const data = await res.json();
  console.log(data);
  return data;
}
