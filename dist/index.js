const https = require('https');
class VerificationResponse {
  constructor(data) {
    this.data = JSON.parse(data);
  }
  field(fieldName) {
    return this.data[fieldName];
  }
  valid() {
    return Boolean(this.data.status);
  }
  getFullResponse() {
    return this.data;
  }
}
class VerifyRight {
  constructor(apiKey) {
    if (!apiKey) {
      throw new Error('API key is required');
    }
    this.apiKey = apiKey;
  }
  verify(email) {
    if (!email) {
      return Promise.reject(new Error('Email is required'));
    }
    if (!this.isValidEmail(email)) {
      return Promise.reject(new Error('Invalid email format'));
    }
    const endpoint = `https://verifyright.co/verify/${encodeURIComponent(email)}?token=${this.apiKey}`;
    return new Promise((resolve, reject) => {
      https.get(endpoint, {
        timeout: 10000,
        // 10 second timeout
        headers: {
          'User-Agent': 'Verifier-Node/1.0.2'
        }
      }, res => {
        let response = '';
        res.on('data', chunk => response += chunk);
        res.on('end', () => {
          try {
            if (res.statusCode !== 200) {
              reject(new Error(`API request failed with status ${res.statusCode}`));
              return;
            }
            resolve(new VerificationResponse(response));
          } catch (error) {
            reject(new Error(`Failed to parse API response: ${error.message}`));
          }
        });
      }).on('error', error => {
        reject(new Error(`Network request failed: ${error.message}`));
      }).on('timeout', () => {
        reject(new Error('Request timed out'));
      });
    });
  }
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
module.exports = VerifyRight;