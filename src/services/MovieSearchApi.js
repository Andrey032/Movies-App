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
        throw new Error(`Ошибка запроса к серверу... ${response.status}`);
      }
      const data = await response.json();
      if (!data) throw new Error('Данный ресурс не найден...');
      return data;
    } catch (error) {
      throw new Error('Ошибка при получении ресурса...', error);
    }
  }

  async getMoviesData(str, page) {
    try {
      const url = this.buildUrl('/search/movie?', {
        query: str,
        page,
      });
      const movies = await this.getResource(url, optionsGet);
      return movies;
    } catch (error) {
      throw new Error('Ошибка при получении фильмов...', error);
    }
  }

  async createGuestSession() {
    try {
      const url = this.buildUrl('/authentication/guest_session/new');
      const guestSession = await this.getResource(url, optionsGet);
      return guestSession.guest_session_id;
    } catch (error) {
      throw new Error('Ошибка при получении ключа сессии...', error);
    }
  }

  async addRating(movieId, sessionId, rate) {
    try {
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
    } catch (error) {
      throw new Error('Ошибка при добавлении рейтинга к фильму...', error);
    }
  }

  async getRatedMovies(sessionId) {
    try {
      const url = this.buildUrl(`/guest_session/${sessionId}/rated/movies`);
      const ratedMovies = await this.getResource(url, optionsGet);
      return ratedMovies;
    } catch (error) {
      throw new Error('Ошибка при получении избранных фильмов...', error);
    }
  }

  async getGenres() {
    try {
      const url = this.buildUrl('/genre/movie/list', { language: 'en' });
      const genres = await this.getResource(url, optionsGet);
      return genres.genres;
    } catch (error) {
      throw new Error('Ошибка при получении жанров к фильму', error);
    }
  }
}
