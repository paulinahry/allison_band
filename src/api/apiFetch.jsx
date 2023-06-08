import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Replace with your backend URL

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.log('Error:', error);
    throw error;
  }
};

export const getProductById = async (productId) => {
  try {
    const response = await axios.get(`${API_URL}/products/${productId}`);
    return response.data;
  } catch (error) {
    console.log('Error:', error);
    throw error;
  }
};
