// Override the clear command for both terminals
document.addEventListener('DOMContentLoaded', function() {
  // Function to process commands from either terminal
  function processTerminalCommand(inputElement, historyElement) {
    if (!inputElement || !historyElement) return;
    
    inputElement.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        const command = this.value.trim().toLowerCase();
        
        // Special handling for the clear command
        if (command === 'clear') {
          // Clear the history element completely
          historyElement.innerHTML = '';
          
          // Clear the input
          this.value = '';
          
          // Prevent the original handler from processing this
          event.stopImmediatePropagation();
        }
      }
    }, true); // Use capture to run before other handlers
  }
  
  // Apply to hero terminal
  const heroInput = document.getElementById('hero-terminal-input');
  const heroHistory = document.getElementById('hero-terminal-history');
  processTerminalCommand(heroInput, heroHistory);
  
  // Apply to contact terminal
  const contactInput = document.getElementById('terminal-input');
  const contactHistory = document.getElementById('terminal-history');
  processTerminalCommand(contactInput, contactHistory);
});
