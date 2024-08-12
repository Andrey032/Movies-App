import { BASE_URL, token } from '../utils/constants';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${token}`,
  },
};

export default class FetchMovies {
  static getResource = async (query) => {
    const response = await fetch(`${BASE_URL}${query}`, options);
    if (!response.ok) {
      throw new Error(`Ошибка запроса к серверу ${response.status}`);
    }
    const body = await response.json();
    return body;
  };

  static getMoviesTitle = async (str) => {
    const allMoviesTitle = await FetchMovies.getResource(`query=${str}`);
    return allMoviesTitle.results;
  };
}
