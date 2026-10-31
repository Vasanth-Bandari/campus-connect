/* WorkSphere AI - Application Entry Point */

import { StateManager } from './state.js';
import { Router } from './router.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize State Manager (reads from localStorage or loads default mock records)
  StateManager.init();
  const state = StateManager.get();

  // 2. Set theme profile class on body
  const activeTheme = state.settings.theme || 'dark';
  document.body.className = `${activeTheme}-theme`;

  // 3. Start Routing System (renders landing view first)
  Router.init();

  console.log('WorkSphere AI initialized successfully.');
  console.log(`Active User: ${state.activeUser.name} (${state.activeUser.role})`);
  console.log(`REST Webhook endpoint: ${state.settings.webhookUrl}`);
});
