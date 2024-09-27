import { BASE_URL, TOKEN } from '../utils/constants';

const optionsGet = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TOKEN}`,
  },
};

const optionsPost = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json;charset=utf-8',
    Authorization: `Bearer ${TOKEN}`,
  },
};

export default class FetchMovies {
  constructor() {
    this.buildUrl = this.buildUrl.bind(FetchMovies);
    this.getResource = this.getResource.bind(FetchMovies);
  }

  buildUrl(endpoint, params = {}) {
    const url = new URL(`${BASE_URL}${endpoint}`);
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );
    return url;
  }

  async getResource(url, options) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Ошибка запроса к серверу ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Ошибка при получении ресурса:', error);
      return null;
    }
  }

  async getMoviesData(str, page) {
    const url = this.buildUrl('/search/movie?', {
      query: str,
      page,
    });
    return this.getResource(url, optionsGet);
  }

  async createGuestSession() {
    const url = this.buildUrl('/authentication/guest_session/new');
    const guestSession = await this.getResource(url, optionsGet);
    return guestSession.guest_session_id;
  }

  async addRating(movieId, sessionId, rate) {
    const url = this.buildUrl(`/movie/${movieId}/rating?`, {
      guest_session_id: sessionId,
    });
    const add = await this.getResource(url, {
      ...optionsPost,
      body: JSON.stringify({
        value: rate,
      }),
    });
    return add;
  }

  async getRatedMovies(sessionId) {
    const url = this.buildUrl(`/guest_session/${sessionId}/rated/movies`);
    return this.getResource(url, optionsGet);
  }

  async getGenres() {
    const url = this.buildUrl('/genre/movie/list', { language: 'en' });
    const genres = await this.getResource(url, optionsGet);
    return genres.genres;
  }
}
