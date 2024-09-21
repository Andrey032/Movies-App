import AlertComponent from '../Alert/Alert';
import InputComponent from '../Input/Input';
import ListComponent from '../List/List';
import PaginationComponent from '../Pagination/Pagination';
import Spiner from '../Spiner/Spiner';
import TabsComponent from '../Tabs/Tabs';

const Main = ({
  toggleTab,
  tab,
  onChangeValue,
  loaded,
  error,
  hasErrorAndLoaded,
  data = [],
  current,
  onChange,
  lengthMovies,
  getIdAndRateCard,
}) => {
  const { dataLength, rateDataLength } = lengthMovies;
  return (
    <>
      <TabsComponent toggleTab={toggleTab} lengthMovies={lengthMovies} />
      {tab === 'Search' && <InputComponent onChangeValue={onChangeValue} />}
      {loaded && <Spiner />}
      {error && (
        <AlertComponent
          className='alert'
          type='error'
          message='Ошибка'
          description='Данные с сервера не загружены.'
        />
      )}
      {hasErrorAndLoaded && (
        <>
          <ListComponent data={data} getIdAndRateCard={getIdAndRateCard} />
          <PaginationComponent
            lengthMovies={lengthMovies}
            current={current}
            onChange={onChange}
          />
        </>
      )}
      {dataLength !== 0 ||
        (rateDataLength === 0 && (
          <AlertComponent
            className='alert'
            type='warning'
            message='Предупреждение'
            description='Фильмы не найдены.'
          />
        ))}
    </>
  );
};

export default Main;
