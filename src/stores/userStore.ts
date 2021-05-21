import { useEffect } from 'react';
import create from 'zustand';
import { postAuthToken } from '../api/auth';

/**
 * The global state containing information about the current user who is currently logged in.
 */
export interface UserState {
  /**
   * Information about the logged in user.
   * This is `undefined` if no user is logged in at the moment.
   */
  user?: UserInfo;
  /**
   * Attempts to login a user using the provided credentials and, on success, remembers the
   * user data so that the user is automatically logged in on subsequent page visits.
   * @returns `true` if the user could be successfully logged in; `false` if not.
   */
  login(email: string, password: string): Promise<boolean>;
  /**
   * If user data from a past login have been remembered, loads them and logs the user in
   * with them.
   */
  tryLoadRememberedUser(): void;
  /**
   * Logs the user out and clears any remembered user data.
   */
  logout(): void;
}

export interface UserInfo {
  token: string;
}

export const useUserStore = create<UserState>((set) => ({
  user: undefined,
  async login(email, password) {
    try {
      const res = await postAuthToken({ email, password });
      const token = res.data.token;
      const user = { token };
      persistToken(token);
      set(() => ({ user }));
      return true;
    } catch (e) {
      return false;
    }
  },
  tryLoadRememberedUser() {
    const token = tryLoadPersistedToken();
    if (token) {
      set(() => ({ user: { token } }));
    }
  },
  logout() {
    set(() => ({ user: undefined }));
    clearPersistedToken();
  },
}));

/**
 * Automatically loads remembered user data and logs the user in during component mount.
 */
export function useAutomaticUserLogin() {
  const tryLoadRememberedLogin = useUserStore((state) => state.tryLoadRememberedUser);
  useEffect(() => tryLoadRememberedLogin(), []);
}

// To remember the login of a user, we simply store the user token in the localStorage.
const tokenKey = 'Auth:Token';

function tryLoadPersistedToken() {
  const entry = localStorage.getItem(tokenKey);
  if (!entry) {
    return undefined;
  }

  try {
    // TODO: Account for expired tokens.
    const { token } = JSON.parse(entry);
    return token;
  } catch (e) {
    return undefined;
  }
}

function persistToken(token: string) {
  localStorage.setItem(tokenKey, JSON.stringify({ token }));
}

function clearPersistedToken() {
  localStorage.removeItem(tokenKey);
}
