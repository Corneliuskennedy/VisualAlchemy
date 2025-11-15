/**
 * Empty stub for @calcom/embed-react during server-side builds
 * This prevents Cal.com from being executed during SSR
 * The real Cal.com will be loaded on the client side via dynamic imports
 */

// Export empty functions to prevent errors
// Match the actual Cal.com API structure
export const getCalApi = async (options) => {
  // Return a no-op function during SSR that matches Cal.com's API
  const noop = () => {};
  // Add properties that Cal.com might expect
  noop.ui = () => {};
  noop.inline = () => {};
  noop.popup = () => {};
  noop.overlay = () => {};
  return noop;
};

// Export default empty object
export default {
  getCalApi: async () => {
    const noop = () => {};
    noop.ui = () => {};
    noop.inline = () => {};
    noop.popup = () => {};
    noop.overlay = () => {};
    return noop;
  }
};

