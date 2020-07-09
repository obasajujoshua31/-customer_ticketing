import { isValidId } from '../validator';

const validId = '5f0489f9accd8a0d9f252ecb';
const invalidId = 'invalid';

describe('Validator test', () => {
  describe('isValidId test', () => {
    it('should return true for valid object id', () => {
      expect(isValidId(validId)).toBeTruthy();
    });

    it('should return false for invalid object id', () => {
      expect(isValidId(invalidId)).toBeFalsy();
    });
  });
});
