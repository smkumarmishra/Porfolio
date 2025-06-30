// -------------------------------------[ Variables ]-------------------------------------
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");
const closeBtn = document.getElementById("closeBtn");
const bgContainer = document.getElementById("bgContainer");
const form = document.getElementById("form");
const textarea = document.getElementById("messageBox");
const counter = document.getElementById("charCount");
const maxLength = textarea.maxLength;
const alertBox = document.getElementById("topAlert");
const alertMsg = document.getElementById("topAlertMsg");
const alertCloseBtn = document.getElementById("closeAlert");

// -------------------------------------[ Nav Toggle Logic ]-------------------------------------
hamburger.addEventListener("click", (e) => {
  e.stopPropagation();
  navMenu.classList.toggle("active");
});

closeBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  navMenu.classList.remove("active");
});

bgContainer.addEventListener("click", (e) => {
  if (e.target !== navMenu) {
    navMenu.classList.remove("active");
  }
});

// -------------------------------------[ Character Count ]-------------------------------------
textarea.addEventListener("input", () => {
  const remaining = maxLength - textarea.value.length;
  counter.textContent = `${remaining}`;
});

// In case of form.message event not working, fallback:
form.message.addEventListener("input", function () {
  const remaining = 1000 - this.value.length;
  counter.textContent = remaining;
});

// -------------------------------------[ Alert Box Logic ]-------------------------------------
function showAlert(message, type = "default") {
  alertBox.classList.remove("success", "error");
  alertMsg.textContent = message;

  if (type === "success") {
    alertBox.classList.add("success");
  } else if (type === "error") {
    alertBox.classList.add("error");
  }

  alertBox.style.display = "flex";

  setTimeout(() => {
    alertBox.style.display = "none";
  }, 3000);
}

alertCloseBtn.addEventListener("click", () => {
  alertBox.style.display = "none";
});

// -------------------------------------[ EmailJS Init + Form Submit ]-------------------------------------
(function () {
  emailjs.init("TNClvAFHry3bKsVV4"); // my Public Key
})();

form.addEventListener("submit", function (e) {
  e.preventDefault();

  emailjs.sendForm("service_mylado11", "template_o4hr6eu", this)
    .then(() => {
      showAlert(" ! Message sent successfully!", "success");
      form.reset();
      counter.textContent = maxLength;
    }, (error) => {
      showAlert("! Failed to send message. Try again!", "error");
    });
});

// -------------------------------------[ Welcome Alert on Load ]-------------------------------------
window.addEventListener("DOMContentLoaded", () => {
  showAlert("! Welcome to my portfolio !");
});


// -------------------------------this animated type writer text-----------------------------//

  const textElement = document.getElementById("animated-text");

  const words = [
    { text: "Front-end Developer...|", class: "gradient-red" },
    { text: "UI/UX Developer....|", class: "gradient-green" },
    { text: "Web Developer....|", class: "gradient-blue" }
  ];

  let wordIndex = 0;
  let charIndex = 0;

  function typeWord() {
    const current = words[wordIndex];

    // Reset and apply new gradient class
    textElement.className = current.class;
    textElement.textContent = current.text.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex < current.text.length) {
      setTimeout(typeWord, 150);
    } else {
      setTimeout(() => {
        wordIndex++;
        if (wordIndex >= words.length) {
          wordIndex = 0;
        }
        charIndex = 0;
        setTimeout(typeWord, 800);
      }, 1000);
    }
  }

  typeWord(); // Start animation

