/** @format */

// ! Login Function.
async function login(event) {
  event.preventDefault(); // Prevent the default form submission

  const email = document.getElementById("emailInput").value;
  const password = document.getElementById("passwordInput").value;

  try {
    const response = await fetch(
      "https://querium13.runasp.net/api/Admin/login",
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
  try {
    const response = await fetch(
      "https://querium13.runasp.net/api/Admin/logout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (data.message === "Admin logout successful") {
      setTimeout(() => {
        window.location.href = "log-out.html";
      }, 200); // redirect after 0.2s
    } else {
    }
  } catch (error) {}
}

// ! Get All Questions Function.
if (window.location.pathname.includes("questions")) {
  // 🔽 All your JS goes here
  const mode = "first";
  const apiUrl = "https://querium13.runasp.net/api/FileUpload/questions";

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
  const apiUrl = "https://querium13.runasp.net/api/FileUpload/questions";

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
// ! Function to approve a student
function approveStudent(universityIDCard) {
  const url = `https://querium13.runasp.net/api/admin/approve-student/${universityIDCard}`;
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer YOUR_TOKEN", // Replace with your token if needed
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Approval Successful:", data);

      // Find the row with the student using their universityIDCard
      const row = document.querySelector(
        `tr[data-university-id="${universityIDCard}"]`
      );
      const statusCell = row.querySelector(".status"); // Find the status cell

      // Update the status text and class
      statusCell.textContent = "Approved";
      statusCell.className = "status approved"; // Add the class for approved status
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while approving the student.");
    });
}

// ! Function to reject a student
function rejectStudent(universityIDCard) {
  const url = `https://querium13.runasp.net/api/admin/reject-student/${universityIDCard}`;
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer YOUR_TOKEN", // Replace with your token if needed
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Rejection Successful:", data);

      // Find the row with the student using their universityIDCard
      const row = document.querySelector(
        `tr[data-university-id="${universityIDCard}"]`
      );
      const statusCell = row.querySelector(".status"); // Find the status cell

      // Update the status text and class
      statusCell.textContent = "Rejected";
      statusCell.className = "status rejected"; // Add the class for rejected status
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while rejecting the student.");
    });
}

// ! Function to display students' data
document.addEventListener("DOMContentLoaded", function () {
  fetch("https://querium13.runasp.net/api/admin/students") // Replace with your API URL
    .then((response) => response.json())
    .then((data) => {
      let tableBody = document.getElementById("pdfTableBody");
      tableBody.innerHTML = ""; // Clear any existing content

      data.forEach((student) => {
        // Determine the status class
        let statusClass = "";
        if (student.status === "Pending") {
          statusClass = "pending";
        } else if (student.status === "Rejected") {
          statusClass = "rejected";
        } else if (student.status === "Approved") {
          statusClass = "approved";
        }

        const row = document.createElement("tr");
        row.setAttribute("data-university-id", student.universityIDCard); // Add universityIDCard as a data attribute

        row.innerHTML = `
                  <td>${student.fullName}</td>
                  <td>${student.email}</td>
                  <td>${student.universityIDCard}</td>
                  <td>${student.nationalIDCard}</td>
                  <td>${new Date(student.createdAt).toLocaleString()}</td>
                  <td class="status ${statusClass}">${student.status}</td>
                  <td>
                      <button class="btn btn-success approve-btn" onclick="approveStudent('${
                        student.universityIDCard
                      }')">
                          <i class="fa-solid fa-check"></i>
                      </button>
                      <button class="btn btn-danger reject-btn" onclick="rejectStudent('${
                        student.universityIDCard
                      }')">
                          <i class="fa-solid fa-xmark"></i>
                      </button>
                  </td>
              `;
        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error fetching student data:", error));
});

// ! Make a Fetch Request To Get All Subjects
document.addEventListener("DOMContentLoaded", function () {
  async function fetchSubjects(year, semester) {
    try {
      const subjectSelect = document.getElementById("subjectSelect");
      if (!subjectSelect) {
        console.error("Subject select element not found.");
        return;
      }

      const response = await fetch(
        "https://querium13.runasp.net/api/Admin/subjects/search",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            AcademicYear: parseInt(year),
            Semester: semester,
          }),
        }
      );

      if (!response.ok) throw new Error("Network error");

      const subjects = await response.json();

      subjectSelect.innerHTML = `<option value="" disabled selected>Open this select menu</option>`; // reset

      subjects.forEach((subject) => {
        const option = document.createElement("option");
        option.value = subject.id;
        option.textContent = subject.title;
        subjectSelect.appendChild(option);
      });
    } catch (error) {
      console.error("Error fetching subjects:", error);
      alert("Failed to load subjects. Please try again.");
    }
  }

  function tryFetch() {
    const year = document.getElementById("academicYear").value;
    const semester = document.getElementById("semester").value;

    if (year && semester) {
      fetchSubjects(year, semester);
    }
  }

  document.getElementById("academicYear").addEventListener("change", tryFetch);
  document.getElementById("semester").addEventListener("change", tryFetch);
});
