import { getToken } from './helpers';

describe('Helpers File', () => {
  describe('Get Token Method', () => {
    beforeEach(() => {
      const userObj = {
        id: 2,
        firstName: 'Jane',
        lastName: 'Doe',
        token: 'token',
      };
      window.localStorage.setItem('user', JSON.stringify(userObj));
    });

    afterEach(() => {
      global.localStorage.clear();
    });

    it('should get token', () => {
      const result = getToken();

      expect(result).toBe('token');
    });
  });
});
