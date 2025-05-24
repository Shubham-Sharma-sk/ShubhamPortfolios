// This script ensures terminals are properly initialized

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('Terminal init script loaded!');
  
  // Initialize the hero terminal
  setTimeout(function() {
    initHeroTerminal();
    console.log('Hero terminal initialized');
    
    // Make sure the hero terminal container is visible and properly positioned
    const heroTerminalContainer = document.querySelector('.terminal-container');
    if (heroTerminalContainer) {
      heroTerminalContainer.style.display = 'block';
      heroTerminalContainer.style.position = 'relative';
      heroTerminalContainer.style.zIndex = '10';
      
      // Focus the terminal input
      const terminalInput = document.getElementById('hero-terminal-input');
      if (terminalInput) {
        terminalInput.focus();
      }
    }
    
    // Initialize the contact terminal if it exists
    initContactTerminal();
    console.log('Contact terminal initialized');
  }, 500); // Small delay to ensure components are loaded
});
