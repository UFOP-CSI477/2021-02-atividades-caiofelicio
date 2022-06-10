import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export default api;

export function setBearerToken(token: string) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
