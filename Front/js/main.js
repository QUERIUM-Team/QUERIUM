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
  // Initialize Isotope
  const portfolioIsotope = new Isotope(".files-content", {
    itemSelector: ".mega",
    layoutMode: "fitRows", // Ensure the items are rearranged in rows
  });

  // Get all buttons
  const buttons = document.querySelectorAll(".main-content .buttons button");

  // Add event listener for button clicks
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove 'active' class from all buttons
      buttons.forEach((btn) => btn.classList.remove("active"));

      // Add 'active' class to clicked button
      this.classList.add("active");

      // Apply filter to the isotope layout
      portfolioIsotope.arrange({
        filter: this.getAttribute("data-filter"),
      });
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const tableBody = document.getElementById("pdfTableBody");

  tableBody.addEventListener("click", function (event) {
    const target = event.target;
    const row = target.closest("tr");

    if (!row) return;

    const statusSpan = row.querySelector(".status");

    // Approve toggle
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
        // Save current class to data-status
        row.dataset.lastStatus = currentStatus;

        // Apply approved style
        statusSpan.textContent = "Approved";
        statusSpan.className = "status approved";
        } else {
        // Revert to previous state
        const lastStatus = row.dataset.lastStatus || "pending";
        statusSpan.textContent = capitalizeFirstLetter(lastStatus);
        statusSpan.className = "status " + lastStatus;
        row.style.backgroundColor = "";
      }
    }

    // Reject action
    if (target.closest(".reject-btn")) {
      row.remove();
    }
  });

  function capitalizeFirstLetter(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
});
