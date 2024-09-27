import FetchMovies from '../../services/MovieSearchApi';
import AlertWindow from '../AlertWindow/AlertWindow';
import Main from '../Main/Main';
import { MovieGenresProvider } from '../movieContext/movieContext';
import { useState, useEffect, useMemo } from 'react';
import debounce from 'lodash.debounce';
import './App.css';

const App = () => {
  const [current, setCurrent] = useState(1);
  const [data, setData] = useState([]);
  const [rateData, setRateData] = useState([]);
  const [genresData, setGenresData] = useState([]);
  const [loaded, setLoaded] = useState(true);
  const [error, setError] = useState(false);
  const [onLine, setOnLine] = useState(true);
  const [value, setValue] = useState('');
  const [total, setTotal] = useState(0);
  const [rateTotal, setRateTotal] = useState(0);
  const [tab, setTab] = useState('Search');
  const [success, setSuccess] = useState(false);
  const hasErrorAndLoaded = !(loaded || error);

  const fetchMovies = useMemo(() => new FetchMovies(), []);

  const onError = () => {
    setError(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let sessionKey = localStorage.getItem('sessionKey');
        if (!sessionKey) {
          sessionKey = await fetchMovies.createGuestSession();
          localStorage.setItem('sessionKey', sessionKey);
        }
        const moviesPromise = await fetchMovies.getMoviesData(value, current);
        const genresPromise = await fetchMovies.getGenres();
        const [moviesData, genres] = await Promise.all([
          moviesPromise,
          genresPromise,
        ]);
        const { results: movies, total_results: totalResult } = moviesData;
        setData(movies);
        setGenresData(genres);
        setTotal(totalResult);
        window.scrollTo(0, 0);
      } catch (err) {
        onError();
        console.log('Произошла ошибка при загрузке данных.', err);
      } finally {
        setLoaded(false);
      }
    };
    fetchData();
  }, [value, current, fetchMovies]);

  useEffect(() => {
    const fetchRatedMovies = async () => {
      try {
        if (success) {
          const ratedMovies = await fetchMovies.getRatedMovies(
            localStorage.getItem('sessionKey')
          );
          const { results: rateMovies, total_results: totalResults } =
            ratedMovies;
          setRateTotal(totalResults);
          setRateData(rateMovies);
        }
      } catch (err) {
        onError();
        console.log(err);
      } finally {
        setSuccess(false);
      }
    };
    fetchRatedMovies();
  }, [success, fetchMovies]);

  console.log(data);
  console.log(rateData);

  const toggleTab = (tabString) => {
    setTab(tabString);
  };

  const onChangePage = (page) => {
    setCurrent(page);
  };

  const onChangeValue = (text) => {
    setValue(text);
  };

  const onChangeValueDebonce = debounce(onChangeValue, 700);

  const updateOnlineStatus = () => {
    setOnLine(true);
  };

  const updateOfflineStatus = () => {
    setOnLine(false);
  };

  const postRateCard = async (movieId, rate) => {
    try {
      const key = localStorage.getItem('sessionKey');
      await fetchMovies.addRating(movieId, key, rate);
      setSuccess(true);
    } catch (err) {
      onError(err);
    }
  };

  window.ononline = () => updateOnlineStatus();
  window.onoffline = () => updateOfflineStatus();

  return (
    <div className='app'>
      {onLine && (
        <MovieGenresProvider value={genresData}>
          <Main
            toggleTab={toggleTab}
            tab={tab}
            onChangeValue={onChangeValueDebonce}
            loaded={loaded}
            error={error}
            hasErrorAndLoaded={hasErrorAndLoaded}
            data={tab === 'Search' ? data : rateData}
            current={current}
            onChange={onChangePage}
            dataLength={data.length}
            rateDataLength={rateData.length}
            getIdAndRateCard={postRateCard}
            total={tab === 'Search' ? total : rateTotal}
          />
        </MovieGenresProvider>
      )}
      {!onLine && (
        <AlertWindow
          className='offline'
          type='error'
          message='Ошибка'
          description='Нет соединения с интернет.'
        />
      )}
    </div>
  );
};

export default App;
