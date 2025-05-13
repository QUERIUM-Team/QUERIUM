/** @format */

// ! Login Function.
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

// ! Logout Function.
async function logout() {
  const messageDiv = document.getElementById("logout-message");
  messageDiv.className = "logout-message"; // reset styles
  messageDiv.textContent = ""; // clear old message

  try {
    const response = await fetch(
      "http://querium13.runasp.net/api/Admin/logout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    messageDiv.textContent = data.message;

    if (data.message === "Admin logout successful") {
      messageDiv.classList.add("success");
      setTimeout(() => {
        window.location.href = "log-out.html";
      }, 200); // redirect after 2s
    } else {
      messageDiv.classList.add("error");
    }
  } catch (error) {
    messageDiv.textContent = "An error occurred during logout.";
    messageDiv.classList.add("error");
  }
}
