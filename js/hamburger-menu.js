// Hamburger menu functionality
document.addEventListener('DOMContentLoaded', function() {
  // Delay initialization to ensure components are loaded
  setTimeout(function() {
    initHamburgerMenu();
  }, 300);
});

function initHamburgerMenu() {
  const hamburger = document.getElementById('hamburger-component');
  const navMenu = document.getElementById('navbar-tabs');
  
  // Exit if elements don't exist (prevents errors)
  if (!hamburger || !navMenu) {
    console.log('Hamburger menu elements not found, skipping initialization');
    return;
  }
  
  const navLinks = document.querySelectorAll('.navbar-tabs-ul li');
  
  // Add animation delay to each nav item
  navLinks.forEach((link, index) => {
    link.style.setProperty('--i', index);
  });
  
  // Toggle menu open/close
  hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
  
  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
  
  // Close menu when clicked outside
  document.addEventListener('click', function(event) {
    // Check if elements exist before using contains method
    if (!navMenu || !hamburger) return;
    
    const isClickInside = navMenu.contains(event.target) || hamburger.contains(event.target);
    
    if (!isClickInside && navMenu.classList.contains('active')) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
}
