import axios from 'axios';

const API_URL = 'https://639de1ee3542a26130521b71.mockapi.io';

export const api = axios.create({
  baseURL: API_URL,
});
