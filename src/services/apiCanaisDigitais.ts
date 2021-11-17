import axios from 'axios';

const apiCanaisDigitais = axios.create({
  baseURL: process.env.URL_API_CANAIS_DIGITAIS,
});

export default apiCanaisDigitais;
