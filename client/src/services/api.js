async function apiRequest(path, options = {}) {
  const token = localStorage.getItem("eventHubToken");
  const headers = {
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };
  const response = await fetch(`/api${path}`, { ...options, headers });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Request failed");
  return data;
}

export const getEvents = () => apiRequest("/events");
export const registerUser = (userData) =>
  apiRequest("/auth/register", { method: "POST", body: JSON.stringify(userData) });
export const loginUser = (credentials) =>
  apiRequest("/auth/login", { method: "POST", body: JSON.stringify(credentials) });
export const getCurrentUser = () => apiRequest("/auth/me");