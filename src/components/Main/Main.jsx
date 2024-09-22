import AlertComponent from '../Alert/Alert';
import InputComponent from '../Input/Input';
import ListComponent from '../List/List';
import PaginationComponent from '../Pagination/Pagination';
import Spiner from '../Spiner/Spiner';
import TabsComponent from '../Tabs/Tabs';
import PropTypes from 'prop-types';

const Main = ({
  toggleTab = () => {},
  tab = '',
  onChangeValue = () => {},
  loaded,
  error,
  hasErrorAndLoaded,
  data = [],
  current,
  onChange = () => {},
  lengthMovies = {},
  getIdAndRateCard = () => {},
}) => {
  const { dataLength = 0, rateDataLength = 0 } = lengthMovies;
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
            tab={tab}
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

Main.propTypes = {
  toggleTab: PropTypes.func.isRequired,
  tab: PropTypes.string,
  onChangeValue: PropTypes.func.isRequired,
  loaded: PropTypes.bool,
  error: PropTypes.bool,
  hasErrorAndLoaded: PropTypes.bool,
  data: PropTypes.instanceOf(Array),
  current: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  lengthMovies: PropTypes.shape({
    dataLength: PropTypes.number,
    rateDataLength: PropTypes.number,
  }),
  getIdAndRateCard: PropTypes.func.isRequired,
};

export default Main;
