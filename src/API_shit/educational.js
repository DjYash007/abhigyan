async function saveEduData() {
  const output = document.getElementById("outputBox");
  output.innerText = "Generating AI study plan...";

  // === BASIC DETAILS ===
  const age = document.getElementById("age")?.value || "";
  const educationLevel = document.getElementById("educationLevel")?.value || "";
  const branch = document.getElementById("branch")?.value || "";
  const semester = document.getElementById("semester")?.value || "";

  // === GOAL ===
  const goal = document.getElementById("goal")?.value || "";

  // === SUBJECT INFO ===
  const subjects = document.getElementById("subjects")?.value || "";
  const weak = document.getElementById("weak")?.value || "";
  const strong = document.getElementById("strong")?.value || "";

  // === DAILY SCHEDULE ===
  const freeHours = document.getElementById("freeHours")?.value || "";
  const wakeTime = document.getElementById("wakeTime")?.value || "";

  // === PROBLEMS ===
  const problems = document.getElementById("problems")?.value || "";

  // === LIFESTYLE DETAILS ===
  const sleep = document.getElementById("sleep")?.value || "";
  const exercise = document.getElementById("exercise")?.value || "";
  const stress = document.getElementById("stress")?.value || "";
  const social = document.getElementById("social")?.value || "";

  // === LONG TERM VISION ===
  const vision = document.getElementById("vision")?.value || "";

  // === STRONG PROMPT ===
  const prompt = `
You are an elite academic mentor and productivity strategist.

Create a highly personalized study transformation system.

STUDENT PROFILE:
Age: ${age}
Education Level: ${educationLevel}
Branch/Stream: ${branch}
Semester/Year: ${semester}

MAIN GOAL:
${goal}

SUBJECTS:
All Subjects: ${subjects}
Weak Subjects: ${weak}
Strong Subjects: ${strong}

TIME AVAILABILITY:
Free study hours/day: ${freeHours}
Wake up time: ${wakeTime}

LIFESTYLE:
Sleep hours: ${sleep}
Exercise: ${exercise}
Stress level: ${stress}
Social media usage: ${social}

CURRENT PROBLEMS:
${problems}

LONG TERM VISION:
${vision}

CREATE OUTPUT IN THIS FORMAT:

📘 DAILY STUDY ROUTINE
- Exact time-block system
- Best time to study weak subjects

📚 SUBJECT STRATEGY
- Priority order
- Weak subject recovery plan
- Strong subject mastery

🧠 FOCUS & PRODUCTIVITY SYSTEM
- Anti-procrastination strategy
- Deep work techniques

📅 WEEKLY PLAN
- Revision schedule
- Practice cycle

🔥 MOTIVATION ENGINE
- Mindset shift
- Discipline advice

🎯 LONG TERM ROADMAP
- How this leads to: ${vision}

Keep it practical, structured, and motivating.
`;

  try {
    const API_KEY = "AIzaSyAzOV5mFIaa7s5Wtt1Xsdvpi2Xgqa1jzbI";

    const res = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ]
    })
  }
);

    const data = await res.json();

    const plan =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "AI could not generate a plan.";

    // Format nicely
    output.innerHTML = plan.replace(/\n/g, "<br>");

  } catch (err) {
    console.log(err);
    output.innerText = "Error generating study plan.";
  }
}
