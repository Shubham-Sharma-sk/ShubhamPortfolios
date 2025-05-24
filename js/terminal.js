// Terminal functionality
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
    initHeroTerminal();
    initContactTerminal();
  }, 500); // Slight delay to ensure elements are loaded
});

// Available commands for auto-suggestion
const availableCommands = [
  'help',
  'about',
  'skills',
  'experience',
  'contact',
  'projects',
  'see more',
  'clear'
];

// Auto-suggestion function
function getCommandSuggestions(input) {
  if (!input) return [];
  input = input.toLowerCase();
  return availableCommands.filter(cmd => cmd.startsWith(input));
}

// Hero section terminal initialization
function initHeroTerminal() {
  const terminalInput = document.getElementById('hero-terminal-input');
  const terminalHistory = document.getElementById('hero-terminal-history');
  
  if (!terminalInput || !terminalHistory) return;
  
  // Create suggestion element
  let suggestionElement = document.createElement('div');
  suggestionElement.className = 'terminal-suggestion';
  terminalInput.parentNode.appendChild(suggestionElement);
  
  // Create cursor indicator element
  let cursorIndicator = document.createElement('span');
  cursorIndicator.className = 'terminal-cursor-indicator';
  cursorIndicator.style.display = 'none';
  terminalInput.parentNode.appendChild(cursorIndicator);
  
  // Focus terminal input when container is clicked
  const terminalContainer = document.querySelector('.hero-terminal-container');
  if (terminalContainer) {
    terminalContainer.addEventListener('click', function() {
      terminalInput.focus();
    });
  }
  
  // Show cursor when input is focused
  terminalInput.addEventListener('focus', function() {
    cursorIndicator.style.display = 'inline-block';
  });
  
  // Hide cursor when input loses focus
  terminalInput.addEventListener('blur', function() {
    cursorIndicator.style.display = 'none';
  });
  
  // Handle input changes for auto-suggestions
  terminalInput.addEventListener('input', function() {
    const inputValue = terminalInput.value.trim().toLowerCase();
    const suggestions = getCommandSuggestions(inputValue);
    
    if (suggestions.length > 0 && inputValue) {
      // Split the suggestion into typed part and completion part
      const completionPart = suggestions[0].substring(inputValue.length);
      
      // Set HTML with highlighted suggestion part
      suggestionElement.innerHTML = inputValue + '<span class="suggestion-highlight">' + completionPart + '</span>';
      suggestionElement.style.display = 'flex';
    } else {
      suggestionElement.style.display = 'none';
    }
  });
  
  // Handle keydown events for tab completion and command execution
  terminalInput.addEventListener('keydown', function(event) {
    // Tab completion
    if (event.key === 'Tab') {
      event.preventDefault(); // Prevent focus change
      
      const inputValue = terminalInput.value.trim().toLowerCase();
      const suggestions = getCommandSuggestions(inputValue);
      
      if (suggestions.length > 0) {
        terminalInput.value = suggestions[0];
        // Move cursor to end of input
        setTimeout(() => {
          terminalInput.selectionStart = terminalInput.selectionEnd = terminalInput.value.length;
        }, 0);
      }
      
      // Hide suggestion after completion
      suggestionElement.style.display = 'none';
    }
    
    // Process command when Enter is pressed
    if (event.key === 'Enter') {
      const command = terminalInput.value.trim();
      if (command) {
        // Add command to history
        const commandLine = document.createElement('p');
        commandLine.innerHTML = `<span class="terminal-prompt">></span> ${command}`;
        terminalHistory.appendChild(commandLine);
        
        // Process command and display response
        const response = processCommand(command);
        terminalHistory.appendChild(response);
        
        // Clear input and suggestion, then scroll to bottom
        terminalInput.value = '';
        suggestionElement.style.display = 'none';
        terminalHistory.scrollTop = terminalHistory.scrollHeight;
      }
    }
  });
  
  // Display initial terminal content for the hero section
  displayHeroTerminal(terminalHistory);
}

// Contact section terminal initialization
function initContactTerminal() {
  const terminalInput = document.getElementById('terminal-input');
  const terminalHistory = document.getElementById('terminal-history');
  
  if (!terminalInput || !terminalHistory) return;
  
  // Create suggestion element
  let suggestionElement = document.createElement('div');
  suggestionElement.className = 'terminal-suggestion';
  terminalInput.parentNode.appendChild(suggestionElement);
  
  // Create cursor indicator element
  let cursorIndicator = document.createElement('span');
  cursorIndicator.className = 'terminal-cursor-indicator';
  cursorIndicator.style.display = 'none';
  terminalInput.parentNode.appendChild(cursorIndicator);
  
  // Focus terminal input when container is clicked
  const terminalContainer = document.querySelector('.contact-right-column .terminal-container');
  if (terminalContainer) {
    terminalContainer.addEventListener('click', function() {
      terminalInput.focus();
    });
  }
  
  // Show cursor when input is focused
  terminalInput.addEventListener('focus', function() {
    cursorIndicator.style.display = 'inline-block';
  });
  
  // Hide cursor when input loses focus
  terminalInput.addEventListener('blur', function() {
    cursorIndicator.style.display = 'none';
  });

  // Handle input changes for auto-suggestions
  terminalInput.addEventListener('input', function() {
    const inputValue = terminalInput.value.trim().toLowerCase();
    const suggestions = getCommandSuggestions(inputValue);
    
    if (suggestions.length > 0 && inputValue) {
      // Split the suggestion into typed part and completion part
      const completionPart = suggestions[0].substring(inputValue.length);
      
      // Set HTML with highlighted suggestion part
      suggestionElement.innerHTML = inputValue + '<span class="suggestion-highlight">' + completionPart + '</span>';
      suggestionElement.style.display = 'flex';
    } else {
      suggestionElement.style.display = 'none';
    }
  });
  
  // Handle keydown events for tab completion and command execution
  terminalInput.addEventListener('keydown', function(event) {
    // Tab completion
    if (event.key === 'Tab') {
      event.preventDefault(); // Prevent focus change
      
      const inputValue = terminalInput.value.trim().toLowerCase();
      const suggestions = getCommandSuggestions(inputValue);
      
      if (suggestions.length > 0) {
        terminalInput.value = suggestions[0];
        // Move cursor to end of input
        setTimeout(() => {
          terminalInput.selectionStart = terminalInput.selectionEnd = terminalInput.value.length;
        }, 0);
      }
      
      // Hide suggestion after completion
      suggestionElement.style.display = 'none';
    }
    
    // Process command when Enter is pressed
    if (event.key === 'Enter') {
      const command = terminalInput.value.trim();
      if (command) {
        // Add command to history
        const commandLine = document.createElement('p');
        commandLine.innerHTML = `<span class="terminal-prompt">></span> ${command}`;
        terminalHistory.appendChild(commandLine);
        
        // Process command and display response
        const response = processCommand(command);
        terminalHistory.appendChild(response);
        
        // Clear input and suggestion, then scroll to bottom
        terminalInput.value = '';
        suggestionElement.style.display = 'none';
        terminalHistory.scrollTop = terminalHistory.scrollHeight;
      }
    }
  });
  
  // Display initial terminal for contact section
  displayContactTerminal(terminalHistory);
}

// Display initial content for the hero terminal
function displayHeroTerminal(terminalHistory) {
  // Displaying content like in the reference image
  addTerminalLine(terminalHistory, '> ls');
  addTerminalLine(terminalHistory, 'Command not found: ls. Type \'help\' for\navailable commands.');
  
  addTerminalLine(terminalHistory, '> help');
  addTerminalLine(terminalHistory, 'Available commands: help, about, skills,\nexperience, contact, clear');
  
  // Add the 'see more' prompt with larger text
  const seeMoreLine = document.createElement('p');
  seeMoreLine.className = 'see-more-prompt';
  seeMoreLine.textContent = '> Please type "see more" to explore my portfolio...';
  seeMoreLine.style.fontSize = '24px';
  seeMoreLine.style.fontWeight = 'bold';
  seeMoreLine.style.margin = '12px 0';
  terminalHistory.appendChild(seeMoreLine);
  
  const blinkingLine = document.createElement('p');
  blinkingLine.className = 'blinking-prompt';
  blinkingLine.textContent = '>';
  terminalHistory.appendChild(blinkingLine);
}

// Display initial content for the contact terminal
function displayContactTerminal(terminalHistory) {
  // Simple greeting for contact section terminal
  addTerminalLine(terminalHistory, '> ls');
  addTerminalLine(terminalHistory, 'Command not found: ls. Type \'help\' for\navailable commands.');
  
  addTerminalLine(terminalHistory, '> help');
  addTerminalLine(terminalHistory, 'Available commands: help, about, skills,\nexperience, contact, clear');
  
  addTerminalLine(terminalHistory, '> Type a command (try \'help\')...');
}

function addTerminalLine(container, text) {
  const line = document.createElement('p');
  line.textContent = text;
  container.appendChild(line);
}

// Process terminal commands
function processCommand(command) {
  const responseElement = document.createElement('div');
  responseElement.classList.add('command-response');
  
  const cmd = command.toLowerCase().trim();
  
  switch(cmd) {
    case 'help':
      responseElement.textContent = 'Available commands: help, about, skills, experience, contact, projects, see more, clear';
      break;
      
    case 'about':
      responseElement.textContent = 'I\'m Shubham Khandelwal, a UI/UX Designer and Web Developer with a background in DevOps engineering. I specialize in creating beautiful interfaces and seamless digital experiences.';
      break;
      
    case 'skills':
      responseElement.textContent = 'Technical Skills:\n- UI/UX Design: Figma, Canva, Logo Design\n- Frontend: HTML, CSS, JavaScript, React\n- Backend: Node.js, Express, MongoDB\n- DevOps: AWS, CI/CD, GitHub Actions';
      break;
      
    case 'contact':
      responseElement.textContent = 'Contact Information:\nEmail: shubhamsharma2004.16@gmail.com\nPhone: +91 8866955496\nLocation: Ahmedabad, Gujarat, India\n\nConnect with me on LinkedIn or GitHub';
      break;
      
    case 'projects':
      responseElement.textContent = 'Featured Projects:\n1. HIAIDO - AI-powered cloud management\n2. OSLStrategy - Business website\n3. The-DevOps-Guy - Learning platform\n4. EventEco - Event management platform';
      break;
      
    case 'experience':
      responseElement.textContent = 'Work Experience:\n- DevOps Engineer @ AirCon Infotech (2023-2024)\n- UI/UX Designer & Web Developer (2022-Present)\n- Lead Full Stack Web Developer (2024-Present)';
      break;
    
    case 'see more':
    case 'seemore':
      responseElement.textContent = 'Portfolio Highlights:\n\nI build modern web applications with a focus on both aesthetics and functionality.\n\nMy work combines stunning visuals with intuitive user experiences.\n\nCheck out my projects section to see examples of my work or contact me to discuss your project needs!';
      break;
      
    case 'clear':
      // This is a special case - we'll handle it in the keydown event
      document.getElementById('hero-terminal-history').innerHTML = '';
      document.getElementById('terminal-history').innerHTML = '';
      
      // Return an empty element so nothing gets added to the history
      return document.createElement('div');
      
    default:
      responseElement.textContent = `Command not found: ${cmd}\nType 'help' to see available commands.`;
  }
  
  // Format text content with newlines preserved
  responseElement.style.whiteSpace = 'pre-line';
  
  return responseElement;
}
