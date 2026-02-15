async function saveData() {
  const output = document.getElementById("outputBox");
  output.innerText = "Generating plan with AI...";

  // Collect a few key fields (you can add more later)
  const age = document.getElementById("age")?.value || "N/A";
  const gender = document.getElementById("gender")?.value || "N/A";
  const height = document.getElementById("height")?.value || "N/A";
  const weight = document.getElementById("weight")?.value || "N/A";
  const goal = document.getElementById("goalmain")?.value || "General fitness";
  const experience = document.getElementById("explevel")?.value || "Beginner";
  const days = document.getElementById("daysperweek")?.value || "4";
  const minutes = document.getElementById("minutepersession")?.value || "30";
  const sleep = document.getElementById("sleephrs")?.value || "7";
  const stress = document.getElementById("stresslevel")?.value || "Medium";

  // Build a strong prompt
  const prompt = `
You are an elite lifestyle transformation coach, fitness planner, and habit expert.

Create a highly personalized and realistic improvement plan.

USER PROFILE:
Age: ${age}
Gender: ${gender}
Height: ${height}
Weight: ${weight}
Body Type: ${bodytype}
Screen Time: ${screenTime}
Main Goal: ${goal}
Experience Level: ${experience}
Workout Access: ${equipment}
Workout Days per Week: ${days}
Session Duration: ${minutes} minutes
Sleep Hours: ${sleep}
Stress Level: ${stress}


REQUIREMENTS:

Create a structured plan with these sections:

1 WORKOUT PLAN
- Weekly structure
- Beginner-friendly progression
- Rest & recovery advice

2 DIET GUIDANCE
- Protein focus
- Simple practical suggestions

3 DAILY ROUTINE
- Morning → Evening flow
- Habit stacking

4 HABIT CHANGES
- Reduce screen time
- Improve discipline

5 MINDSET & MOTIVATION
- Consistency strategy

Keep it practical, structured, and motivating.
Avoid generic advice.
`;


  try {
    const API_KEY = "AIzaSyAzOV5mFIaa7s5Wtt1Xsdvpi2Xgqa1jzbI";

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await res.json();
    console.log(data)
    const plan =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response received from AI.";

    output.innerText = plan;

  } catch (err) {
    console.log(err);
    output.innerText = "Error connecting to AI. Check API key & network.";
  }
}

