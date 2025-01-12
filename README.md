# VerifyRight Node.js Library

Official Node.js library for the VerifyRight Email Verification API.

## Installation

```bash
npm install verifier-node
```

## Usage

```javascript
const VerifyRight = require('verifier-node');

// Initialize with your API key
const verifier = new VerifyRight('YOUR_API_KEY');

// Verify an email
verifier.verify('email@example.com')
    .then(response => {
        // Check if email is valid
        if (response.valid()) {
            console.log('Email is valid');
            
            // Access specific fields
            console.log('Status:', response.field('status'));
            console.log('Score:', response.field('score'));
            
            // Get complete response
            console.log('Full response:', response.getFullResponse());
        } else {
            console.log('Email is invalid');
        }
    })
    .catch(error => {
        console.error('Verification failed:', error.message);
    });
```

## API Reference

### Initialization

```javascript
const verifier = new VerifyRight(apiKey)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| apiKey | string | Your VerifyRight API key (required) |

### Methods

#### verify(email)
Verifies an email address.

```javascript
verifier.verify(email: string): Promise<VerificationResponse>
```

#### VerificationResponse Methods

- `valid()`: Returns boolean indicating if email is valid
- `field(fieldName)`: Returns the value of a specific field from the response
- `getFullResponse()`: Returns the complete response object

### Error Handling

The library throws errors for:
- Missing API key
- Invalid email format
- Empty email
- Network errors
- API response errors (non-200 status codes)
- Request timeouts (default: 10 seconds)

Example error handling:

```javascript
verifier.verify('invalid@email')
    .catch(error => {
        if (error.message.includes('Invalid email format')) {
            console.log('Please provide a valid email address');
        } else if (error.message.includes('Request timed out')) {
            console.log('Verification request timed out');
        } else {
            console.log('Verification failed:', error.message);
        }
    });
```

## Requirements

- Node.js 12.0.0 or later

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build
npm run build
```

## License

ISC

## Support

For support, please visit [VerifyRight Support](https://verifyright.co/support) or create an issue in our [GitHub repository](https://github.com/email-verifier/verifier-node/issues).
