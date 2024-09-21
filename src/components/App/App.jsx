import FetchMovies from '../../services/MovieSearchApi';
import AlertComponent from '../Alert/Alert';
import Main from '../Main/Main';
import { MovieGenresProvider } from '../movieContext/movieContext';
import { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';
import './App.css';

const App = () => {
  const [current, setCurrent] = useState(1);
  const [data, setData] = useState([]);
  const [rateData, setRateData] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loaded, setLoaded] = useState(true);
  const [error, setError] = useState(false);
  const [onLine, setOnLine] = useState(true);
  const [value, setValue] = useState('');
  const [lengthMovies, setLengthMovies] = useState({
    dataLength: 0,
    rateDataLength: 0,
  });
  const [sessionId, setSessionId] = useState('');
  const [tab, setTab] = useState('Search');
  const [success, setSuccess] = useState(false);
  const hasErrorAndLoaded = !(loaded || error);

  const {
    getMoviesData,
    createGuestSession,
    addRating,
    getRatedMovies,
    getGenres,
  } = FetchMovies;

  const onError = () => {
    setError(true);
  };

  useEffect(() => {
    createGuestSession()
      .then((guestSession) => {
        setSessionId(guestSession);
        setLengthMovies((prevLength) => {
          return {
            ...prevLength,
            rateDataLength: rateData.length,
          };
        });
      })
      .catch(onError)
      .finally(() => setLoaded(false));
  }, [rateData, createGuestSession, getRatedMovies]);

  useEffect(() => {
    getGenres()
      .then((response) => response.json())
      .then((response) => setGenres(response.genres))
      .catch((err) => console.log(err));
  }, [getGenres]);

  const toggleTab = (tabString) => {
    setTab(tabString);
  };

  useEffect(() => {
    getMoviesData(value, current)
      .then((movies) => {
        setData(movies);
        setLengthMovies((prevLength) => ({
          ...prevLength,
          dataLength: movies.length,
        }));
        window.scrollTo(0, 0);
      })
      .catch(onError)
      .finally(() => setLoaded(false));
  }, [value, current, getMoviesData]);

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

  // const updateOfflineStatus = () => {
  //   setOnLine(false);
  // };

  const postRateCard = (movieId, rate) => {
    addRating(movieId, sessionId, rate)
      .then((status) => {
        setSuccess(status);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (success) {
      getRatedMovies(sessionId)
        .then((rateMovies) => {
          setRateData((prevMovies) => [...prevMovies, ...rateMovies]);
        })
        .catch((err) => console.log(err))
        .finally(() => setSuccess(false));
    }
  }, [success, sessionId, getRatedMovies]);

  window.ononline = () => updateOnlineStatus();
  // window.onoffline = () => updateOfflineStatus();

  return (
    <MovieGenresProvider value={genres}>
      <div className='app'>
        {onLine && (
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
            lengthMovies={lengthMovies}
            getIdAndRateCard={postRateCard}
          />
        )}
        {!onLine && (
          <AlertComponent
            className='offline'
            type='error'
            message='Ошибка'
            description='Нет соединения с интернет.'
          />
        )}
      </div>
    </MovieGenresProvider>
  );
};

export default App;
