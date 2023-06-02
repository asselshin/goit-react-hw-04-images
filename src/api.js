import axios from 'axios';

const API_KEY = '34774366-d2ee02a117d0ba1fecc5cc02c';

axios.defaults.baseURL = `https://pixabay.com/api/?key=${API_KEY}`;

export const fetchData = async (searchData, page = 1) => {
  const response = await axios.get('', {
    params: {
      q: searchData,
      page: page,
      orientation: 'horizontal',
      image_type: 'photo',
      per_page: 12,
    },
  });
  return response.data;
};
