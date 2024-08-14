import './App.css';
import FetchMovies from '../../services/MovieSearchApi';
import TabsComponent from '../Tabs/Tabs';
import InputComponent from '../Input/Input';
import PaginationComponent from '../Pagination/Pagination';
import ListComponent from '../List/List';
import Spiner from '../Spiner/Spiner';
import AlertComponent from '../Alert/Alert';

import { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';

const App = () => {
  const [current, setCurrent] = useState(1);
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(true);
  const [error, setError] = useState(false);
  const [onLine, setOnLine] = useState(true);
  const [value, setValue] = useState('');
  const [lengthMovies, setLengthMovies] = useState(null);
  const hasError = !(loaded || error);

  const onError = () => {
    setError(true);
  };

  useEffect(() => {
    FetchMovies.getMoviesData(value)
      .then((movies) => {
        setData(movies);
        setLengthMovies(data.length);
      })
      .catch(onError)
      .finally(setLoaded(false));
  }, [value, data.length]);

  const onChangePage = (page) => {
    setCurrent(page);
    console.log(page);
  };

  const onChangeValue = (text) => {
    setValue(text);
  };

  const onChangeValueDebonce = debounce(onChangeValue, 700);

  const updateOnlineStatus = () => {
    setOnLine((prevState) => !prevState);
  };

  window.ononline = () => updateOnlineStatus();
  window.onoffline = () => updateOnlineStatus();

  return (
    <div className='app'>
      {onLine && (
        <>
          <TabsComponent />
          <InputComponent onChangeValue={onChangeValueDebonce} />
          {loaded && <Spiner />}
          {error && (
            <AlertComponent
              className='alert'
              type='error'
              message='Ошибка'
              description='Данные с сервера не загружены.'
            />
          )}
          {hasError && (
            <>
              <ListComponent data={data} />
              <PaginationComponent current={current} onChange={onChangePage} />
            </>
          )}
          {lengthMovies === 0 && (
            <AlertComponent
              className='alert'
              type='warning'
              message='Предупреждение'
              description='Фильмы не найдены.'
            />
          )}
        </>
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
  );
};

export default App;
