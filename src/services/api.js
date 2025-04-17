import axios from 'axios';

const API_BASE_URL = "http://localhost:8080";  // your Spring Boot backend URL

export const api = axios.create({
  baseURL: API_BASE_URL,
});
