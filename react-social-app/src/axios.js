import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api', // Adjust this base URL according to your backend server
});

export default instance;
