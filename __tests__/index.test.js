const VerifyRight = require('../src/index');

describe('VerifyRight', () => {
    let verifier;

    beforeEach(() => {
        verifier = new VerifyRight('test-api-key');
    });

    test('should throw error when initialized without API key', () => {
        expect(() => new VerifyRight()).toThrow('API key is required');
    });

    test('should reject invalid email format', async () => {
        await expect(verifier.verify('invalid-email')).rejects.toThrow('Invalid email format');
    });

    test('should reject empty email', async () => {
        await expect(verifier.verify('')).rejects.toThrow('Email is required');
    });

    test('should validate correct email format', () => {
        expect(verifier.isValidEmail('test@example.com')).toBe(true);
        expect(verifier.isValidEmail('invalid-email')).toBe(false);
    });
}); 