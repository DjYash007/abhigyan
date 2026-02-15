import { loginWithGoogle } from "./firebase.js";

document.getElementById("loginBtn").addEventListener("click", async () => {

  const user = await loginWithGoogle();

  if (!user) {
    alert("Login failed");
    return;
  }

  console.log("Logged in:", user.displayName);

  localStorage.setItem("userName", user.displayName);
  localStorage.setItem("userEmail", user.email);
  localStorage.setItem("userUID", user.uid);

  window.location.href = "home_page.html";
});
