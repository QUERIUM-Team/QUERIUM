/** @format */

document.querySelectorAll(".otp-input").forEach((input, index, inputs) => {
  input.addEventListener("input", (e) => {
    const value = e.target.value;

    if (!/^\d$/.test(value)) {
      e.target.value = "";
      return;
    }

    if (index < inputs.length - 1) {
      inputs[index + 1].focus();
    }
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputs[index - 1].focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputs[index - 1].focus();
    } else if (e.key === "ArrowRight" && index < inputs.length - 1) {
      inputs[index + 1].focus();
    }
  });
});

document.getElementById("emailForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const emailInput = document.getElementById("emailInput");
  const email = emailInput.value.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    emailInput.focus();
  } else {
    window.location.href = "fourdigits.html";
  }
});

document.getElementById("emailForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const password = document.getElementById("newPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match. Please try again.");
  } else {
    window.location.href = "login.html";
  }
});
