/** @format */

document.addEventListener("DOMContentLoaded", () => {
  // Hover ripple effect on buttons
  $(".default-btn, .default-btn-one, .default-btn-two").on(
    "mouseenter mouseout",
    function (event) {
      const offset = $(this).offset();
      const relX = event.pageX - offset.left;
      const relY = event.pageY - offset.top;
      $(this).find("span").css({ top: relY, left: relX });
    }
  );

  // Initialize WOW.js animations
  new WOW().init();

  // Disable preloader
  $(".preloader").addClass("preloader-deactivate");

  // FAQ accordion logic
  $(".faq-answer").not(":first").slideUp();
  $(".faq-question").on("click", function () {
    $(".faq-question").removeClass("active");
    $(this).addClass("active");

    $(this).find("svg").toggleClass("fa-plus fa-minus");
    $(this).next(".faq-answer").slideToggle(500);
    $(".faq-answer").not($(this).next()).slideUp(500);

    $(".faq-question")
      .not(this)
      .find("svg")
      .removeClass("fa-minus")
      .addClass("fa-plus");
  });

  // EmailJS form submission
  const sendBtn = document.getElementById("button");
  const contactForm = document.getElementById("contactForm");
  const sentMessage = document.querySelector(".sent");

  if (sendBtn && contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const originalText = sendBtn.innerText;
      sendBtn.innerText = "Sending...";

      emailjs
        .sendForm("service_ys8nks8", "template_e57p2pc", contactForm)
        .then(() => {
          sendBtn.innerText = originalText;
          if (sentMessage) sentMessage.classList.add("active");
          contactForm.reset();
        })
        .catch((error) => {
          sendBtn.innerText = originalText;
          alert(JSON.stringify(error));
        });
    });
  }
});

// Owl Carousel Initialization
$(".testimonial-slider").owlCarousel({
  loop: true,
  nav: true,
  dots: true,
  autoplay: true,
  autoplayHoverPause: true,
  smartSpeed: 1000,
  margin: 20,
  navText: [
    "<i class='fa fa-chevron-left'></i>",
    "<i class='fa fa-chevron-right'></i>",
  ],
  responsive: {
    0: { items: 1 },
    768: { items: 2 },
    1200: { items: 3 },
  },
});

// Initialize EmailJS
emailjs.init("p3wVWaiD4N8cQo05V");

/** @format */

const header = document.querySelector("header");
const img = document.querySelector("header img");
const currentPage = window.location.pathname;

if (currentPage.includes("/landing2.html")) {
  header.classList.add("dark");
  img.src = "assets/images/logo-black.png";
}

window.addEventListener("scroll", () => {
  if (window.scrollY >= 50) {
    header.classList.add("scroll");
    img.src = "assets/images/logo-black.png";
  } else {
    header.classList.remove("scroll");
    if (!currentPage.includes("/landing2.html")) {
      img.src = "assets/images/logo.png";
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const aboutCompany = document.querySelector(".about-company");
  if (aboutCompany) {
    const spans = document.querySelectorAll(".analyt .line span");
    let hasScrolled = false;

    window.addEventListener("scroll", () => {
      if (window.scrollY >= aboutCompany.offsetTop - 250 && !hasScrolled) {
        spans.forEach((span) => {
          span.style.width = span.dataset.prog;
        });
        hasScrolled = true;
      }
    });
  }
});

const toTopButton = document.getElementById("top");
window.addEventListener("scroll", () => {
  toTopButton.style.top = window.scrollY >= 1000 ? "93vh" : "-60px";
});
