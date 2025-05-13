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

// ! Get All Questions Function.
if (window.location.pathname.includes("questions")) {
  // 🔽 All your JS goes here
  const mode = "first";
  const apiUrl = "http://querium13.runasp.net/api/FileUpload/questions";

  fetch(apiUrl)
    .then((response) => {
      console.log("API response status:", response.status);
      return response.json();
    })
    .then((data) => {
      console.log("API data:", data);
      const questionsArray = data.questions;

      if (!Array.isArray(questionsArray))
        throw new Error("Questions array not found");

      const container = document.querySelector(".row");
      container.innerHTML = "";

      const questionsToRender =
        mode === "first"
          ? questionsArray.slice(0, 20)
          : questionsArray.slice(-20);

      questionsToRender.forEach((q) => {
        const correctAnswer = q.correctAnswer;
        const correctIndex = q.answers.findIndex((a) => a === correctAnswer);

        const labels = ["A", "B", "C", "D"];

        const card = document.createElement("div");
        card.className = "number-card col-lg-6 col-md-12 col-sm-12";
        card.innerHTML = `
          <div class="answer-card">
            <div class="question-head"> - ${q.questionText}</div>
            <ul>
              ${q.answers
                .map((answer, idx) => `<li>${labels[idx]}) ${answer}</li>`)
                .join("")}
            </ul>
            <div class="correct-answer">
              <p>Correct Answer:</p>
              <div class="answer">${correctAnswer}</div>
            </div>
          </div>
        `;
        container.appendChild(card);
      });
    })
    .catch((err) => {
      console.error("Error fetching questions:", err);
      document.querySelector(
        ".row"
      ).innerHTML = `<p style="color:red">Failed to load questions. Please try again later.</p>`;
    });
}

if (window.location.pathname.includes("questions")) {
  var mode = "first";
  if (window.location.pathname.includes("questionsai")) {
    mode = "last";
  }
  const apiUrl = "http://querium13.runasp.net/api/FileUpload/questions";

  fetch(apiUrl)
    .then((response) => {
      console.log("API response status:", response.status);
      return response.json();
    })
    .then((data) => {
      console.log("API data:", data);
      const questionsArray = data.questions;

      if (!Array.isArray(questionsArray))
        throw new Error("Questions array not found");

      const container = document.querySelector(".row");
      container.innerHTML = "";

      const questionsToRender =
        mode === "first"
          ? questionsArray.slice(0, 20)
          : questionsArray.slice(-20);

      questionsToRender.forEach((q) => {
        const correctAnswer = q.correctAnswer;
        const correctIndex = q.answers.findIndex((a) => a === correctAnswer);

        const labels = ["A", "B", "C", "D"];

        const card = document.createElement("div");
        card.className = "number-card col-lg-6 col-md-12 col-sm-12";
        card.innerHTML = `
          <div class="answer-card">
            <div class="question-head"> - ${q.questionText}</div>
            <ul>
              ${q.answers
                .map((answer, idx) => `<li>${labels[idx]}) ${answer}</li>`)
                .join("")}
            </ul>
            <div class="correct-answer">
              <p>Correct Answer:</p>
              <div class="answer">${correctAnswer}</div>
            </div>
          </div>
        `;
        container.appendChild(card);
      });
    })
    .catch((err) => {
      console.error("Error fetching questions:", err);
      document.querySelector(
        ".row"
      ).innerHTML = `<p style="color:red">Failed to load questions. Please try again later.</p>`;
    });
}
