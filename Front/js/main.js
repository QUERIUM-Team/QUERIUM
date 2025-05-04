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

    // Toggle Approve button
    if (target.closest(".approve-btn")) {
      const row = target.closest("tr");
      const statusSpan = row.querySelector(".status");

      if (statusSpan.classList.contains("pending")) {
        // Mark as approved
        statusSpan.textContent = "Approved";
        statusSpan.classList.remove("pending");
        statusSpan.classList.add("approved");
      } else {
        // Revert to pending
        row.style.backgroundColor = "";
        statusSpan.textContent = "Pending";
        statusSpan.classList.remove("approved");
        statusSpan.classList.add("pending");
      }
    }

    // Reject button
    if (target.closest(".reject-btn")) {
      const row = target.closest("tr");
      row.remove();
    }
  });
});

