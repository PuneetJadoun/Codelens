
import axios from "axios";
import makeLogger from "../utils/logger";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/auth";
const log = makeLogger("authService");

export const signup = async (payload) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/signup`, payload);
    if (data.token) saveSession(data.user, data.token);
    return data;
  } catch (error) {
    throw normalizeError(error, "Signup failed");
  }
};

export const login = async (payload) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/login`, payload);
    if (data.token) saveSession(data.user, data.token);
    return data;
  } catch (error) {
    throw normalizeError(error, "Login failed");
  }
};

export const requestPasswordReset = async (email) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/forgot-password`, { email });
    return { success: true, ...data };
  } catch (error) {
    const err = normalizeError(error, "Password reset request failed");
    return { success: false, ...err };
  }
};

export const resetPassword = async (token, password) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/reset-password/${token}`, { password });
    return { success: true, ...data };
  } catch (error) {
    const err = normalizeError(error, "Password reset failed");
    return { success: false, ...err };
  }
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

export const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch (e) {
    return null;
  }
};

export const getToken = () => localStorage.getItem("token");

function saveSession(user, token) {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
}

function normalizeError(error, fallbackMessage) {
  const payload = error.response?.data || { message: fallbackMessage };
  log.error(fallbackMessage, payload);
  return payload;
}

const authService = {
  signup,
  login,
  logout,
  requestPasswordReset,
  resetPassword,
  getCurrentUser,
  getToken,
};

export default authService;

// Optional: placeholders to keep existing imports compiling
export const googleLogin = async () => {
  return { success: false, message: "Google login not configured on backend" };
};
export const googleSignup = async () => {
  return { success: false, message: "Google signup not configured on backend" };
};
