import axios from 'axios';

const apiYaloNotification = axios.create({
  baseURL: process.env.URL_API_YALO_NOTIFICATION,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.TOKEN_API_YALO_NOTIFICATION}`,
  },
});

export default apiYaloNotification;
