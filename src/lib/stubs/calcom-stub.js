/**
 * Empty stub for @calcom/embed-react during server-side builds
 * This prevents Cal.com from being executed during SSR
 * The real Cal.com will be loaded on the client side via dynamic imports
 */

// Export empty functions to prevent errors
export const getCalApi = async () => {
  // Return a no-op function during SSR
  return () => {};
};

// Export default empty object
export default {};

