import { saveToLocalStorage, removeFromLocalStorage, apolloClient } from '../utils';

const login = async (loginMutation, email, password) => {
  try {
    const response = await loginMutation({
      variables: { login: email, password },
    });
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

const updateUser = async (params) => {
  const {
    updateUserMutation, firstName, lastName, avatarUrl, userName,
  } = params;
  try {
    const res = await updateUserMutation({
      variables: {
        firstName, lastName, avatarUrl, userName,
      },
    });
    return res.data.updateUser;
  } catch (e) {
    return { error: e.message };
  }
};

const logout = async () => {
  await apolloClient.clearStore();
  // remove user from local storage to log user out
  removeFromLocalStorage('user');
};

const userService = {
  login,
  logout,
  signup,
  updateUser,
};

export default userService;
