/**
 * Simple logger utility for consistent logging across the application
 */
export const logger = {
  /**
   * Log informational messages
   */
  info: (...args: unknown[]) => {
    console.log('[INFO]', new Date().toISOString(), ...args);
  },

  /**
   * Log error messages
   */
  error: (...args: unknown[]) => {
    console.error('[ERROR]', new Date().toISOString(), ...args);
  },

  /**
   * Log warning messages
   */
  warn: (...args: unknown[]) => {
    console.warn('[WARN]', new Date().toISOString(), ...args);
  },

  /**
   * Log debug messages (only in development)
   */
  debug: (...args: unknown[]) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug('[DEBUG]', new Date().toISOString(), ...args);
    }
  },
};

