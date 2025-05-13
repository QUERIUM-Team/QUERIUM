/** @format */

// ! Make a PopUp To A Lastest News Photos.
let img = document.querySelectorAll(".news .data .item img");
img.forEach((ele) => {
  ele.addEventListener("click", (e) => {
    let div = document.createElement("div");
    div.className = "popup-overlay";

    let popUp = document.createElement("div");
    popUp.className = "popUp";

    let popUpImg = document.createElement("img");
    popUpImg.src = ele.src;

    div.addEventListener("click", function () {
      popUp.remove();
      div.remove();
    });

    document.body.appendChild(popUp);
    document.body.appendChild(div);
    popUp.appendChild(popUpImg);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const portfolioIsotope = new Isotope(".files-content", {
    itemSelector: ".mega",
    layoutMode: "fitRows",
  });

  const buttons = document.querySelectorAll(".main-content .buttons button");
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      buttons.forEach((btn) => btn.classList.remove("active"));

      this.classList.add("active");

      portfolioIsotope.arrange({
        filter: this.getAttribute("data-filter"),
      });
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const tableBody = document.getElementById("pdfTableBodys");

  tableBody.addEventListener("click", function (event) {
    const target = event.target;
    const row = target.closest("tr");

    if (!row) return;

    const statusSpan = row.querySelector(".status");

    if (target.closest(".approve-btn")) {
      const currentStatus = statusSpan.classList.contains("approved")
        ? "approved"
        : statusSpan.classList.contains("pending")
        ? "pending"
        : statusSpan.classList.contains("rejected")
        ? "rejected"
        : statusSpan.classList.contains("completed")
        ? "completed"
        : "";

      const isNowApproved = statusSpan.classList.contains("approved");

      if (!isNowApproved) {
        row.dataset.lastStatus = currentStatus;

        statusSpan.textContent = "Approved";
        statusSpan.className = "status approved";
      } else {
        const lastStatus = row.dataset.lastStatus || "pending";
        statusSpan.textContent = capitalizeFirstLetter(lastStatus);
        statusSpan.className = "status " + lastStatus;
        row.style.backgroundColor = "";
      }
    }

    if (target.closest(".reject-btn")) {
      row.remove();
    }
  });

  function capitalizeFirstLetter(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const answerCards = document.querySelectorAll(".answer-card");

  answerCards.forEach((card) => {
    const options = card.querySelectorAll("ul li");

    options.forEach((option) => {
      option.addEventListener("click", function () {
        options.forEach((opt) => opt.classList.remove("active"));

        this.classList.add("active");
      });
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("chaptersContainer");
  const addBtn = document.querySelector(".add-chapter");
  const cancelBtn = document.querySelector(".btn-cancel");
  const confirmBtn = document.querySelector(".btn-submit");

  function updateCancelButtonState() {
    const chapters = container.querySelectorAll(".chapter");

    if (chapters.length > 1) {
      cancelBtn.disabled = false;
      return;
    }

    const first = chapters[0];
    const hasInput =
      first.querySelector("input[type='text']").value.trim() !== "" ||
      first.querySelector("textarea").value.trim() !== "" ||
      first.querySelector("input[type='file']").files.length > 0;

    cancelBtn.disabled = !hasInput;
  }

  addBtn.addEventListener("click", function () {
    const chapters = container.querySelectorAll(".chapter");
    const lastChapter = chapters[chapters.length - 1];
    const newChapter = lastChapter.cloneNode(true);
    const newNumber = chapters.length + 1;

    newChapter.querySelector(".number").textContent = newNumber;
    newChapter.querySelector("input[type='text']").value = "";
    newChapter.querySelector("textarea").value = "";
    newChapter.querySelector("input[type='file']").value = "";

    container.appendChild(newChapter);
    updateCancelButtonState();
  });

  cancelBtn.addEventListener("click", function () {
    const chapters = container.querySelectorAll(".chapter");
    const last = chapters[chapters.length - 1];

    const title = last.querySelector("input[type='text']");
    const desc = last.querySelector("textarea");
    const file = last.querySelector("input[type='file']");

    const hasData =
      title.value.trim() !== "" ||
      desc.value.trim() !== "" ||
      file.files.length > 0;

    if (hasData) {
      title.value = "";
      desc.value = "";
      file.value = "";
    } else if (chapters.length > 1) {
      last.remove();
    }

    updateCancelButtonState();
  });

  confirmBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const data = [];
    const chapters = container.querySelectorAll(".chapter");

    chapters.forEach((chapter, i) => {
      const title = chapter.querySelector("input[type='text']").value;
      const description = chapter.querySelector("textarea").value;
      const fileInput = chapter.querySelector("input[type='file']");
      const file = fileInput.files[0] ? fileInput.files[0].name : "No file";

      data.push({
        chapter: i + 1,
        title,
        description,
        file,
      });
    });

    console.log("Submitted Data:", data);
    alert("Data sent successfully! Check console for details.");

    chapters.forEach((chapter, i) => {
      if (i === 0) {
        chapter.querySelector("input[type='text']").value = "";
        chapter.querySelector("textarea").value = "";
        chapter.querySelector("input[type='file']").value = "";
        chapter.querySelector(".number").textContent = "1";
      } else {
        chapter.remove();
      }
    });

    updateCancelButtonState();
  });

  container.addEventListener("input", updateCancelButtonState);
  container.addEventListener("change", updateCancelButtonState);

  updateCancelButtonState();
});

document.addEventListener("DOMContentLoaded", function () {
  const steps = document.querySelectorAll("[class^='upload-']");
  const nextButtons = document.querySelectorAll("input[type='submit']");

  steps.forEach((step, i) => {
    step.style.display = i === 0 ? "block" : "none";
  });

  nextButtons.forEach((btn, index) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();

      const currentStep = steps[index];
      const inputs = currentStep.querySelectorAll("input, textarea, select");
      let valid = true;

      inputs.forEach((input) => {
        if (
          input.hasAttribute("required") &&
          ((input.type === "file" && input.files.length === 0) ||
            (input.type !== "file" && input.value.trim() === ""))
        ) {
          valid = false;
          input.classList.add("is-invalid");
        } else {
          input.classList.remove("is-invalid");
        }
      });

      if (!valid) {
        alert("Please complete all required fields.");
        return;
      }

      steps.forEach((step) => (step.style.display = "none"));
      if (index + 1 < steps.length) {
        steps[index + 1].style.display = "block";
      }
    });
  });
});
