// src/utils/api.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'; // Set VITE_API_URL in .env

// Get JWT from localStorage
const getToken = () => localStorage.getItem('token');

// Axios instance with default headers
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add JWT to requests
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API Requests
export const register = async (email, password, address, signature, message, isWorker) => {
  return api.post('/register', { email, password, address, signature, message, isWorker });
};

export const login = async (email, password, address, signature, message) => {
  return api.post('/login', { email, password, address, signature, message });
};

export const getUserInfo = async (address) => {
  return api.get(`/user/${address}`);
};

export const getContributions = async (address) => {
  return api.get(`/contributions/${address}`);
};

export const submitReport = async (location, workerId, image, address) => {
  const formData = new FormData();
  formData.append('location', location);
  formData.append('workerId', workerId);
  if (image) formData.append('image', image);
  return api.post('/report', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const workerAction = async (action, contributionId) => {
  return api.post(`/worker/${action}/${contributionId}`);
};