//It is isomorphic (= it can run in the browser and nodejs with the same codebase)
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const TOKEN = '32855339-ad74b3f6db15cb4a86c5df500';
const api = axios.create({
  baseURL: BASE_URL,
  params: {
    key: TOKEN, //my unique API access key for the "https://pixabay.com/api/"
    per_page: 40, //upload 40 images per "one virtual page"
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  },
});  

export async function getData(valueInput, page) {
  try {
    const { data } = await api.get(``, {
      //GET request to server to get images
      params: { page: page, q: valueInput },
    });
    return data;
  } catch (error) {
    console.log(error.message); //if everything is "bad"
  }
};



