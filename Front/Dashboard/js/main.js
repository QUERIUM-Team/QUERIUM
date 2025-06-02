/** @format */

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
  const steps = document.querySelectorAll("[class^='upload-']");

  // Update chapter numbering
  function updateChapterNumbers() {
    const chapters = container.querySelectorAll(".chapter");
    chapters.forEach((chapter, i) => {
      chapter.querySelector(".number").textContent = i + 1;
    });
  }

  // Create a fresh empty chapter element
  function createEmptyChapter(number) {
    const div = document.createElement("div");
    div.classList.add("chapter");

    div.innerHTML = `
      <p class="name" style="position: relative;">
        Chapter
        <span class="number">${number}</span>
        <button type="button" class="btn-delete-chapter btn btn-danger rounded-circle"
          style="position: absolute; right: 10px; margin-left: 10px; cursor: pointer; padding: 5px 10px;">X</button>
      </p>
      <form action="" class="form3 upload3">
        <div class="mb-3">
          <label>Chapter Title <span class="required">*</span></label>
          <input class="form-control" type="text" placeholder="Chapter Title" aria-label="chapter title">
        </div>
        <div class="mb-3">
          <label>Chapter Description <span class="required">*</span></label>
          <textarea class="form-control" rows="3" placeholder="Chapter Description"></textarea>
        </div>
        <label>Chapter File <span class="required">*</span></label>
        <div class="input-group mb-3">
          <input type="file" class="form-control">
        </div>
      </form>
    `;

    return div;
  }

  // Add chapter
  addBtn.addEventListener("click", () => {
    const chapters = container.querySelectorAll(".chapter");
    let newChapter;
    if (chapters.length === 0) {
      newChapter = createEmptyChapter(1);
    } else {
      const lastChapter = chapters[chapters.length - 1];
      newChapter = lastChapter.cloneNode(true);
      // Clear inputs
      newChapter
        .querySelectorAll("input[type='text'], textarea")
        .forEach((el) => (el.value = ""));
      newChapter.querySelector("input[type='file']").value = "";
    }
    container.appendChild(newChapter);
    updateChapterNumbers();
  });

  // Delete chapter with event delegation
  container.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-delete-chapter")) {
      const chapters = container.querySelectorAll(".chapter");
      if (chapters.length === 1) {
        Swal.fire("Warning", "You must have at least one chapter!", "warning");
        return;
      }
      const chapterToDelete = e.target.closest(".chapter");
      chapterToDelete.remove();
      updateChapterNumbers();
    }
  });

  // Cancel button - delete all chapters with confirmation, then add fresh empty chapter
  cancelBtn.addEventListener("click", (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete ALL chapters and their data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete all!",
      cancelButtonText: "No, keep them",
    }).then((result) => {
      if (result.isConfirmed) {
        // Remove all chapters inside container
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
        // Add fresh empty chapter so user can start again
        container.appendChild(createEmptyChapter(1));
        Swal.fire(
          "Deleted!",
          "All chapters and their data have been deleted.",
          "success"
        );
      }
    });
  });

  // Confirm button - validate all inputs and alert if invalid
  confirmBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const chapters = container.querySelectorAll(".chapter");
    if (chapters.length === 0) {
      Swal.fire("Error", "No chapters to submit!", "error");
      return;
    }

    let valid = true;

    chapters.forEach((chapter) => {
      const titleInput = chapter.querySelector("input[type='text']");
      const descriptionInput = chapter.querySelector("textarea");
      const fileInput = chapter.querySelector("input[type='file']");

      const title = titleInput.value.trim();
      const description = descriptionInput.value.trim();
      const hasFile = fileInput.files.length > 0;

      // Add / remove validation classes
      if (!title) {
        valid = false;
        titleInput.classList.add("is-invalid");
      } else {
        titleInput.classList.remove("is-invalid");
      }
      if (!description) {
        valid = false;
        descriptionInput.classList.add("is-invalid");
      } else {
        descriptionInput.classList.remove("is-invalid");
      }
      if (!hasFile) {
        valid = false;
        fileInput.classList.add("is-invalid");
      } else {
        fileInput.classList.remove("is-invalid");
      }
    });

    if (!valid) {
      Swal.fire(
        "Error",
        "Please fill all fields and upload files for every chapter.",
        "error"
      );
      return;
    }

    // If valid, process data and move to upload-4 step
    const data = Array.from(chapters).map((chapter, i) => ({
      chapter: i + 1,
      title: chapter.querySelector("input[type='text']").value.trim(),
      description: chapter.querySelector("textarea").value.trim(),
      fileName:
        chapter.querySelector("input[type='file']").files[0]?.name || "No file",
    }));

    console.log("Submitting data:", data);

    // Hide all upload steps and show upload-4
    steps.forEach((step) => (step.style.display = "none"));
    const lastStep = document.querySelector(".upload-4");
    if (lastStep) lastStep.style.display = "block";

    Swal.fire("Success", "Data submitted successfully!", "success");
  });

  // Initialize with one empty chapter if none present
  if (container.querySelectorAll(".chapter").length === 0) {
    container.appendChild(createEmptyChapter(1));
  }
});

window.addEventListener("load", () => {
  const savedEmail = localStorage.getItem("userEmail");
  if (savedEmail) {
    document.getElementById("emailInput").value = savedEmail;
  }
});
