import axios from 'axios';

const apiYaloOutgoing = axios.create({
  baseURL: process.env.URL_API_YALO_OUTGOING,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiYaloOutgoing;
