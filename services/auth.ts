import { User } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = '@spotify:user';
const IS_LOGGED_IN_KEY = '@spotify:is_logged_in';

export const signUp = async (email: string, password: string, username: string): Promise<boolean> => {
  try {
    const user: User = {
      name: username,
      email,
      username,
    };
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    await AsyncStorage.setItem(IS_LOGGED_IN_KEY, 'true');
    return true;
  } catch (error) {
    console.error('Error signing up:', error);
    return false;
  }
};

export const login = async (usernameOrEmail: string, password: string): Promise<boolean> => {
  try {
    const userStr = await AsyncStorage.getItem(USER_KEY);
    
    // If no user exists, create one automatically for demo purposes
    if (!userStr) {
      const newUser: User = {
        name: usernameOrEmail,
        email: usernameOrEmail.includes('@') ? usernameOrEmail : `${usernameOrEmail}@example.com`,
        username: usernameOrEmail,
      };
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(newUser));
      await AsyncStorage.setItem(IS_LOGGED_IN_KEY, 'true');
      return true;
    }
    
    // If user exists, check if username/email matches
    const user: User = JSON.parse(userStr);
    // Allow login with either username or email (password is not validated for demo)
    if (user.email === usernameOrEmail || user.username === usernameOrEmail) {
      await AsyncStorage.setItem(IS_LOGGED_IN_KEY, 'true');
      return true;
    }
    
    // If username/email doesn't match, still allow login for demo purposes
    // Update the stored user with the new login info
    const updatedUser: User = {
      ...user,
      name: usernameOrEmail,
      email: usernameOrEmail.includes('@') ? usernameOrEmail : `${usernameOrEmail}@example.com`,
      username: usernameOrEmail,
    };
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
    await AsyncStorage.setItem(IS_LOGGED_IN_KEY, 'true');
    return true;
  } catch (error) {
    console.error('Error logging in:', error);
    return false;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(IS_LOGGED_IN_KEY);
  } catch (error) {
    console.error('Error logging out:', error);
  }
};

export const isLoggedIn = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(IS_LOGGED_IN_KEY);
    return value === 'true';
  } catch (error) {
    console.error('Error checking login status:', error);
    return false;
  }
};

export const getUser = async (): Promise<User | null> => {
  try {
    const userStr = await AsyncStorage.getItem(USER_KEY);
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};

export const updateUser = async (user: Partial<User>): Promise<boolean> => {
  try {
    const currentUser = await getUser();
    if (currentUser) {
      const updatedUser = { ...currentUser, ...user };
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error updating user:', error);
    return false;
  }
};

