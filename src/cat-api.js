import axios from 'axios';

axios.defaults.headers.common['x-api-key'] = 'live_DbfPWc1Q4CqC9466MQtvdLrohNbRdp60B8eLzpRs7JZKReuEF7LoY1sLN1ETuZ0N';

export async function fetchBreeds() {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchCatByBreed(breedId) {
  try {
    const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
    return response.data[0];
  } catch (error) {
    throw error;
  }
}
