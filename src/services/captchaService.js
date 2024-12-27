const svgCaptcha = require('svg-captcha');
const store = require('../utils/inMemoryStore');

class CaptchaService {
    generateCaptcha(ip) {
        const captcha = svgCaptcha.create({
            size: 6,
            noise: 2,
            color: true
        });
        
        store.storeCaptchaSession(ip, captcha.text);
        return captcha.data;
    }

    validateCaptcha(ip, userInput) {
        return store.validateCaptcha(ip, userInput);
    }
}

module.exports = new CaptchaService(); 