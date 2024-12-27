const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const config = require('../config/config');
const rateLimiter = require('./middleware/rateLimiter');
const captchaService = require('./services/captchaService');
const store = require('./utils/inMemoryStore');

const app = express();

app.use(express.json());
app.use(express.static('public'));

// Captcha endpoints
app.get('/captcha', (req, res) => {
    const captchaSvg = captchaService.generateCaptcha(req.ip);
    res.type('svg').send(captchaSvg);
});

// Verify captcha input from user and return success/failure response
app.post('/verify-captcha', (req, res) => {
    const { captcha } = req.body;
    const isValid = captchaService.validateCaptcha(req.ip, captcha);
    
    if (isValid) {
        store.validatedIPs.set(req.ip, Date.now());
        res.json({ success: true });
    } else {
        res.status(400).json({ success: false, message: 'Invalid captcha' });
    }
});

// Verify browser fingerprint and return success/failure response || not implemented yet
app.post('/verify-browser', (req, res) => {
    store.validatedIPs.set(req.ip, Date.now());
    res.json({ success: true });
});

// Apply rate limiter to all proxy requests
app.use(rateLimiter);

// Proxy all other requests to origin
app.use('/', createProxyMiddleware({
    target: config.ORIGIN_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/api/': '/'
    }
}));

app.listen(config.PORT, () => {
    console.log(`DDoS protection proxy running on port ${config.PORT}`);
}); 