import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8800/api', // Adjust this base URL according to your backend server
});

export default instance;
