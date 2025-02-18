# DDoS Protection Proxy 🛡️

A lightweight, high-performance DDoS protection proxy with captcha and Under Attack Mode (UAM) challenges. 
This proxy sits in front of your origin server and helps protect against automated attacks and excessive traffic.

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 🌟 Features

- **Rate Limiting**: Per-IP request tracking and throttling
- **Dual Protection Modes**: 
  - Standard Mode with CAPTCHA challenges
  - Under Attack Mode (UAM) with browser verification (WIP)
- **High Performance**: Minimal overhead with in-memory tracking
- **Easy Integration**: Works with any origin server
- **Modern UI**: Clean, responsive design using Tailwind CSS
- **Configurable**: Adjustable thresholds and protection modes

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/denigkt/js-anti-ddos.git

# Install dependencies
cd js-anti-ddos
npm install

# Start the server
npm start
```

## 🔧 Configuration

Create a `.env` file in the root directory:

```env
PORT=3000
ORIGIN_URL=https://your-origin-server.com
RPS_THRESHOLD=10
UAM_MODE=false
```

### Configuration Options

| Option | Description | Default | Required |
|--------|-------------|---------|----------|
| `PORT` | Server port | 3000 | No |
| `ORIGIN_URL` | Origin server URL | https://api.example.com | Yes |
| `RPS_THRESHOLD` | Max requests per second per IP | 10 | No |
| `UAM_MODE` | Enable Under Attack Mode | false | No |

## 🏗️ Architecture

### Protection Flow

```
Request → Rate Limit Check → Challenge (if needed) → Origin Server
```

### Components

- **Rate Limiter**: Tracks requests per IP
- **Challenge Generator**: Creates CAPTCHA or browser challenges
- **Proxy Handler**: Forwards validated requests to origin
- **In-Memory Store**: Tracks request counts and validations

## 💻 Technical Stack

- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Proxy**: http-proxy-middleware
- **CAPTCHA**: svg-captcha
- **UI**: Tailwind CSS

## 📦 Project Structure

```
js-anti-ddos/
├── config/
│   └── config.js
├── src/
│   ├── middleware/
│   │   └── rateLimiter.js
│   ├── services/
│   │   └── captchaService.js
│   ├── utils/
│   │   └── inMemoryStore.js
│   └── server.js
├── public/
│   ├── css/
│   └── js/
├── views/
│   ├── captcha.html
│   └── uam.html
├── package.json
└── README.md
```

## 🔨 Development

```bash
# Run in development mode
npm run dev

# Run tests
npm test

# Run with specific config
PORT=4000 RPS_THRESHOLD=5 npm start
```

## 🔒 Security Features

1. **Rate Limiting**
   - Configurable RPS threshold
   - IP-based tracking
   - Automatic challenge triggering

2. **CAPTCHA Protection**
   - SVG-based CAPTCHA
   - Refresh capability
   - Temporary IP validation after success

3. **Under Attack Mode** (WIP)
   - Browser behavior validation
   - JavaScript execution verification
   - Extended challenge period

## 🌐 API Endpoints

### Protected Routes
- All requests to your origin server are automatically protected

### Internal Endpoints
- `GET /captcha` - Generate CAPTCHA image
- `POST /verify-captcha` - Verify CAPTCHA solution
- `POST /verify-browser` - Browser verification (UAM mode)

## 📝 Example Usage

```javascript
// Basic proxy setup
const express = require('express');
const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');

// Apply DDoS protection
app.use(rateLimiter);

// Proxy requests to origin
app.use('/', createProxyMiddleware({ 
    target: config.ORIGIN_URL,
    changeOrigin: true
}));
```

## ⚠️ Production Considerations

1. **Memory Management**
   - Implement Redis/Memcached for distributed setups
   - Regular cleanup of expired data

2. **Security**
   - Enable HTTPS
   - Set secure headers
   - Implement request validation
   - Add logging and monitoring

3. **Performance**
   - Use Node.js clustering
   - Implement caching strategies
   - Monitor memory usage


## 📋 Requirements

- Node.js >= 18.0.0
- npm >= 7.0.0

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🗺️ Roadmap

- [ ] Redis/Memcached integration
- [ ] Clustering support
- [ ] Additional challenge types
- [ ] Enhanced browser fingerprinting
- [ ] Real-time monitoring dashboard
- [ ] WebSocket support

## 🙏 Acknowledgments

- [Express.js](https://expressjs.com/)
- [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware)
- [svg-captcha](https://github.com/produck/svg-captcha)
- [Tailwind CSS](https://tailwindcss.com/)

## 📞 Support

For support, please:
1. Check the documentation
2. Open an issue in the GitHub repository
3. Contact the maintainers

---

Made with ❤️ by @denigkt