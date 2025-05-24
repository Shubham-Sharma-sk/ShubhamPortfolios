// Check if we're in a browser environment
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  // Direct script to force the address to show up
  document.addEventListener('DOMContentLoaded', function() {
  // Add a small delay to make sure the DOM is fully loaded
  setTimeout(function() {
    console.log('🔍 Force-location script running...');
    
    // Create a direct location element
    const locationDiv = document.createElement('div');
    locationDiv.className = 'info-item force-location';
    locationDiv.style.cssText = 'display:flex !important; visibility:visible !important; opacity:1 !important; background:rgba(35,35,50,0.7) !important; border-radius:8px !important; padding:15px !important; border:1px solid rgba(255,255,255,0.1) !important; margin-bottom:20px !important; width:100% !important;';
    
    // Add content to the location element
    locationDiv.innerHTML = `
      <div class="info-icon" style="display:flex !important; align-items:center !important; justify-content:center !important; width:40px !important; height:40px !important; min-width:40px !important; background:rgba(189,95,255,0.15) !important; border-radius:8px !important; margin-right:15px !important;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:20px !important; height:20px !important; color:#bd5fff !important;">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      </div>
      <div class="info-content" style="flex:1 !important; display:block !important;">
        <h4 style="font-size:16px !important; margin:0 0 5px 0 !important; color:#fff !important; font-weight:600 !important; display:block !important;">Location</h4>
        <p style="font-size:14px !important; margin:0 !important; color:rgba(255,255,255,0.7) !important; word-break:break-word !important; font-family:'Fira Code',monospace !important; display:block !important;">Ahmedabad, Gujarat 380015, India</p>
      </div>
    `;
    
    // Try to find the contact info container
    const contactSection = document.querySelector('#contact');
    const contactInfo = document.querySelector('.contact-info');
    const infoContainer = document.querySelector('.contact-info-container');
    
    // Try multiple places to inject our location element
    if (contactInfo) {
      // Check if there's an existing location element
      const existingLocation = contactInfo.querySelector('.info-item:nth-child(3)');
      if (existingLocation) {
        // Replace the existing location element
        contactInfo.replaceChild(locationDiv, existingLocation);
        console.log('✅ Replaced existing location element');
      } else {
        // Add as the third item
        const emailItem = contactInfo.querySelector('.info-item:nth-child(2)');
        if (emailItem) {
          contactInfo.insertBefore(locationDiv, emailItem.nextSibling);
          console.log('✅ Added location after email item');
        } else {
          // Just append it
          contactInfo.appendChild(locationDiv);
          console.log('✅ Appended location to contact info');
        }
      }
    } 
    // If we couldn't find the right container, create a new one
    else if (infoContainer) {
      // Create a new contact info container
      const newContactInfo = document.createElement('div');
      newContactInfo.className = 'contact-info';
      newContactInfo.style.cssText = 'display:flex !important; flex-direction:column !important;';
      
      // Add our location element to it
      newContactInfo.appendChild(locationDiv);
      
      // Add the new container to the info container
      infoContainer.appendChild(newContactInfo);
      console.log('✅ Created new contact info with location');
    }
    // Last resort - add directly to the contact section
    else if (contactSection) {
      // Create a full contact info structure
      const newInfoContainer = document.createElement('div');
      newInfoContainer.className = 'contact-info-container';
      newInfoContainer.style.cssText = 'padding:30px !important; display:block !important;';
      
      // Add a heading
      const heading = document.createElement('h3');
      heading.className = 'contact-subtitle';
      heading.textContent = 'Get in Touch 👋';
      heading.style.cssText = 'margin-bottom:20px !important; font-size:24px !important; color:#fff !important;';
      
      // Create the contact info div
      const newContactInfo = document.createElement('div');
      newContactInfo.className = 'contact-info';
      newContactInfo.style.cssText = 'display:flex !important; flex-direction:column !important;';
      
      // Add our location element to it
      newContactInfo.appendChild(locationDiv);
      
      // Assemble the structure
      newInfoContainer.appendChild(heading);
      newInfoContainer.appendChild(newContactInfo);
      
      // Add to the contact section
      contactSection.appendChild(newInfoContainer);
      console.log('✅ Added complete contact info structure with location');
    } else {
      console.error('❌ Could not find any suitable container for location');
      
      // Last resort - append to body
      document.body.appendChild(locationDiv);
      console.log('⚠️ Added location directly to body as fallback');
    }
  }, 1000); // 1 second delay
  });
}
