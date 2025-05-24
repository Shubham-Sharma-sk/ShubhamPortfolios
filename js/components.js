// Function to load HTML components
function loadComponent(elementId, componentPath) {
  const element = document.getElementById(elementId);
  if (!element) {
    console.warn(`Element with ID '${elementId}' not found`);
    return;
  }

  // Add loading indicator
  element.innerHTML = '<div class="component-loading">Loading...</div>';

  fetch(componentPath)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load component: ${componentPath} (${response.status} ${response.statusText})`);
      }
      return response.text();
    })
    .then(html => {
      element.innerHTML = html;
      
      // Dispatch an event to notify that the component has been loaded
      const event = new CustomEvent('componentLoaded', { 
        detail: { 
          id: elementId,
          path: componentPath 
        } 
      });
      document.dispatchEvent(event);
    })
    .catch(error => {
      console.error(`Error loading component ${componentPath}:`, error);
      element.innerHTML = `<div class="component-error">Failed to load component. Please refresh the page.</div>`;
    });
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('Loading components...');
  
  // Load all components
  loadComponent('header-component', 'components/header.html');
  loadComponent('hamburger-component', 'components/hamburger.html');
  loadComponent('hero-component', 'components/hero.html');
  loadComponent('about-component', 'components/about.html');
  loadComponent('experience-component', 'components/experience.html');
  loadComponent('skills-component', 'components/skills.html');
  loadComponent('projects-component', 'components/projects.html');
  loadComponent('contact-component', 'components/contact.html');
  loadComponent('footer-component', 'components/footer.html');
});

// Listen for component load events for component-specific initialization
document.addEventListener('componentLoaded', function(e) {
  const componentId = e.detail.id;
  const componentPath = e.detail.path;
  
  console.log(`Component loaded: ${componentId} (${componentPath})`);
  
  // Initialize component-specific functionality
  if (componentId === 'hero-component') {
    // Initialize terminal after hero component is loaded
    if (typeof initTerminal === 'function') {
      setTimeout(initTerminal, 100);
    }
  }
});

// Apply additional CSS to the component loading indicators
document.head.insertAdjacentHTML('beforeend', `
  <style>
    .component-loading {
      text-align: center;
      padding: 20px;
      color: rgba(255, 255, 255, 0.6);
      font-size: 14px;
    }
    .component-error {
      text-align: center;
      padding: 20px;
      color: #ff5555;
      font-size: 14px;
      background: rgba(255, 0, 0, 0.1);
      border-radius: 8px;
    }
  </style>
`);