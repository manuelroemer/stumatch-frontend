import create from 'zustand';
import { postAuthToken } from '../api/login';

interface UserState {
  user?: UserInfo;
  login(email: string, password: string): Promise<boolean>;
  tryLoadRememberedLogin(): void;
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
  tryLoadRememberedLogin() {
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

const tokenKey = 'Auth:Token';

function tryLoadPersistedToken() {
  const entry = localStorage.getItem(tokenKey);
  if (!entry) {
    return undefined;
  }

  try {
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
