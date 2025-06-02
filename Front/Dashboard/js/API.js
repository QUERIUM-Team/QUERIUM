/** @format */

// ✅ Common Config
const API_BASE = "https://querium.premiumasp.net/api";

// ✅ Utility: Show Upload Step
function showStep(step) {
  for (let i = 1; i <= 4; i++) {
    const el = document.querySelector(`.upload-${i}`);
    if (el) el.style.display = i === step ? "block" : "none";
  }
}

// ✅ Utility: Fetch Subjects
async function fetchSubjects(year, semester) {
  try {
    const subjectSelect = document.getElementById("subjectSelect2");
    if (!subjectSelect) return;

    const response = await fetch(`${API_BASE}/Admin/subjects/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        academicYear: parseInt(year),
        semester:
          semester.charAt(0).toUpperCase() + semester.slice(1).toLowerCase(),
      }),
    });

    const data = await response.json();
    subjectSelect.innerHTML = '<option value="">Select a subject</option>';
    data.data.forEach((subject) => {
      const option = document.createElement("option");
      option.value = subject.id;
      option.textContent = subject.title;
      subjectSelect.appendChild(option);
    });
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Failed to Load Subjects",
      text: "Unable to fetch subjects. Please try again later.",
    });
  }
}

// ✅ Page-Specific Logic
document.addEventListener("DOMContentLoaded", function () {
  // ✅ Questions Page
  if (window.location.pathname.includes("questions")) {
    const mode = window.location.pathname.includes("questionsai")
      ? "last"
      : "first";

    fetch(`${API_BASE}/FileUpload/questions`)
      .then((res) => res.json())
      .then((data) => {
        const container = document.querySelector(".row");
        if (!Array.isArray(data.questions)) throw new Error();
        container.innerHTML = "";

        const questions =
          mode === "first"
            ? data.questions.slice(0, 20)
            : data.questions.slice(-20);
        const labels = ["A", "B", "C", "D"];

        questions.forEach((q) => {
          const card = document.createElement("div");
          card.className = "number-card col-lg-6 col-md-12 col-sm-12";
          card.innerHTML = `
            <div class="answer-card">
              <div class="question-head"> - ${q.questionText}</div>
              <ul>${q.answers
                .map((a, i) => `<li>${labels[i]}) ${a}</li>`)
                .join("")}</ul>
              <div class="correct-answer">
                <p>Correct Answer:</p>
                <div class="answer">${q.correctAnswer}</div>
              </div>
            </div>`;
          container.appendChild(card);
        });
      })
      .catch(() => {
        document.querySelector(
          ".row"
        ).innerHTML = `<p style="color:red">Failed to load questions. Please try again later.</p>`;
      });
  }

  // ✅ Students Table
  fetch(`${API_BASE}/admin/students`)
    .then((res) => res.json())
    .then((students) => {
      const tableBody = document.getElementById("pdfTableBody");
      tableBody.innerHTML = "";

      students.forEach((student) => {
        const row = document.createElement("tr");
        row.setAttribute("data-university-id", student.universityIDCard);
        row.innerHTML = `
          <td>${student.fullName}</td>
          <td>${student.email}</td>
          <td>${student.universityIDCard}</td>
          <td>${student.nationalIDCard}</td>
          <td>${new Date(student.createdAt).toLocaleString()}</td>
          <td class="status ${student.status.toLowerCase()}">${
          student.status
        }</td>
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
          </td>`;
        tableBody.appendChild(row);
      });
    })
    .catch((err) => console.error("Error fetching students:", err));

  // ✅ Upload Wizard Logic
  showStep(1);

  document.getElementById("form1111")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const year = document.getElementById("academicYear").value;
    const semester = document.getElementById("semester").value;
    if (!year || !semester) {
      return Swal.fire({
        icon: "warning",
        title: "Fill All Fields",
        text: "Please select both Academic Year and Semester.",
      });
    }
    await fetchSubjects(year, semester);
    showStep(2);
  });

  document.getElementById("form2222")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const subjectId = document.getElementById("subjectSelect2").value;
    if (!subjectId) {
      return Swal.fire({
        icon: "warning",
        title: "No Subject Selected",
        text: "Please choose a subject before proceeding.",
      });
    }
    showStep(3);
  });

  document.getElementById("form3")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const subjectId = document.getElementById("subjectSelect2").value;
    const chapterName = document.getElementById("chapter").value.trim();

    if (!chapterName) {
      return Swal.fire({
        icon: "warning",
        title: "Chapter Required",
        text: "Please enter the chapter name.",
      });
    }

    const formData = new FormData();
    formData.append("subjectId", subjectId);
    formData.append("chapterName", chapterName);

    try {
      const res = await fetch("/api/chapters", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error();

      Swal.fire({
        icon: "success",
        title: "Chapter Added",
        text: "The chapter was added successfully!",
      }).then(() => showStep(1));
    } catch {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Something went wrong while adding the chapter.",
      });
    }
  });
});

// ✅ Approve / Reject Logic
function updateStudentStatus(universityIDCard, action) {
  fetch(`${API_BASE}/admin/${action}-student/${universityIDCard}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer YOUR_TOKEN", // Replace this token!
    },
  })
    .then((res) => res.json())
    .then(() => {
      const row = document.querySelector(
        `tr[data-university-id="${universityIDCard}"]`
      );
      const statusCell = row.querySelector(".status");
      statusCell.textContent = action === "approve" ? "Approved" : "Rejected";
      statusCell.className = `status ${
        action === "approve" ? "approved" : "rejected"
      }`;
    })
    .catch(() => {
      Swal.fire({
        icon: "error",
        title: "Action Failed",
        text: `Could not ${action} student. Try again.`,
      });
    });
}

function approveStudent(id) {
  updateStudentStatus(id, "approve");
}

function rejectStudent(id) {
  updateStudentStatus(id, "reject");
}

document.getElementById("form1111")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const year = document.getElementById("academicYear");
  const semester = document.getElementById("semester");

  let valid = true;

  if (!year.value) {
    year.classList.add("is-invalid");
    valid = false;
  }
  if (!semester.value) {
    semester.classList.add("is-invalid");
    valid = false;
  }

  if (!valid) {
    return Swal.fire({
      icon: "warning",
      title: "Fill All Fields",
      text: "Please select both Academic Year and Semester.",
    });
  }

  await fetchSubjects(year.value, semester.value);
  showStep(2);
});

// Remove is-invalid when user types/selects
document.getElementById("academicYear")?.addEventListener("input", (e) => {
  e.target.classList.remove("is-invalid");
});
document.getElementById("semester")?.addEventListener("input", (e) => {
  e.target.classList.remove("is-invalid");
});

document.getElementById("form2222")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const subjectSelect = document.getElementById("subjectSelect2");

  if (!subjectSelect.value) {
    subjectSelect.classList.add("is-invalid");
    return Swal.fire({
      icon: "warning",
      title: "No Subject Selected",
      text: "Please choose a subject before proceeding.",
    });
  }

  showStep(3);
});

document.getElementById("subjectSelect2")?.addEventListener("input", (e) => {
  e.target.classList.remove("is-invalid");
});

document.getElementById("form3")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const chapterInput = document.getElementById("chapter");

  if (!chapterInput.value.trim()) {
    chapterInput.classList.add("is-invalid");
    return Swal.fire({
      icon: "warning",
      title: "Chapter Required",
      text: "Please enter the chapter name.",
    });
  }

  const formData = new FormData();
  formData.append("subjectId", document.getElementById("subjectSelect2").value);
  formData.append("chapterName", chapterInput.value.trim());

  try {
    const res = await fetch("/api/chapters", {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error();

    Swal.fire({
      icon: "success",
      title: "Chapter Added",
      text: "The chapter was added successfully!",
    }).then(() => showStep(1));
  } catch {
    Swal.fire({
      icon: "error",
      title: "Failed",
      text: "Something went wrong while adding the chapter.",
    });
  }
});

document.getElementById("chapter")?.addEventListener("input", (e) => {
  e.target.classList.remove("is-invalid");
});

// ! Login Function
async function login(event) {
  event.preventDefault();

  const email = document.getElementById("emailInput").value;
  const password = document.getElementById("passwordInput").value;

  try {
    const response = await fetch(
      "https://querium.premiumasp.net/api/Admin/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();

    if (data.message === "Login successful") {
      // Save login data to localStorage
      // Assuming your API returns a token or user info, save it
      localStorage.setItem("userEmail", email);
      // You could also save token if available, for example: localStorage.setItem("token", data.token);

      Swal.fire("Success", "Login successful!", "success").then(() => {
        window.location.href = "home.html";
      });
    } else {
      Swal.fire("Error", "Login failed. Check your credentials.", "error");
    }
  } catch (error) {
    console.error("Error:", error);
    Swal.fire("Error", "An error occurred. Please try again.", "error");
  }
}

// ! Logout Function
async function logout() {
  try {
    const response = await fetch(
      "https://querium.premiumasp.net/api/Admin/logout",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.json();

    if (data.message === "Admin logout successful") {
      Swal.fire("Success", "Logged out successfully", "success").then(() => {
        window.location.href = "log-out.html";
      });
    }
  } catch (error) {
    console.error("Logout error:", error);
    Swal.fire("Error", "Failed to logout. Try again.", "error");
  }
}
