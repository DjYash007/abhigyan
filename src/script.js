import { loginWithGoogle } from "./firebase.js";

document.getElementById("loginBtn").addEventListener("click", async () => {
  try {
    const user = await loginWithGoogle();

    console.log("Logged in:", user.displayName);

    // Save user in localStorage (so next pages can access)
    localStorage.setItem("userName", user.displayName);
    localStorage.setItem("userEmail", user.email);
    localStorage.setItem("userUID", user.uid);

    // Redirect to form page
    window.location.href = "home_page.html";

  } catch (error) {
    console.error(error);
    alert("Login failed");
  }
});
