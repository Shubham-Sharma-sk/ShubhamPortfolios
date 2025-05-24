// Cursor effects functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cursor effects
    setTimeout(initCursorEffects, 100); // Small delay to ensure DOM is fully loaded
  });
  
  function initCursorEffects() {
    const cursorInner = document.getElementById("cursor-inner");
    const cursorOuter = document.getElementById("cursor-outer");
    
    if (!cursorInner || !cursorOuter) {
      console.warn("Cursor elements not found in the DOM");
      return;
    }
    
    const links = document.querySelectorAll("a,label,button");
  
    document.addEventListener("mousemove", function (e) {
      const posX = e.clientX;
      const posY = e.clientY;
  
      // Set inner cursor position
      cursorInner.style.left = `${posX}px`;
      cursorInner.style.top = `${posY}px`;
  
      // Animate outer cursor with a smooth trail effect
      cursorOuter.animate(
        {
          left: `${posX}px`,
          top: `${posY}px`,
        },
        { duration: 500, fill: "forwards" }
      );
    });
  
    // Add hover effects to all interactive elements
    links.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        cursorInner.classList.add("hover");
        cursorOuter.classList.add("hover");
      });
      link.addEventListener("mouseleave", () => {
        cursorInner.classList.remove("hover");
        cursorOuter.classList.remove("hover");
      });
    });
  
    // Make cursor visible after initialization
    cursorInner.style.opacity = '1';
    cursorOuter.style.opacity = '1';
    
    console.log('Cursor effects initialized');
  }
  
  // Make cursor follow mouse on scroll as well
  window.addEventListener('scroll', function() {
    // If the cursor is not visible (mobile or already hidden)
    // then don't do anything
    const cursorInner = document.getElementById("cursor-inner");
    if (!cursorInner || window.getComputedStyle(cursorInner).display === 'none') {
      return;
    }
    
    // Otherwise, ensure the cursor remains visible during scrolling
    // by triggering a minimal mouse movement
    const event = new MouseEvent('mousemove', {
      'view': window,
      'bubbles': true,
      'cancelable': true,
      'clientX': window.cursorX || window.innerWidth / 2,
      'clientY': window.cursorY || window.innerHeight / 2
    });
    document.dispatchEvent(event);
  });
  
  // Store the last known mouse position
  document.addEventListener('mousemove', function(e) {
    window.cursorX = e.clientX;
    window.cursorY = e.clientY;
  });