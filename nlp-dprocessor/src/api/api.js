import axios from 'axios';

axios.defaults.withCredentials = true;

const API_URL = 'https://nlp-etl.herokuapp.com';

export const uploadData = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post(`${API_URL}/user_data`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
  });

  return response;
};

export const getSampleData = async () => {
  const response = await axios.post(`${API_URL}/sample_data`, {}, {
    withCredentials: true,
  });

  return response;
};

export const fetchData = async () => {
  const response = await axios.get(`${API_URL}/show`, {
    withCredentials: true,
  });

  return response.data;
};

export const processData = async (instruction) => {
  const response = await axios.post(
    `${API_URL}/process_data`,
    { instruction },
    { withCredentials: true }
  );

  return response;
};

export const revertData = async () => {
  const response = await axios.post(`${API_URL}/revert`, {}, {
    withCredentials: true,
  });

  return response;
};

export const plotData = async (instruction) => {
  const response = await axios.post(
    `${API_URL}/plot_data`,
    { instruction },
    { responseType: 'blob', withCredentials: true }
  );

  return response.data;
};
