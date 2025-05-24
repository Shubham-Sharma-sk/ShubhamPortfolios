// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
  // Initialize audio player
  const audio = document.getElementById("audioPlayer");
  const loader = document.getElementById("preloader");
  
  // Enable custom cursor
  document.documentElement.classList.add('custom-cursor');
  
  // Set up preloader
  if (loader) {
    // Hide preloader after page load
    setTimeout(function() {
      loader.style.display = "none";
      // Add popup animation to "Hey!" element
      const heyElement = document.querySelector(".hey");
      if (heyElement) {
        heyElement.classList.add("popup");
      }
    }, 500);
  }
});

// Settings toggle
function settingtoggle() {
  const settingContainer = document.getElementById("setting-container");
  if (settingContainer) {
    settingContainer.classList.toggle("settingactivate");
  }
  
  const visualModeContainer = document.getElementById("visualmodetogglebuttoncontainer");
  if (visualModeContainer) {
    visualModeContainer.classList.toggle("visualmodeshow");
  }
  
  const soundModeContainer = document.getElementById("soundtogglebuttoncontainer");
  if (soundModeContainer) {
    soundModeContainer.classList.toggle("soundmodeshow");
  }
}

// Play/pause sound
function playpause() {
  const audio = document.getElementById("audioPlayer");
  const switchSound = document.getElementById("switchforsound");
  
  if (!audio || !switchSound) return;
  
  if (switchSound.checked === false) {
    audio.pause();
  } else {
    audio.play();
  }
}

// Visual mode toggle (light/dark)
function visualmode() {
  document.body.classList.toggle("light-mode");
  
  // Handle elements that need to be inverted in light mode
  document.querySelectorAll(".needtobeinvert").forEach(function(element) {
    element.classList.toggle("invertapplied");
  });
}

// Mobile menu
function hamburgerMenu() {
  document.body.classList.toggle("stopscrolling");
  
  const mobileMenu = document.getElementById("mobiletogglemenu");
  if (mobileMenu) {
    mobileMenu.classList.toggle("show-toggle-menu");
  }
  
  // Animate hamburger bars
  const bar1 = document.getElementById("burger-bar1");
  const bar2 = document.getElementById("burger-bar2");
  const bar3 = document.getElementById("burger-bar3");
  
  if (bar1) bar1.classList.toggle("hamburger-animation1");
  if (bar2) bar2.classList.toggle("hamburger-animation2");
  if (bar3) bar3.classList.toggle("hamburger-animation3");
}

// Hide mobile menu on click
function hidemenubyli() {
  document.body.classList.toggle("stopscrolling");
  
  const mobileMenu = document.getElementById("mobiletogglemenu");
  if (mobileMenu) {
    mobileMenu.classList.remove("show-toggle-menu");
  }
  
  // Reset hamburger bars
  const bar1 = document.getElementById("burger-bar1");
  const bar2 = document.getElementById("burger-bar2");
  const bar3 = document.getElementById("burger-bar3");
  
  if (bar1) bar1.classList.remove("hamburger-animation1");
  if (bar2) bar2.classList.remove("hamburger-animation2");
  if (bar3) bar3.classList.remove("hamburger-animation3");
}

// Scroll spy functionality
document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll("section");
  const navLi = document.querySelectorAll(".navbar .navbar-tabs .navbar-tabs-ul li");
  const mobilenavLi = document.querySelectorAll(".mobiletogglemenu .mobile-navbar-tabs-ul li");
  
  if (sections.length > 0) {
    window.addEventListener("scroll", () => {
      let activeSection = "";
      
      sections.forEach(section => {
        const sectionOffset = section.offsetTop;
        if (pageYOffset >= sectionOffset - 200) {
          activeSection = section.getAttribute("id");
        }
      });
      
      // Update mobile nav active state
      mobilenavLi.forEach(li => {
        li.classList.remove("activeThismobiletab");
        if (li.classList.contains(activeSection)) {
          li.classList.add("activeThismobiletab");
        }
      });
      
      // Update desktop nav active state
      navLi.forEach(li => {
        li.classList.remove("activeThistab");
        if (li.classList.contains(activeSection)) {
          li.classList.add("activeThistab");
        }
      });
    });
  }
});

// Console branding message
console.log("%c Designed and Developed by Shubham Khandelwal ", "background-image: linear-gradient(90deg,#8000ff,#6bc5f8); color: white;font-weight:900;font-size:1rem; padding:20px;");

// Back to top button
function scrollFunction() {
  const mybutton = document.getElementById("backtotopbutton");
  if (!mybutton) return;
  
  if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function scrolltoTopfunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// Add scroll event listener only if window exists (browser environment)
if (typeof window !== 'undefined') {
  window.onscroll = function() {
    scrollFunction();
  };
}

// Prevent right-click on images
document.addEventListener("contextmenu", function(e) {
  if (e.target.nodeName === "IMG") {
    e.preventDefault();
  }
}, false);

// Open resume
function openURL() {
  var url = "src/pdf/Shubham khandelwal Resume (1).pdf";
  window.open(url, "_blank");
}