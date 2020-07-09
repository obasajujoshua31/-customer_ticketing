import { generateToken, decodeToken } from '../jwt';

const mockToken = '123445';

describe('Test Jwt functions', () => {
  it('should return jwt token', () => {
    const token = generateToken(mockToken);
    expect(token).toBeDefined();
    expect(token).toBeTruthy();

    const decoded = decodeToken(token);
    expect(decoded.userId).toEqual(mockToken);
  });
});
