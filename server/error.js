// utils/error.js or just error.js

/**
 * Creates a custom error with a status code and message.
 * @param {number} status - HTTP status code (e.g., 400, 404, 500)
 * @param {string} message - Error message to send in response
 * @returns {Error} - Custom error object with status
 */
export const createError = (status, message) => {
  const err = new Error(message);
  err.status = status;
  return err;
};
