import AlertWindow from '../AlertWindow/AlertWindow';
import InputComponent from '../InputComponent/InputComponent';
import ListComponent from '../ListComponent/ListComponent';
import PaginationComponent from '../PaginationComponent/PaginationComponent';
import Spiner from '../Spiner/Spiner';
import TabsComponent from '../TabsComponent/TabsComponent';
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
  getIdAndRateCard = () => {},
  total = 0,
  dataLength = 0,
  rateDataLength = 0,
  errorMessage,
}) => {
  const { name, message } = errorMessage;
  return (
    <>
      <TabsComponent toggleTab={toggleTab} rateDataLength={rateDataLength} />
      {tab === 'Search' && <InputComponent onChangeValue={onChangeValue} />}
      {loaded && <Spiner />}
      {error && (
        <AlertWindow
          className='alert'
          type='error'
          message={name}
          description={message}
        />
      )}
      {hasErrorAndLoaded && (
        <>
          <ListComponent data={data} getIdAndRateCard={getIdAndRateCard} />
          <PaginationComponent
            current={current}
            onChange={onChange}
            total={total}
          />
        </>
      )}
      {dataLength !== 0 ||
        (rateDataLength === 0 && (
          <AlertWindow
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
  errorMessage: PropTypes.shape({
    name: PropTypes.string,
    message: PropTypes.string,
    stack: PropTypes.string,
  }),
  hasErrorAndLoaded: PropTypes.bool,
  data: PropTypes.instanceOf(Array),
  current: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  getIdAndRateCard: PropTypes.func.isRequired,
  total: PropTypes.number,
};

export default Main;
