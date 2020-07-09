import { hashPassword, isMatchPassword } from '../password';

const mockPassword = 'mock-password';

describe('Test password hash and compare', () => {
  it('it should hash password and match', () => {
    const hash = hashPassword(mockPassword);

    expect(hash).toBeDefined();
    expect(isMatchPassword(mockPassword, hash)).toBeTruthy();
  });
});
