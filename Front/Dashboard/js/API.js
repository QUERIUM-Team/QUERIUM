/** @format */

async function login(event) {
  event.preventDefault(); // Prevent the default form submission

  const email = document.getElementById("emailInput").value;
  const password = document.getElementById("passwordInput").value;

  try {
    const response = await fetch(
      "http://querium13.runasp.net/api/Admin/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();

    if (data.message === "Login successful") {
      window.location.href = "home.html";
    } else {
      document.getElementById("error").textContent =
        "Login failed. Please check your credentials.";
    }
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("error").textContent =
      "An error occurred. Please try again.";
  }
}
