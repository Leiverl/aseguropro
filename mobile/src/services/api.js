import AsyncStorage from '@react-native-async-storage/async-storage';

const API = 'https://aseguropro.on.shiper.app/api';

async function getToken() {
  return await AsyncStorage.getItem('token');
}

async function request(endpoint, options = {}) {
  const token = await getToken();
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API}${endpoint}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error en la solicitud');
  return data;
}

export const api = {
  login: (email, password) => request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  register: (data) => request('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  getMe: () => request('/auth/me'),

  getPlans: (type) => request(`/plans${type ? `?type=${type}` : ''}`),
  getStudentPlans: () => request('/plans/student'),
  getPlan: (id) => request(`/plans/${id}`),

  getAppointments: () => request('/appointments'),
  createAppointment: (data) => request('/appointments', { method: 'POST', body: JSON.stringify(data) }),
  deleteAppointment: (id) => request(`/appointments/${id}`, { method: 'DELETE' }),

  getQuote: (data) => request('/quotes', { method: 'POST', body: JSON.stringify(data) }),

  getPolicies: () => request('/policies'),
  purchasePolicy: (data) => request('/policies', { method: 'POST', body: JSON.stringify(data) }),
};
