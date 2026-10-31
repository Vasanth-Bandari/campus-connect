/* WorkSphere AI - Client-side Router */

import { UI } from './ui.js';
import { StateManager } from './state.js';

let currentRoute = 'landing';
let currentSubTab = 'dashboard'; // only applicable when on 'dashboard' or 'employee-dashboard'

export const Router = {
  init() {
    // Listen for hash changes or click events to manage browser history (optional).
    // For this prototype, we'll control transitions programmatically.
    this.navigate('landing');
  },

  getRoute() {
    return currentRoute;
  },

  getSubTab() {
    return currentSubTab;
  },

  navigate(route, subTab = null) {
    const rootEl = document.getElementById('app-root');
    const loadingScreen = document.getElementById('loading-screen');

    // Show simulation loader for transitions to give it an enterprise data-fetching feel
    if (loadingScreen) {
      loadingScreen.classList.remove('hidden');
      loadingScreen.style.opacity = '1';
    }

    setTimeout(() => {
      currentRoute = route;
      if (subTab) {
        currentSubTab = subTab;
      } else {
        // Defaults based on role
        if (route === 'dashboard') {
          currentSubTab = 'dashboard';
        } else if (route === 'employee-dashboard') {
          currentSubTab = 'leave'; // Employees start at Leave page
        }
      }

      // Execute view builder
      this.renderView(route, currentSubTab);

      // Hide loading screen
      if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
          loadingScreen.classList.add('hidden');
        }, 300);
      }
    }, 600); // 600ms artificial loader for premium feedback
  },

  renderView(route, subTab) {
    const root = document.getElementById('app-root');
    if (!root) return;

    // Clear loading elements except loader screen itself
    const loaderHtml = `<div id="loading-screen" class="loading-screen hidden">
      <div class="spinner"></div>
      <div class="loading-text">WorkSphere AI is loading your workspace...</div>
    </div>`;

    // Render corresponding page templates
    let htmlContent = '';

    // Render Ambient animated background
    const ambientBg = `<div class="ambient-bg"></div>`;

    switch (route) {
      case 'landing':
        htmlContent = UI.renderLandingPage();
        break;
      case 'login':
      case 'signup':
        htmlContent = UI.renderAuthPage(route);
        break;
      case 'role-select':
        htmlContent = UI.renderRoleSelectPage();
        break;
      case 'briefing':
        htmlContent = UI.renderBriefingPage();
        break;
      case 'dashboard':
        htmlContent = UI.renderDashboardLayout('hr_admin', subTab);
        break;
      case 'employee-dashboard':
        htmlContent = UI.renderDashboardLayout('employee', subTab);
        break;
      default:
        htmlContent = UI.renderLandingPage();
    }

    root.innerHTML = loaderHtml + ambientBg + htmlContent;

    // Bind event listeners to new content
    UI.bindEventListeners(route, subTab);
    
    // Re-initialize Lucide Icons
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
};
