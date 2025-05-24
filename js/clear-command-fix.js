// Add this event listener to both terminal inputs to handle the clear command properly
document.addEventListener('DOMContentLoaded', function() {
  // For Hero Terminal
  const heroTerminalInput = document.getElementById('hero-terminal-input');
  const heroTerminalHistory = document.getElementById('hero-terminal-history');
  
  if (heroTerminalInput && heroTerminalHistory) {
    heroTerminalInput.addEventListener('keydown', function(event) {
      if (event.key === 'Enter' && heroTerminalInput.value.trim().toLowerCase() === 'clear') {
        // Prevent default handling
        event.preventDefault();
        
        // Clear the terminal completely
        heroTerminalHistory.innerHTML = '';
        
        // Clear the input
        heroTerminalInput.value = '';
        
        // Focus back on input
        heroTerminalInput.focus();
        
        return false;
      }
    });
  }
  
  // For Contact Terminal
  const contactTerminalInput = document.getElementById('terminal-input');
  const contactTerminalHistory = document.getElementById('terminal-history');
  
  if (contactTerminalInput && contactTerminalHistory) {
    contactTerminalInput.addEventListener('keydown', function(event) {
      if (event.key === 'Enter' && contactTerminalInput.value.trim().toLowerCase() === 'clear') {
        // Prevent default handling
        event.preventDefault();
        
        // Clear the terminal completely
        contactTerminalHistory.innerHTML = '';
        
        // Clear the input
        contactTerminalInput.value = '';
        
        // Focus back on input
        contactTerminalInput.focus();
        
        return false;
      }
    });
  }
});
