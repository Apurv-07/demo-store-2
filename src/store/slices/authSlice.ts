import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  hasCheckedSession: boolean;
}

const AUTH_COOKIE_NAME = "auth_token";

const isClient = typeof window !== "undefined";

export const getAuthTokenFromUser = (user: User) => user.accessToken || user.token || "";

export const isValidAuthToken = (token?: string) => {
  if (!token) {
    return false;
  }

  return token.split(".").length === 3;
};

export const getAuthTokenFromCookie = () => {
  if (!isClient) {
    return "";
  }

  try {
    const match = document.cookie
      .split(";")
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith(`${AUTH_COOKIE_NAME}=`));

    return match ? decodeURIComponent(match.split("=").slice(1).join("=")) : "";
  } catch (error) {
    console.error("Failed to read auth cookie", error);
    return "";
  }
};

const setAuthCookie = (token: string) => {
  if (!isClient) return;
  try {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);
    document.cookie = `${AUTH_COOKIE_NAME}=${encodeURIComponent(token)}; path=/; expires=${expiryDate.toUTCString()}; SameSite=Lax`;
  } catch (error) {
    console.error("Failed to set auth cookie", error);
  }
};

export const clearAuthCookie = () => {
  if (!isClient) return;
  try {
    document.cookie = `${AUTH_COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax`;
  } catch (error) {
    console.error("Failed to clear auth cookie", error);
  }
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  hasCheckedSession: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      const authToken = getAuthTokenFromUser(action.payload);
      state.isLoading = false;
      state.isAuthenticated = isValidAuthToken(authToken);
      state.user = isValidAuthToken(authToken)
        ? {
            ...action.payload,
            token: authToken,
          }
        : null;
      state.error = null;
      state.hasCheckedSession = true;
      if (isValidAuthToken(authToken)) {
        setAuthCookie(authToken);
      } else {
        state.error = "Authentication response did not include a valid token.";
        clearAuthCookie();
      }
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
      state.hasCheckedSession = true;
      clearAuthCookie();
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      state.hasCheckedSession = true;
      clearAuthCookie();
    },
    markSessionChecked: (state) => {
      state.hasCheckedSession = true;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  markSessionChecked,
  clearAuthError,
} = authSlice.actions;

export default authSlice.reducer;
