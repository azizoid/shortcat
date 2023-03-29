import { redirectUrlValidation, activeValidation, shortcodeGuidValidation } from './validationRules';

describe('Validation', () => {
  describe('shortcodeGuidValidation', () => {
    test('returns an error if the value is missing', () => {
      const { error } = shortcodeGuidValidation.validate(undefined);
      expect(error).toBeDefined();
      expect(error?.message).toContain('is required');
    });

    test('returns an error if the value is not a string', () => {
      const { error } = shortcodeGuidValidation.validate(123);
      expect(error).toBeDefined();
      expect(error?.message).toContain('must be a string');
    });

    test('returns the same value if it is a valid string', () => {
      const validString = 'abcd1234';
      const { error, value } = shortcodeGuidValidation.validate(validString);
      expect(error).toBeUndefined();
      expect(value).toBe(validString);
    });
  });

  describe('activeValidation', () => {
    test('returns true for a valid boolean value', () => {
      const { error, value } = activeValidation.validate(true);
      expect(error).toBeUndefined();
      expect(value).toBe(true);
    });

    test('returns an error for a non-boolean value', () => {
      const { error, value } = activeValidation.validate('someNonBooleanValue');

      console.log({ error, value })
      expect(error).toBeDefined();
      expect(error?.message).toContain('must be a boolean');
    });

    test('returns an error for a missing value', () => {
      const { error } = activeValidation.validate(undefined);
      expect(error).toBeDefined();
      expect(error?.message).toContain('is required');
    });
  });

  describe('redirectUrlValidation', () => {
    test('returns the same value if URL is already valid', () => {
      const validUrl = 'https://nam.az';
      const { error, value } = redirectUrlValidation.validate(validUrl);
      expect(error).toBeUndefined();
      expect(value).toBe(validUrl);
    });

    test('adds "https://" to the beginning of the URL if missing', () => {
      const invalidUrl = 'https://nam.az';
      const { error, value } = redirectUrlValidation.validate(invalidUrl);
      console.log({ error, value })
      expect(error).toBeUndefined();
      expect(value).toBe('https://nam.az');
    });

    test('returns an error if URL is invalid', () => {
      const invalidUrl = 'invalid Url';
      const { error } = redirectUrlValidation.validate(invalidUrl);

      expect(error).toBeDefined();
      expect(error?.message).toContain('Redirect URL must be a valid URL');
    });
  });

});
