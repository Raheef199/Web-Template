// Random background option
let backgroundOption = true;

// Variable to control the interval
let backgroundInterval;

// Check if there is localStorage color option
let mainColors = localStorage.getItem("color-option");

if (mainColors !== null) {
  // console.log("Local Storage isnt empty, you can set it on root now");
  // console.log(localStorage.getItem("color-option"));

  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("color-option")
  );

  // Remove Active class from all colors list item
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");
    // Add active class on element with data-color === localStorage item
    if (element.dataset.color === mainColors) {
      // Add active class
      element.classList.add("active");
    }
  });
}

// Check if there is localStorage random background item
let backgroundLocalItem = localStorage.getItem("background_option");

// Check if random background local storage is not empty
if (backgroundLocalItem !== null) {
  console.log(backgroundLocalItem);
  console.log(typeof backgroundLocalItem);

  if (backgroundLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }

  // Remove active class from all spans
  document.querySelectorAll(".random-backgrounds span").forEach((element) => {
    element.classList.remove("active");
  });

  if (backgroundLocalItem === "true") {
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}

// Toggle spin class on icon
const toggleBtn = (document.querySelector(
  ".toggle-settings .settings-sharp"
).onclick = function () {
  this.classList.toggle("fa-spin");

  document.querySelector(".settings-box").classList.toggle("open");
});

// Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");

// Loop on list items
colorsLi.forEach((li) => {
  // Click on items
  li.addEventListener("click", function (e) {
    // Set Color on root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    // Set color on localStorage
    localStorage.setItem("color-option", e.target.dataset.color);

    handleActive(e);
  });
});

// Switch Random bg option
const randomBackgroundsEl = document.querySelectorAll(
  ".random-backgrounds span"
);

// Loop on all spans
randomBackgroundsEl.forEach((span) => {
  // Click on items
  span.addEventListener("click", function (e) {
    handleActive(e);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;

      randomizeImgs();

      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;

      clearInterval(backgroundInterval);

      localStorage.setItem("background_option", false);
    }
  });
});

// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");

// Get Array of Imgs
let imgsArray = [
  "img-1.jpeg",
  "img-2.webp",
  "img-3.webp",
  "img-4.webp",
  "img-5.webp",
];

// function to randomize imgs
function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      // Get Random Number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);

      landingPage.style.backgroundImage =
        'url("imgs/' + imgsArray[randomNumber] + '")';
    }, 1000);
  }
}
randomizeImgs();

/////////////////////////////////////////////
// Select Skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  // Skills Offset Top
  let skillsOffsetTop = ourSkills.offsetTop;

  // Skills Outer height
  let skillsOuterHeight = ourSkills.offsetHeight;

  // Window height
  let windowHeight = this.innerHeight;

  // Window ScrollTop
  let windowScrollTop = this.scrollY;

  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );

    let skillTooltip = document.querySelectorAll(".percentage");

    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });

    skillTooltip.forEach((tooltip) => {
      for (let i = 1; i <= tooltip.dataset.progress; i++) {
        skillTooltip.innerText = i++;
      }
      tooltip.style.left = tooltip.dataset.progress;
    });
  }
};

// Create Popup With the Img
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", function (e) {
    // Create OverLay element
    let overlay = document.createElement("div");

    // Add Class To Overlay
    overlay.className = "popup-overlay";

    // Append Overlay to the body
    document.body.appendChild(overlay);

    // Create the Popup
    let popupBox = document.createElement("div");

    // Add class to the popup box
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      // Create Heading
      let imgHeading = document.createElement("h3");

      // Create text for Heading
      let imgText = document.createTextNode(img.alt);

      // Append the text to the heading
      imgHeading.appendChild(imgText);

      // Append the heading to the popup box
      popupBox.appendChild(imgHeading);
    }
    // Create img
    let popupImg = document.createElement("img");

    // Set img src
    popupImg.src = img.src;

    // Add image to popup box
    popupBox.appendChild(popupImg);

    // Append the popup box to the body
    document.body.appendChild(popupBox);

    // Create the close span
    let closeBtn = document.createElement("span");

    // Create The Close Button Text
    let closeButtonText = document.createTextNode("X");

    // Append text close btn
    closeBtn.appendChild(closeButtonText);

    // Add class to close btn
    closeBtn.className = "close-button";

    // Add close btn to the popup box
    popupBox.appendChild(closeBtn);
  });
});

// Close Popup
document.addEventListener("click", function (e) {
  if (e.target.className === "close-button") {
    // Remove current popup
    e.target.parentNode.remove();

    // Remove overlay
    document.querySelector(".popup-overlay").remove();
  }
});

// Select all links
const allLinks = document.querySelectorAll(".links a");

const allBullets = document.querySelectorAll(".nav-bullets .bullet");

function scrollToSomewhere(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);

// Handle active Stats
function handleActive(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });

  // Add Active class on self
  ev.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-options span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });

  if (bulletLocalItem === "block") {
    bulletsContainer.style.display = "block";

    document.querySelector(".bullets-options .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-options .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", function (e) {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets-options", "none");
    }

    handleActive(e);
  });
});

// Reset Button
document.querySelector(".reset-options").onclick = function () {
  // localStorage.clear();
  localStorage.removeItem("color_option");
  localStorage.removeItem("background_option");
  localStorage.removeItem("bullets_option");

  // Reload Window
  window.location.reload();
};

// Toggle Menu
let toggleButton = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleButton.onclick = function (e) {
  // Stop propagation
  e.stopPropagation();

  // Toggle Class "menu-active" on Button
  this.classList.toggle("menu-active");

  // Toggle Class "open" On Links
  tLinks.classList.toggle("open");
};

// Click anywhere outside menu and toggle button

document.addEventListener("click", (e) => {
  if (e.target !== toggleButton && e.target !== tLinks) {
    // Check if menu is open
    if (tLinks.classList.contains("open")) {
      // Toggle Class "menu-active" on Button
      toggleButton.classList.toggle("menu-active");

      // Toggle Class "open" On Links
      tLinks.classList.toggle("open");
    }
  }
});

// stop propagation on menu
tLinks.onclick = function (e) {
  e.stopPropagation();
};
