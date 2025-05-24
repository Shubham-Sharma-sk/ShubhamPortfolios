// Standalone script to force location display - add this to your HTML
// Check if we're in a browser environment first
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
(function() {
  // Run the fix immediately and multiple times with delays
  fixLocation();
  setTimeout(fixLocation, 500);
  setTimeout(fixLocation, 1000);
  setTimeout(fixLocation, 2000);
  
  // Also run when the page is fully loaded
  window.addEventListener('load', function() {
    fixLocation();
    setTimeout(fixLocation, 500);
  });
  
  function fixLocation() {
    console.log('🚀 Running standalone location fix');
    
    // Find the "Get in Touch" element
    const getTouchContainers = Array.from(document.querySelectorAll('h3')).filter(
      el => el.textContent.includes('Get in Touch') || el.textContent.includes('get in touch')
    );
    
    if (getTouchContainers.length === 0) {
      console.log('❌ Could not find "Get in Touch" heading');
      
      // Try plan B: look for contact section
      const contactSection = document.querySelector('#contact') || 
                            document.querySelector('.contact-section-container') ||
                            document.querySelector('.contact-section') ||
                            document.querySelector('.contact-content');
      
      if (!contactSection) {
        console.error('❌ Cannot find contact section');
        return;
      }
      
      // Find the right column element - likely the second child that's not the form
      let rightColumn = null;
      const children = contactSection.children;
      
      if (children.length >= 2) {
        // Assume the second child is the right column if it's not a form
        if (!children[1].matches('.contact-form-container') && !children[1].matches('.contact-form')) {
          rightColumn = children[1];
        } else {
          // Otherwise create a new container and add it to the section
          rightColumn = document.createElement('div');
          rightColumn.className = 'contact-info-container';
          contactSection.appendChild(rightColumn);
        }
      } else {
        // Only one child, create a new container
        rightColumn = document.createElement('div');
        rightColumn.className = 'contact-info-container';
        contactSection.appendChild(rightColumn);
      }
      
      // Add the full content structure to the right column
      rightColumn.innerHTML = `
        <h3 class="contact-subtitle">Get in Touch 👋</h3>
        <div class="contact-info">
          <div class="info-item" style="display:flex !important; visibility:visible !important; opacity:1 !important;">
            <div class="info-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
            <div class="info-content">
              <h4>Call Me</h4>
              <p>+91 8866955496</p>
            </div>
          </div>
          <div class="info-item" style="display:flex !important; visibility:visible !important; opacity:1 !important;">
            <div class="info-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <div class="info-content">
              <h4>Email</h4>
              <p>shubhamsharma2004.16@gmail.com</p>
            </div>
          </div>
          <div id="location-item" class="info-item" style="display:flex !important; visibility:visible !important; opacity:1 !important;">
            <div class="info-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <div class="info-content">
              <h4>Location</h4>
              <p>Ahmedabad, Gujarat 380015, India</p>
            </div>
          </div>
        </div>
      `;
      
      console.log('✅ Created entire contact info structure');
      addEmergencyStyles();
      return;
    }
    
    // Found "Get in Touch" heading, now find its parent container
    const getTouchContainer = getTouchContainers[0].closest('.contact-info-container') || 
                              getTouchContainers[0].parentElement;
    
    if (!getTouchContainer) {
      console.error('❌ Found "Get in Touch" heading but cannot find its container');
      return;
    }
    
    // Check if location element already exists
    const existingLocation = document.querySelector('.info-item svg path[d*="M21 10c0 7-9"]');
    if (existingLocation) {
      // Make parent elements visible
      const locationItem = existingLocation.closest('.info-item');
      if (locationItem) {
        console.log('✅ Found existing location element, making it visible');
        
        // Apply direct inline styles to make sure it's visible
        locationItem.setAttribute('style', 'display:flex !important; visibility:visible !important; opacity:1 !important; margin-bottom:20px !important; height:auto !important; min-height:76px !important;');
        
        // Also make parent visible
        const infoContainer = locationItem.parentElement;
        if (infoContainer) {
          infoContainer.setAttribute('style', 'display:block !important; visibility:visible !important; opacity:1 !important;');
        }
        
        return;
      }
    }
    
    // Find or create the contact-info container
    let contactInfo = getTouchContainer.querySelector('.contact-info');
    if (!contactInfo) {
      console.log('Creating missing contact-info container');
      contactInfo = document.createElement('div');
      contactInfo.className = 'contact-info';
      getTouchContainer.appendChild(contactInfo);
    }
    
    // Check if we already have added our special location element
    if (document.getElementById('forced-location-item')) {
      console.log('✅ Our forced location element already exists');
      return;
    }
    
    // Create the location element with all necessary inline styles
    const locationElement = document.createElement('div');
    locationElement.id = 'forced-location-item';
    locationElement.className = 'info-item';
    locationElement.setAttribute('style', 'display:flex !important; visibility:visible !important; opacity:1 !important; align-items:flex-start !important; margin-bottom:20px !important; background:rgba(35,35,50,0.7) !important; border-radius:8px !important; padding:15px !important; border:1px solid rgba(255,255,255,0.1) !important; height:auto !important; min-height:76px !important;');
    
    locationElement.innerHTML = `
      <div class="info-icon" style="display:flex !important; align-items:center !important; justify-content:center !important; width:40px !important; height:40px !important; min-width:40px !important; background:rgba(189,95,255,0.15) !important; border-radius:8px !important; margin-right:15px !important;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:20px !important; height:20px !important; color:#bd5fff !important;">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      </div>
      <div class="info-content" style="flex:1 !important;">
        <h4 style="font-size:16px !important; margin:0 0 5px 0 !important; color:#fff !important; font-weight:600 !important;">Location</h4>
        <p style="font-size:14px !important; margin:0 !important; color:rgba(255,255,255,0.7) !important; word-break:break-word !important; font-family:'Fira Code',monospace !important;">Ahmedabad, Gujarat 380015, India</p>
      </div>
    `;
    
    // Add the location element to the contact info container
    contactInfo.appendChild(locationElement);
    console.log('✅ Added forced location element with inline styles');
    
    // Also add some emergency styles
    addEmergencyStyles();
  }
  
  function addEmergencyStyles() {
    if (document.getElementById('emergency-location-styles')) {
      return; // Already added
    }
    
    const style = document.createElement('style');
    style.id = 'emergency-location-styles';
    style.textContent = `
      /* Critical override styles for contact info */
      .contact-info-container {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        padding: 30px !important;
      }
      
      .contact-info {
        display: flex !important;
        flex-direction: column !important;
        visibility: visible !important;
        opacity: 1 !important;
      }
      
      .info-item {
        display: flex !important;
        visibility: visible !important;
        opacity: 1 !important;
        margin-bottom: 20px !important;
      }
      
      #forced-location-item {
        display: flex !important;
        visibility: visible !important;
        opacity: 1 !important;
        z-index: 999 !important;
      }
    `;
    
    document.head.appendChild(style);
    console.log('✅ Added emergency override styles');
  }
})();
}