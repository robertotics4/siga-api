import axios from 'axios';

const apiYalo = axios.create({
  baseURL: process.env.URL_API_YALO,
});

export default apiYalo;
