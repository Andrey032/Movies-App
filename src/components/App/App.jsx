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
  const hasError = !(loaded || error);

  const onError = () => {
    setError(true);
  };

  useEffect(() => {
    FetchMovies.getMoviesData(value)
      .then(setData)
      .catch(onError)
      .finally(setLoaded(false));
  }, [value]);

  const onChange = (page) => {
    setCurrent(page);
  };

  const onChangeValue = (text) => {
    setValue(text);
  };

  const onChangeValueDebonce = debounce(onChangeValue, 500);

  const updateOnlineStatus = () => {
    setOnLine((prevState) => !prevState);
  };

  window.ononline = () => updateOnlineStatus();
  window.onoffline = () => updateOnlineStatus();

  // console.log(data.length);
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
              <PaginationComponent current={current} onChange={onChange} />
            </>
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
