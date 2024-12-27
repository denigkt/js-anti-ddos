class InMemoryStore {
    constructor() {
        this.requestCounts = new Map();
        this.captchaSessions = new Map();
        this.validatedIPs = new Map();
        
        // Cleanup old entries periodically
        setInterval(() => this.cleanup(), 60000);
    }

    // Increment request count for a given IP
    incrementRequests(ip) {
        const now = Date.now();
        const current = this.requestCounts.get(ip) || { count: 0, timestamp: now };
        
        if (now - current.timestamp > 1000) {
            current.count = 1;
            current.timestamp = now;
        } else {
            current.count++;
        }
        
        this.requestCounts.set(ip, current);
        return current.count;
    }

    // Store captcha session for a given IP
    storeCaptchaSession(ip, captchaText) {
        this.captchaSessions.set(ip, {
            text: captchaText,
            timestamp: Date.now()
        });
    }

    // Validate captcha input from user and return success/failure response
    validateCaptcha(ip, userInput) {
        const session = this.captchaSessions.get(ip);
        if (!session) return false;
        
        const isValid = session.text.toLowerCase() === userInput.toLowerCase();
        if (isValid) {
            this.validatedIPs.set(ip, Date.now());
            this.captchaSessions.delete(ip);
        }
        return isValid;
    }

    // Check if IP has been validated within the last hour
    isIPValidated(ip) {
        const validationTime = this.validatedIPs.get(ip);
        return validationTime && (Date.now() - validationTime < 3600000); // 1 hour
    }

    // Cleanup old entries periodically
    cleanup() {
        const now = Date.now();

        // Cleanup old request counts
        for (const [ip, data] of this.requestCounts.entries()) {
            if (now - data.timestamp > 60000) {
                this.requestCounts.delete(ip);
            }
        }
        
        // Cleanup old captcha sessions
        for (const [ip, session] of this.captchaSessions.entries()) {
            if (now - session.timestamp > 300000) {
                this.captchaSessions.delete(ip);
            }
        }
        
        // Cleanup old validations
        for (const [ip, timestamp] of this.validatedIPs.entries()) {
            if (now - timestamp > 3600000) {
                this.validatedIPs.delete(ip);
            }
        }
    }
}

module.exports = new InMemoryStore(); 