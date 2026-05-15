import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ── GET ─────────────────────────────────────────────
export function get(url, params = {}) {
  return api.get(url, { params });
}

// ── GET with auth token ─────────────────────────────
export function getWithToken(url, token, params = {}) {
  return api.get(url, {
    params,
    headers: { Authorization: `Bearer ${token}` },
  });
}

// ── POST ────────────────────────────────────────────
export function post(url, data = {}) {
  return api.post(url, data);
}

// ── POST with auth token ────────────────────────────
export function postWithToken(url, token, data = {}) {
  return api.post(url, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// ── PUT ─────────────────────────────────────────────
export function put(url, token, data = {}) {
  return api.put(url, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// ── DELETE ──────────────────────────────────────────
export function del(url, token) {
  return api.delete(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export default api;
