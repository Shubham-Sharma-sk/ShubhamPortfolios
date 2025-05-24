// contact-form.js - Complete implementation with location fix
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initContactForm, 500);
    setTimeout(forceAddLocation, 1000); // Add location fix
  });
  
  function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) {
      console.log('Contact form not found yet, will try again later');
      return;
    }
    
    console.log('Contact form initialized');
    
    // Setup name-display-box with contenteditable div
    const dynamicName = document.getElementById('dynamic-name');
    const nameInput = document.getElementById('name');
    
    if (dynamicName && nameInput) {
      // When dynamic name field gets focus
      dynamicName.addEventListener('focus', function() {
        if (this.textContent === 'Your Name') {
          this.textContent = '';
        }
        this.classList.remove('name-placeholder');
      });
      
      // When dynamic name field loses focus
      dynamicName.addEventListener('blur', function() {
        if (this.textContent.trim() === '') {
          this.textContent = 'Your Name';
          this.classList.add('name-placeholder');
        }
        
        // Update hidden input with the name value
        nameInput.value = this.textContent;
      });
      
      // Update hidden input whenever content changes
      dynamicName.addEventListener('input', function() {
        nameInput.value = this.textContent;
      });
      
      // Initialize with class if default text
      if (dynamicName.textContent === 'Your Name') {
        dynamicName.classList.add('name-placeholder');
      }
      
      // Initialize hidden input value
      nameInput.value = dynamicName.textContent;
    }
    
    // Set up character counter for textarea
    const messageField = document.getElementById('message');
    const counterElement = document.querySelector('.character-counter');
    
    if (messageField && counterElement) {
      // Update counter on input
      messageField.addEventListener('input', function() {
        const count = this.value.length;
        counterElement.textContent = `${count}/1000`;
        
        // Add warning class when approaching limit
        if (count > 900) {
          counterElement.style.color = '#ffaa00';
        } else {
          counterElement.style.color = 'rgba(255, 255, 255, 0.5)';
        }
      });
    }
    
    // Add submit event listener for form
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      try {
        // Get form values
        const name = nameInput ? nameInput.value.trim() : '';
        const email = document.getElementById('email') ? document.getElementById('email').value.trim() : '';
        const subject = document.getElementById('subject') ? document.getElementById('subject').value.trim() : '';
        const message = document.getElementById('message') ? document.getElementById('message').value.trim() : '';
        
        // Basic validation
        if (!name || name === 'Your Name') {
          showToast('error', 'Please enter your name');
          dynamicName.focus();
          return;
        }
        
        if (!email) {
          showToast('error', 'Please enter your email');
          document.getElementById('email').focus();
          return;
        }
        
        if (!validateEmail(email)) {
          showToast('error', 'Please enter a valid email address');
          document.getElementById('email').focus();
          return;
        }
        
        if (!subject) {
          showToast('error', 'Please enter a subject');
          document.getElementById('subject').focus();
          return;
        }
        
        if (!message) {
          showToast('error', 'Please enter your message');
          document.getElementById('message').focus();
          return;
        }
        
        // Show sending state on button
        const submitButton = document.querySelector('.send-message-btn');
        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML = '<span class="loading-spinner"></span> Sending...';
        submitButton.disabled = true;
        
        // Prepare form data
        const formData = {
          name: name,
          email: email,
          subject: subject,
          message: message
        };
        
        console.log('Sending form data:', formData);
        
        // Send to API server
        // Use relative URL for both local and production environments
        fetch('/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Server error: ' + response.status);
          }
          return response.json();
        })
        .then(data => {
          // Restore button state
          submitButton.innerHTML = originalButtonText;
          submitButton.disabled = false;
          
          if (data.success) {
            showToast('success', 'Message sent!');
            
            // Reset form
            contactForm.reset();
            
            // Reset dynamic name field
            if (dynamicName) {
              dynamicName.textContent = 'Your Name';
              dynamicName.classList.add('name-placeholder');
              nameInput.value = '';
            }
            
            // Reset character counter
            if (counterElement) {
              counterElement.textContent = '0/1000';
              counterElement.style.color = 'rgba(255, 255, 255, 0.5)';
            }
          } else {
            throw new Error(data.message || 'Unknown error');
          }
        })
        .catch(error => {
          // Restore button state
          submitButton.innerHTML = originalButtonText;
          submitButton.disabled = false;
          
          console.error('Error sending message:', error);
          showToast('error', 'Failed to send message');
        });
      } catch (err) {
        console.error('Form submission error:', err);
        showToast('error', 'Form submission error');
        
        // Restore button in case of error
        const submitButton = document.querySelector('.send-message-btn');
        if (submitButton) {
          submitButton.innerHTML = 'Send Message';
          submitButton.disabled = false;
        }
      }
    });
  }
  
  // Email validation function
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  // Show compact toast notification function
  function showToast(type, message) {
    // Remove any existing toasts
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
      existingToast.remove();
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    
    // Add icon based on type
    let icon = '';
    switch (type) {
      case 'success':
        icon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>';
        break;
      case 'error':
        icon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
        break;
      default:
        icon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';
    }
    
    // Set toast content
    toast.innerHTML = `
      <div class="toast-icon">${icon}</div>
      <div class="toast-message">${message}</div>
    `;
    
    // Add to document
    document.body.appendChild(toast);
    
    // Show with animation
    setTimeout(() => {
      toast.classList.add('show');
    }, 10);
    
    // Auto-hide after delay
    const duration = type === 'error' ? 4000 : 2500;
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (document.body.contains(toast)) {
          toast.remove();
        }
      }, 300);
    }, duration);
  }
  
  // Location Fix: Direct approach that guarantees location display
  function forceAddLocation() {
    console.log('Running location fix...');
    
    // Get the element that should contain the location
    const getRightColumn = document.querySelector('.contact-content');
    if (!getRightColumn) {
      console.error('Cannot find contact content section');
      return;
    }
    
    // Check if a location item already exists anywhere
    const existingLocation = document.querySelector('.info-item:has(svg path[d*="M21 10c0 7-9"])');
    if (existingLocation) {
      console.log('Found existing location element, ensuring visibility');
      existingLocation.style.display = 'flex';
      existingLocation.style.visibility = 'visible';
      existingLocation.style.opacity = '1';
      return;
    }
    
    // Find the Get in Touch container
    let infoContainer = getRightColumn.querySelector('.contact-info-container');
    
    // If info container doesn't exist, create it
    if (!infoContainer) {
      console.log('Creating missing contact-info-container');
      
      const newInfoContainer = document.createElement('div');
      newInfoContainer.className = 'contact-info-container';
      newInfoContainer.innerHTML = `
        <h3 class="contact-subtitle">Get in Touch 👋</h3>
        <div class="contact-info"></div>
      `;
      
      getRightColumn.appendChild(newInfoContainer);
      infoContainer = newInfoContainer;
    }
    
    // Find the actual contact info container 
    let contactInfo = infoContainer.querySelector('.contact-info');
    
    // If that doesn't exist, create it
    if (!contactInfo) {
      console.log('Creating missing contact-info');
      const newContactInfo = document.createElement('div');
      newContactInfo.className = 'contact-info';
      infoContainer.appendChild(newContactInfo);
      contactInfo = newContactInfo;
    }
    
    // Now add the location element
    const locationHTML = `
      <div class="info-item" id="location-item" style="display:flex;visibility:visible;opacity:1;">
        <div class="info-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>
        <div class="info-content">
          <h4>Location</h4>
          <p>Ahmedabad, Gujarat, India</p>
        </div>
      </div>
    `;
    
    // Add it to the contact info container
    contactInfo.insertAdjacentHTML('beforeend', locationHTML);
    console.log('Location display added');
    
    // Add essential CSS to make sure everything displays correctly
    addLocationStyles();
  }
  
  // Add required styles for contact info display
  function addLocationStyles() {
    // Check if styles already added
    if (document.getElementById('location-fix-styles')) {
      return;
    }
    
    const styleEl = document.createElement('style');
    styleEl.id = 'location-fix-styles';
    styleEl.textContent = `
      /* Contact info container styling */
      .contact-info-container {
        background-color: rgba(30, 30, 45, 0.6);
        border-radius: 15px;
        padding: 30px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(60, 60, 80, 0.3);
        height: auto;
      }
      
      /* Contact info styling */
      .contact-info {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
      
      /* Info item styling - critical for visibility */
      .info-item {
        display: flex !important;
        visibility: visible !important;
        opacity: 1 !important;
        align-items: flex-start;
        margin-bottom: 20px;
        background: rgba(35, 35, 50, 0.7);
        border-radius: 8px;
        padding: 15px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        transition: all 0.3s ease;
        width: 100%;
        min-height: 76px;
      }
      
      /* Special styling for location item */
      #location-item {
        display: flex !important;
        visibility: visible !important;
        opacity: 1 !important;
      }
      
      /* Icon styling */
      .info-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        min-width: 40px;
        background: rgba(189, 95, 255, 0.15);
        border-radius: 8px;
        margin-right: 15px;
      }
      
      .info-icon svg {
        width: 20px;
        height: 20px;
        color: #bd5fff;
      }
      
      /* Content styling */
      .info-content {
        flex: 1;
      }
      
      .info-content h4 {
        font-size: 16px;
        margin: 0 0 5px 0;
        color: #fff;
        font-weight: 600;
      }
      
      .info-content p {
        font-size: 14px;
        margin: 0;
        color: rgba(255, 255, 255, 0.7);
        word-break: break-word;
        font-family: 'Fira Code', monospace;
      }
    `;
    
    document.head.appendChild(styleEl);
    console.log('Location styles added');
  }
  
  // Run location fix on window load too
  window.addEventListener('load', function() {
    setTimeout(initContactForm, 1000);
    setTimeout(forceAddLocation, 1500); // Add delay for location fix
  });
  
  // Re-initialize when components are loaded
  document.addEventListener('componentLoaded', function(e) {
    if (e.detail && e.detail.id === 'contact-component') {
      console.log('Contact component loaded, initializing form');
      setTimeout(initContactForm, 100);
      setTimeout(forceAddLocation, 300); // Add location fix after form init
    }
  });
  
  // Manual initialization function (can be called from console for debugging)
  window.initContactFormManually = function() {
    console.log('Manually initializing contact form');
    initContactForm();
    forceAddLocation();
  };
  
  // Function to check if the server is running
  window.checkServer = function() {
    // Use relative URL for both local and production environments
    fetch('/api/test')
      .then(response => response.json())
      .then(data => {
        console.log('Server status:', data);
        showToast('success', 'API server is running');
      })
      .catch(error => {
        console.error('Server check failed:', error);
        showToast('error', 'API server not accessible');
      });
  };