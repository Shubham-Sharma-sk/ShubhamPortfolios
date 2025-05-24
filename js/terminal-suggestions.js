// Terminal Auto-suggestion functionality
document.addEventListener('DOMContentLoaded', function() {
  // Available commands for auto-suggestion with enhanced descriptions and categories
  const commands = [
    { command: 'help', description: 'Show available commands', category: 'help', icon: '?' },
    { command: 'about', description: 'Learn about Shubham', category: 'about', icon: '👤' },
    { command: 'skills', description: 'View technical skills', category: 'skills', icon: '🛠️' },
    { command: 'experience', description: 'Show work experience', category: 'experience', icon: '💼' },
    { command: 'projects', description: 'Browse portfolio projects', category: 'projects', icon: '📂' },
    { command: 'contact', description: 'Get contact information', category: 'contact', icon: '📧' },
    { command: 'clear', description: 'Clear terminal screen', category: 'clear', icon: '🧹' },
    { command: 'see more', description: 'Explore the portfolio', category: 'explore', icon: '🔍' },
    { command: 'ls', description: 'List available sections', category: 'navigate', icon: '📋' },
    { command: 'cd', description: 'Navigate to section', category: 'navigate', icon: '��' },
    { command: 'whoami', description: 'Display profile information', category: 'system', icon: '🔑' },
    { command: 'date', description: 'Show current date and time', category: 'system', icon: '📅' },
  ];
  
  // Command history array
  let commandHistory = [];
  let historyIndex = -1;

  // Get terminal elements
  const terminalInput = document.getElementById('hero-terminal-input');
  const mobileTerminalInput = document.getElementById('mobile-terminal-input');
  const terminalBody = document.getElementById('hero-terminal-history');
  const mobileTerminalBody = document.getElementById('mobile-terminal-history');
  
  // Apply to both desktop and mobile terminals
  setupTerminal(terminalInput, terminalBody);
  if (mobileTerminalInput && mobileTerminalBody) {
    setupTerminal(mobileTerminalInput, mobileTerminalBody);
  }
  
  function setupTerminal(input, terminal) {
    if (!input || !terminal) return;
    
    // Create suggestions container with enhanced styling
    const suggestionsContainer = document.createElement('div');
    suggestionsContainer.className = 'terminal-suggestions';
    suggestionsContainer.style.display = 'none';
    input.parentNode.insertBefore(suggestionsContainer, input);
    
    // Add live typing indicator
    const typingIndicator = document.createElement('span');
    typingIndicator.className = 'terminal-typing-indicator';
    input.parentNode.appendChild(typingIndicator);
    
    let currentSuggestions = [];
    let selectedSuggestionIndex = -1;
    let typingTimer;
    
    // Handle input changes for suggestions with fuzzy matching
    input.addEventListener('input', function() {
      const inputValue = input.value.trim().toLowerCase();
      
      // Show typing indicator
      clearTimeout(typingTimer);
      typingIndicator.style.display = 'inline-block';
      typingTimer = setTimeout(() => {
        typingIndicator.style.display = 'none';
      }, 1000);
      
      if (inputValue === '') {
        hideSuggestions();
        return;
      }
      
      // Improved filtering with fuzzy matching and relevance sorting
      currentSuggestions = commands
        .filter(cmd => cmd.command.toLowerCase().includes(inputValue) || 
                      cmd.description.toLowerCase().includes(inputValue))
        .sort((a, b) => {
          // Exact matches first, then by whether command starts with input
          const aStartsWith = a.command.toLowerCase().startsWith(inputValue) ? 0 : 1;
          const bStartsWith = b.command.toLowerCase().startsWith(inputValue) ? 0 : 1;
          
          // Sort by match position and then alphabetically
          if (aStartsWith !== bStartsWith) return aStartsWith - bStartsWith;
          return a.command.localeCompare(b.command);
        });
      
      if (currentSuggestions.length > 0) {
        displaySuggestions(currentSuggestions);
        selectedSuggestionIndex = -1;
      } else {
        hideSuggestions();
      }
    });
    
    // Enhanced keyboard navigation with history support
    input.addEventListener('keydown', function(e) {
      // Command history navigation
      if (e.key === 'ArrowUp' && suggestionsContainer.style.display === 'none') {
        e.preventDefault();
        if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
          historyIndex++;
          input.value = commandHistory[commandHistory.length - 1 - historyIndex];
          input.setSelectionRange(input.value.length, input.value.length);
        }
        return;
      }
      
      if (e.key === 'ArrowDown' && suggestionsContainer.style.display === 'none') {
        e.preventDefault();
        if (historyIndex > 0) {
          historyIndex--;
          input.value = commandHistory[commandHistory.length - 1 - historyIndex];
          input.setSelectionRange(input.value.length, input.value.length);
        } else if (historyIndex === 0) {
          historyIndex = -1;
          input.value = '';
        }
        return;
      }
      
      // Suggestion navigation
      if (suggestionsContainer.style.display !== 'none') {
        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault();
            navigateSuggestion(1);
            break;
          case 'ArrowUp':
            e.preventDefault();
            navigateSuggestion(-1);
            break;
          case 'Tab':
            e.preventDefault();
            if (currentSuggestions.length > 0) {
              if (selectedSuggestionIndex >= 0) {
                selectSuggestion(selectedSuggestionIndex);
              } else {
                selectSuggestion(0);
              }
            }
            break;
          case 'Enter':
            if (selectedSuggestionIndex >= 0) {
              e.preventDefault();
              selectSuggestion(selectedSuggestionIndex);
            }
            break;
          case 'Escape':
            e.preventDefault();
            hideSuggestions();
            break;
        }
      }
      
      // Enter to execute command
      if (e.key === 'Enter' && suggestionsContainer.style.display === 'none') {
        const command = input.value.trim();
        if (command) {
          // Add to command history
          commandHistory.push(command);
          historyIndex = -1;
          
          // Execute command
          addTerminalLine(terminal, `> ${command}`, 'command');
          processCommand(command, terminal);
          
          // Clear input
          input.value = '';
        }
      }
    });
    
    // Hide suggestions when clicking outside
    document.addEventListener('click', function(e) {
      if (!suggestionsContainer.contains(e.target) && e.target !== input) {
        hideSuggestions();
      }
    });
    
    // Display filtered suggestions with enhanced UI
    function displaySuggestions(suggestions) {
      suggestionsContainer.innerHTML = '';
      
      suggestions.forEach((suggestion, index) => {
        const item = document.createElement('div');
        item.className = 'suggestion-item';
        item.dataset.index = index;
        
        // Use emoji icons for commands
        const iconSpan = document.createElement('span');
        iconSpan.className = 'suggestion-icon';
        iconSpan.textContent = suggestion.icon || '›';
        
        const textSpan = document.createElement('span');
        textSpan.className = `suggestion-text command-${suggestion.category}`;
        
        // Highlight the matching part of the command
        const inputValue = input.value.trim().toLowerCase();
        const command = suggestion.command;
        if (inputValue && command.toLowerCase().includes(inputValue)) {
          const startIndex = command.toLowerCase().indexOf(inputValue);
          const endIndex = startIndex + inputValue.length;
          
          if (startIndex > 0) {
            textSpan.appendChild(document.createTextNode(command.substring(0, startIndex)));
          }
          
          const highlightSpan = document.createElement('span');
          highlightSpan.className = 'highlighted-text';
          highlightSpan.textContent = command.substring(startIndex, endIndex);
          textSpan.appendChild(highlightSpan);
          
          if (endIndex < command.length) {
            textSpan.appendChild(document.createTextNode(command.substring(endIndex)));
          }
        } else {
          textSpan.textContent = command;
        }
        
        const descSpan = document.createElement('span');
        descSpan.className = 'suggestion-description';
        descSpan.textContent = suggestion.description;
        
        item.appendChild(iconSpan);
        item.appendChild(textSpan);
        item.appendChild(descSpan);
        
        // Add click event to select this suggestion
        item.addEventListener('click', function() {
          selectSuggestion(index);
        });
        
        // Add hover effect
        item.addEventListener('mouseenter', function() {
          navigateSuggestion(index, true);
        });
        
        suggestionsContainer.appendChild(item);
      });
      
      suggestionsContainer.style.display = 'block';
    }
    
    // Hide suggestions
    function hideSuggestions() {
      suggestionsContainer.style.display = 'none';
      
      // Remove any preview elements
      const existingPreview = input.parentNode.querySelector('.input-preview');
      if (existingPreview) {
        input.parentNode.removeChild(existingPreview);
      }
    }
    
    // Navigate through suggestions with keyboard
    function navigateSuggestion(directionOrIndex, isAbsolute = false) {
      const items = suggestionsContainer.querySelectorAll('.suggestion-item');
      if (items.length === 0) return;
      
      // Remove active class from current selection
      if (selectedSuggestionIndex >= 0 && selectedSuggestionIndex < items.length) {
        items[selectedSuggestionIndex].classList.remove('active');
      }
      
      // Calculate new index
      if (isAbsolute) {
        // Use the provided index directly
        selectedSuggestionIndex = directionOrIndex;
      } else {
        // Calculate based on direction
        if (directionOrIndex > 0) {
          selectedSuggestionIndex = (selectedSuggestionIndex + 1) % items.length;
        } else {
          selectedSuggestionIndex = (selectedSuggestionIndex <= 0) ? 
            items.length - 1 : selectedSuggestionIndex - 1;
        }
      }
      
      // Make sure index is within bounds
      selectedSuggestionIndex = Math.max(0, Math.min(selectedSuggestionIndex, items.length - 1));
      
      // Add active class to new selection
      items[selectedSuggestionIndex].classList.add('active');
      
      // Scroll into view if necessary
      items[selectedSuggestionIndex].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      
      // Show preview of the command in the input field
      const suggestedCommand = currentSuggestions[selectedSuggestionIndex].command;
      if (suggestedCommand) {
        const currentValue = input.value.trim();
        const previewInput = document.createElement('div');
        previewInput.className = 'input-preview';
        previewInput.textContent = suggestedCommand;
        
        // Remove existing preview if any
        const existingPreview = input.parentNode.querySelector('.input-preview');
        if (existingPreview) {
          input.parentNode.removeChild(existingPreview);
        }
        input.parentNode.appendChild(previewInput);
      }
    }
    
    // Select a suggestion with animation
    function selectSuggestion(index) {
      const suggestion = currentSuggestions[index];
      if (suggestion) {
        // Add a subtle animation effect
        const item = suggestionsContainer.querySelector(`.suggestion-item[data-index="${index}"]`);
        if (item) {
          item.classList.add('selected');
          setTimeout(() => {
            input.value = suggestion.command;
            hideSuggestions();
            input.focus();
          }, 100);
        }
      }
    }
    
    // Initialize terminal with welcome message
    if (terminal.innerHTML.trim() === '') {
      addTerminalLine(terminal, "Welcome to Shubham's Portfolio Terminal", 'system');
      addTerminalLine(terminal, "Type 'help' for available commands.", 'system');
      addTerminalPrompt(terminal);
    }
  }
  
  // Add a line to the terminal
  function addTerminalLine(terminal, text, type = 'text') {
    const line = document.createElement('div');
    line.className = `terminal-line ${type}`;
    
    if (type === 'command') {
      line.innerHTML = `<span class="terminal-prompt">${text}</span>`;
    } else if (type === 'system') {
      line.innerHTML = `<span class="system-message">${text}</span>`;
    } else {
      // Apply syntax highlighting for known commands
      commands.forEach(cmd => {
        if (text.includes(cmd.command)) {
          text = text.replace(
            cmd.command, 
            `<span class="command-${cmd.category}">${cmd.command}</span>`
          );
        }
      });
      
      line.innerHTML = text;
    }
    
    terminal.appendChild(line);
    terminal.scrollTop = terminal.scrollHeight;
  }
  
  // Add prompt line to terminal
  function addTerminalPrompt(terminal) {
    const line = document.createElement('div');
    line.className = 'terminal-prompt-line';
    line.innerHTML = '<span class="terminal-prompt">></span>';
    terminal.appendChild(line);
    terminal.scrollTop = terminal.scrollHeight;
  }
  
  // Process terminal commands
  function processCommand(command, terminal) {
    const cmd = command.toLowerCase();
    
    switch(cmd) {
      case 'help':
        addTerminalLine(terminal, 'Available commands:', 'text');
        addTerminalLine(terminal, '• help - Show available commands', 'text');
        addTerminalLine(terminal, '• about - Learn about Shubham', 'text');
        addTerminalLine(terminal, '• skills - View technical skills', 'text');
        addTerminalLine(terminal, '• experience - Show work experience', 'text');
        addTerminalLine(terminal, '• projects - Browse portfolio projects', 'text');
        addTerminalLine(terminal, '• contact - Get contact information', 'text');
        addTerminalLine(terminal, '• clear - Clear terminal screen', 'text');
        addTerminalLine(terminal, '• see more - Explore the portfolio', 'text');
        addTerminalLine(terminal, '• ls - List available sections', 'text');
        addTerminalLine(terminal, '• whoami - Display profile information', 'text');
        addTerminalLine(terminal, '• date - Show current date and time', 'text');
        break;
      case 'about':
        addTerminalLine(terminal, "I'm Shubham Khandelwal, a UI/UX Designer and Web Developer with a background in DevOps engineering.", 'text');
        addTerminalLine(terminal, "I specialize in creating beautiful interfaces and seamless digital experiences that both delight users and solve real problems.", 'text');
        break;
      case 'skills':
        addTerminalLine(terminal, "Technical Skills:", 'text');
        addTerminalLine(terminal, "• Frontend: HTML5, CSS3, JavaScript, React, Angular", 'text');
        addTerminalLine(terminal, "• UI/UX: Figma, Adobe XD, User Research, Wireframing", 'text');
        addTerminalLine(terminal, "• DevOps: Docker, Kubernetes, CI/CD, AWS, Azure", 'text');
        break;
      case 'experience':
        addTerminalLine(terminal, "Work Experience:", 'text');
        addTerminalLine(terminal, "• DevOps Engineer @ AirCon Infotech (2023-2024)", 'text');
        addTerminalLine(terminal, "• UI/UX Designer & Web Developer (2022-Present)", 'text');
        addTerminalLine(terminal, "• Lead Full Stack Web Developer (2024-Present)", 'text');
        break;
      case 'projects':
        addTerminalLine(terminal, "Portfolio Projects:", 'text');
        addTerminalLine(terminal, "• HIAIDO - AI-powered cloud management", 'text');
        addTerminalLine(terminal, "• OSLStrategy - Business website", 'text');
        addTerminalLine(terminal, "• The-DevOps-Guy - Learning platform", 'text');
        addTerminalLine(terminal, "• EventEco - Event management platform", 'text');
        break;
      case 'contact':
        addTerminalLine(terminal, "Contact Information:", 'text');
        addTerminalLine(terminal, "• Email: shubhamsharma2004.16@gmail.com", 'text');
        addTerminalLine(terminal, "• Phone: +91 8866955496", 'text');
        addTerminalLine(terminal, "• Location: Ahmedabad, Gujarat, India", 'text');
        break;
      case 'clear':
        terminal.innerHTML = '';
        break;
      case 'see more':
      case 'seemore':
        addTerminalLine(terminal, "Explore my portfolio by scrolling down or using the navigation menu.", 'text');
        break;
      case 'ls':
        addTerminalLine(terminal, "Available sections:", 'text');
        addTerminalLine(terminal, "• home/ - Main landing page", 'text');
        addTerminalLine(terminal, "• about/ - About me section", 'text');
        addTerminalLine(terminal, "• skills/ - Technical skills", 'text');
        addTerminalLine(terminal, "• projects/ - Portfolio projects", 'text');
        addTerminalLine(terminal, "• contact/ - Contact information", 'text');
        break;
      case 'cd':
        addTerminalLine(terminal, "Please specify a section (e.g., 'cd projects')", 'text');
        break;
      case 'whoami':
        addTerminalLine(terminal, "Shubham Khandelwal", 'text');
        addTerminalLine(terminal, "UI/UX Designer & DevOps Engineer", 'text');
        addTerminalLine(terminal, "Passionate about creating beautiful digital experiences", 'text');
        break;
      case 'date':
        const now = new Date();
        addTerminalLine(terminal, now.toLocaleString(), 'text');
        break;
      default:
        if (cmd.startsWith('cd ')) {
          const section = cmd.substring(3).trim();
          addTerminalLine(terminal, `Navigating to ${section} section...`, 'text');
          
          // Simulate navigation (in a real implementation, this would scroll to sections)
          setTimeout(() => {
            const sectionMap = {
              'home': '#home',
              'about': '#about',
              'skills': '#skills',
              'projects': '#projects',
              'contact': '#contact'
            };
            
            if (sectionMap[section]) {
              addTerminalLine(terminal, `Successfully navigated to ${section}`, 'text');
              // In a real implementation: document.querySelector(sectionMap[section]).scrollIntoView();
            } else {
              addTerminalLine(terminal, `Section not found: ${section}`, 'text');
            }
          }, 500);
        } else {
          addTerminalLine(terminal, `Command not found: ${command}. Type "help" for available commands.`, 'text');
        }
    }
    
    // Add a new prompt line unless it was a clear command
    if (cmd !== 'clear') {
      addTerminalPrompt(terminal);
    }
  }
});
