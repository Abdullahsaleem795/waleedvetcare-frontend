import axios from 'axios';

// Get API URL from env, default to local if not specified
export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const API = axios.create({
  baseURL: API_URL
});

export default API;
