import axios from 'axios';

const apiYaloOutgoing = axios.create({
  baseURL: process.env.URL_API_YALO_OUTGOING,
});

export default apiYaloOutgoing;
