import { saveToLocalStorage/* , removeFromLocalStorage */ } from '../utils';

const login = async (loginMutation, email, password) => {
  try {
    const response = await loginMutation({ variables: { login: email, password } });
    const { token } = response.data.signIn;

    if (!token) return null;

    const result = saveToLocalStorage('token', token);
    if (!result) return null;

    return token;
  } catch (e) {
    return null;
  }
};

// const logout = () => {
// remove user from local storage to log user out
// removeFromLocalStorage('token');
// };

const userService = {
  login,
  // logout,
};

export default userService;
