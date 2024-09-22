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
  static buildUrl = (endpoint, params = {}) => {
    const url = new URL(`${BASE_URL}${endpoint}`);
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );
    return url;
  };

  static getResource = async (url, options) => {
    let body;
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Ошибка запроса к серверу ${response.status}`);
      }
      body = await response.json();
    } catch (error) {
      console.log(error);
    }
    return body;
  };

  static getMoviesData = async (str, page) => {
    const url = FetchMovies.buildUrl('/search/movie?', {
      query: str,
      page,
    });
    const allMoviesTitle = await FetchMovies.getResource(url, optionsGet);
    return allMoviesTitle.results.map(FetchMovies.transformMovieData);
  };

  static createGuestSession = async () => {
    const url = FetchMovies.buildUrl('/authentication/guest_session/new');
    const guestSession = await FetchMovies.getResource(url, optionsGet);
    return guestSession.guest_session_id;
  };

  static addRating = async (movieId, sessionId, rate) => {
    const url = FetchMovies.buildUrl(`/movie/${movieId}/rating?`, {
      guest_session_id: sessionId,
    });
    const add = await FetchMovies.getResource(url, {
      ...optionsPost,
      body: JSON.stringify({
        value: rate,
      }),
    });
    return add.success;
  };

  static getRatedMovies = async (sessionId) => {
    const url = FetchMovies.buildUrl(
      `/guest_session/${sessionId}/rated/movies`
    );
    const ratedMovies = await FetchMovies.getResource(url, optionsGet);
    return ratedMovies.results.map(FetchMovies.transformRateMovieData);
  };

  static getGenres = async () => {
    const url = FetchMovies.buildUrl('/genre/movie/list?language=en');
    const genres = await fetch(url, optionsGet);
    return genres;
  };

  static transformMovieData = (movie = {}) => {
    return {
      id: movie.id,
      posterPath: movie.poster_path,
      title: movie.title,
      releaseDate: movie.release_date,
      genreIds: movie.genre_ids,
      overview: movie.overview,
      voteAverage: movie.vote_average,
    };
  };

  static transformRateMovieData = (movie = {}) => {
    return {
      id: movie.id,
      posterPath: movie.poster_path,
      title: movie.title,
      releaseDate: movie.release_date,
      genreIds: movie.genre_ids,
      overview: movie.overview,
      voteAverage: movie.vote_average,
      rating: movie.rating,
    };
  };
}
