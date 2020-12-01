import { saveToLocalStorage, removeFromLocalStorage } from '../utils';

const login = async (loginMutation, email, password) => {
  try {
    const response = await loginMutation({ variables: { login: email, password } });
    const { token, user } = response.data.signIn;
    if (!token) return null;
    user.token = token;
    saveToLocalStorage('user', user);
    return { token, user };
  } catch (e) {
    return null;
  }
};

const signup = async (signupMutation, email, firstName, lastName, password, userName) => {
  try {
    const response = await signupMutation({
      variables: {
        firstName, lastName, userName, email, password,
      },
    });
    const { token, user } = response.data.signUp;
    if (!token) return null;
    return { token, user };
  } catch (e) {
    return null;
  }
};

const logout = () => {
  // remove user from local storage to log user out
  removeFromLocalStorage('user');
};

const userService = {
  login,
  logout,
  signup,
};

export default userService;
