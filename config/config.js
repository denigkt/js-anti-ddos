/**
 * Configuration file for the application
 * 
 * PORT: Server port number (default: 3000)
 * ORIGIN_URL: Allowed origin for CORS (default: https://example.com)
 * RPS_THRESHOLD: Maximum requests per second before rate limiting (default: 1)
 * CAPTCHA_VALIDITY: How long a CAPTCHA session remains valid (5 minutes)
 * RATE_WINDOW: Time window for rate limiting calculation (1 second)
 * UAM_MODE: Enable User Access Management mode instead of CAPTCHA (default: false)
 * UAM_WAIT_TIME: Time user must wait on UAM page before continuing (5 seconds)
 * 
 * Environment variables can override:
 * - PORT
 * - ORIGIN_URL  
 * - RPS_THRESHOLD
 * - UAM_MODE (set to 'true' to enable)
 */

const config = {
    PORT: process.env.PORT || 3000,
    ORIGIN_URL: process.env.ORIGIN_URL || 'https://example.com',
    RPS_THRESHOLD: process.env.RPS_THRESHOLD || 1,
    CAPTCHA_VALIDITY: 300000, // 5 minutes in milliseconds
    RATE_WINDOW: 1000, // 1 second in milliseconds
    UAM_MODE: process.env.UAM_MODE === 'true' || false,
    UAM_WAIT_TIME: 5000, // 5 seconds wait time
};

module.exports = config;