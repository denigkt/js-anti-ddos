const config = require('../../config/config');
const store = require('../utils/inMemoryStore');

function rateLimiter(req, res, next) {
    // Skip rate limiting for verification endpoints
    if (req.path === '/captcha' || 
        req.path === '/verify-captcha' || 
        req.path === '/verify-browser') {
        return next();
    }

    const ip = req.ip;
    
    // Skip rate limiting for validated IPs || TODO: add this to database
    if (store.isIPValidated(ip)) {
        //return next();
    }
    
    const requestCount = store.incrementRequests(ip);
    
    if (requestCount > config.RPS_THRESHOLD) {
        // If UAM mode is enabled, show UAM page instead of captcha
        if (config.UAM_MODE) {
            return res.status(429).sendFile('uam.html', { root: './views' });
        }
        return res.status(429).sendFile('captcha.html', { root: './views' });
    }
    
    next();
}

module.exports = rateLimiter; 