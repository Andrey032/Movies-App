import './App.css';
import FetchMovies from '../../services/MovieSearchApi';
import TabsComponent from '../Tabs/Tabs';
import InputComponent from '../Input/Input';
import PaginationComponent from '../Pagination/Pagination';
import ListComponent from '../List/List';
import { useState, useEffect } from 'react';

const App = () => {
  const [current, setCurrent] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    FetchMovies.getMoviesTitle('return')
      .then((body) => setData(body))
      .catch((error) => console.error(error));
  }, []);

  const onChange = (page) => {
    setCurrent(page);
  };

  return (
    <div className='app'>
      <TabsComponent />
      <InputComponent />
      <ListComponent data={data} />
      <PaginationComponent current={current} onChange={onChange} />
    </div>
  );
};

export default App;
