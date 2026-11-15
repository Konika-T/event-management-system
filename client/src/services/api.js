// Locally VITE_API_URL is empty, so requests go to /api and the Vite proxy handles them.
// On Vercel, VITE_API_URL is set to the Render backend URL.
const API_BASE_URL = `${import.meta.env.VITE_API_URL || ""}/api`;

function jsonBody(data) {
  return JSON.stringify(data);
}

async function apiRequest(path, options = {}) {
  const token = localStorage.getItem("eventHubToken");

  const headers = {
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

// Auth
export function registerUser(userData) {
  return apiRequest("/auth/register", {
    method: "POST",
    body: jsonBody(userData),
  });
}

export function loginUser(credentials) {
  return apiRequest("/auth/login", {
    method: "POST",
    body: jsonBody(credentials),
  });
}

export function getCurrentUser() {
  return apiRequest("/auth/me");
}

// Events
export function getEvents(filters = {}) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (typeof value === "string" && value.trim()) params.set(key, value.trim());
  });
  const query = params.toString();
  return apiRequest(`/events${query ? `?${query}` : ""}`);
}

export function getEventById(id) {
  return apiRequest(`/events/${encodeURIComponent(id)}`);
}

export function createEvent(eventData) {
  return apiRequest("/events", { method: "POST", body: jsonBody(eventData) });
}

export function updateEvent(id, eventData) {
  return apiRequest(`/events/${encodeURIComponent(id)}`, {
    method: "PUT",
    body: jsonBody(eventData),
  });
}

export function deleteEvent(id) {
  return apiRequest(`/events/${encodeURIComponent(id)}`, { method: "DELETE" });
}

// Registrations
export function registerForEvent(eventId) {
  return apiRequest("/registrations", { method: "POST", body: jsonBody({ eventId }) });
}

export function getMyRegistrations() {
  return apiRequest("/registrations/me");
}

export function cancelRegistration(registrationId) {
  return apiRequest(`/registrations/${encodeURIComponent(registrationId)}`, {
    method: "DELETE",
  });
}

export function getAllRegistrations() {
  return apiRequest("/registrations");
}