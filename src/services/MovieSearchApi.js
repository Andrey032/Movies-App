import { BASE_URL, token } from '../utils/constants';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${token}`,
  },
};

export default class FetchMovies {
  static getResource = async (query = '', page = 1) => {
    const response = await fetch(`${BASE_URL}${query}&${page}`, options);
    if (!response.ok) {
      throw new Error(`Ошибка запроса к серверу ${response.status}`);
    }
    const body = await response.json();
    return body;
  };

  static getMoviesData = async (str, page) => {
    const allMoviesTitle = await FetchMovies.getResource(
      `query=${str}`,
      `page=${page}`
    );
    return allMoviesTitle.results.map(FetchMovies.transformMovieData);
  };

  static transformMovieData = (movie) => {
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
}
