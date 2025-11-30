// src/lib/api.js
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function safeJson(res) {
  try { return await res.json(); } catch { return {}; }
}

export const api = {
  sendOTP: async (phone) => {
    const res = await fetch(`${API_BASE_URL}/auth/send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });
    const data = await safeJson(res);
    if (!res.ok) throw new Error(data?.message || `Failed to send OTP (HTTP ${res.status})`);
    return data; // { success: true, ... }
  },

  verifyOTP: async (phone, otp) => {
    const res = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, otp }),
    });
    const data = await safeJson(res);
    if (!res.ok) throw new Error(data?.message || `Failed to verify OTP (HTTP ${res.status})`);
    return data; // { success: true, token, user }
  },

  getUser: async (token) => {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await safeJson(res);
    if (!res.ok) throw new Error(data?.message || "Unauthorized");
    return data; // { success: true, user }
  },
};
