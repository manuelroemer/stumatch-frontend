import { useEffect } from 'react';
import create from 'zustand';
import { postAuthToken } from '../api/auth';
import { getMe, GetUserResponseBody } from '../api/users';

/**
 * The global state containing information about the current user who is currently logged in.
 */
export interface UserState {
  /**
   * Information about the user.
   */
  userInfo?: {
    /**
     * The most recent information about the logged in user.
     */
    user: GetUserResponseBody;
    /**
     * The user's token.
     */
    token?: string;
  };
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
  tryLoadRememberedUser(): Promise<boolean>;
  /**
   * Refetches the user details of the logged in user.
   */
  refetchUser(): Promise<boolean>;
  /**
   * Logs the user out and clears any remembered user data.
   */
  logout(): void;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: undefined,

  async login(email, password) {
    try {
      const token = (await postAuthToken({ email, password })).data.access_token;
      const user = await fetchUser(token);
      persistToken(token);
      set(() => ({ userInfo: { user, token } }));
      return true;
    } catch (e) {
      console.warn('Login failed due to an error: ', e);
      return false;
    }
  },

  async tryLoadRememberedUser() {
    const token = tryLoadPersistedToken();
    if (!token) {
      return false;
    }

    try {
      const user = await fetchUser(token);
      set(() => ({ userInfo: { user, token } }));
      return true;
    } catch (e) {
      console.warn('There was a persisted token, but fetching user details with it failed. Signing out.', e);
      get().logout();
      return false;
    }
  },

  async refetchUser() {
    const token = get().userInfo?.token;
    if (!token) {
      return false;
    }

    try {
      const user = await fetchUser(token);
      set((state) => ({ userInfo: { ...state.userInfo, user } }));
      return true;
    } catch (e) {
      console.warn('Refetching user details failed due to an error: ', e);
      return false;
    }
  },

  logout() {
    clearPersistedToken();
    set(() => ({ userInfo: undefined }));
  },
}));

/**
 * Returns the information of the currently logged in user that are stored in the user store.
 * Throws an error if no user is logged in (i.e. if the user data is undefined).
 *
 * Intended to be used in components which are only expected to be rendered when a user is logged in.
 * Using this hook instead of the user store allows skipping null validation.
 */
export function useCurrentUser() {
  const user = useUserStore().userInfo?.user;
  if (!user) {
    throw new Error(
      'No user details are known at the moment. ' +
        'Only call "useUser" in locations where a user is guaranteed to be logged in.',
    );
  }
  return user;
}

async function fetchUser(token: string) {
  // getMe/stumatchFetch can automatically add the token, but only when it's set in the user store.
  // This is not the case before logging in (which is why we specify the token manually here).
  const res = await getMe({ headers: { Authorization: `Bearer ${token}` } });
  return res.data.result;
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
