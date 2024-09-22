import RateComponent from '../Rate/Rate';
import ImageComponent from '../Image/Image';
import Title from '../Title/Title';
import ProgressComponent from '../Progress/Progress';
import { sliceText } from '../../utils/constants';
import Genres from '../Genres/Genres';
import { Card, Typography, Flex } from 'antd';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

const { Text, Paragraph } = Typography;

const CardComponent = ({ item = {}, getIdAndRateCard = () => {} }) => {
  const {
    overview = '',
    posterPath = '',
    releaseDate = '',
    title = '',
    voteAverage = 0,
    id = 0,
    rating = 0,
    genreIds = [],
  } = item;

  const hendleTime = (timeArr = '') => {
    if (!timeArr) return null;
    const nowData = new Date(timeArr);
    const formatTime = format(nowData, 'MMMM d, y');
    return formatTime;
  };

  return (
    <Card hoverable>
      <Flex justify='space-between'>
        <ImageComponent poster={posterPath} title={title} />
        <Flex vertical className='info-container'>
          <Flex
            justify='space-between'
            align='center'
            className='title-container'
          >
            <Title title={title} />
            <ProgressComponent voteAverage={voteAverage} rating={rating} />
          </Flex>
          <Flex className='date-container'>
            <Text type='secondary'>{hendleTime(releaseDate)}</Text>
          </Flex>
          <Flex className='genre-container'>
            <Genres genreIds={genreIds} />
          </Flex>
          <Flex className='paragraf-container'>
            <Paragraph>{sliceText(overview)}</Paragraph>
          </Flex>
          <Flex className='rate-container'>
            <RateComponent
              getIdAndRateCard={(rate) => getIdAndRateCard(id, rate)}
              rating={rating}
            />
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

CardComponent.propTypes = {
  getIdAndRateCard: PropTypes.func.isRequired,
  item: PropTypes.shape({
    overview: PropTypes.string,
    posterPath: PropTypes.string,
    releaseDate: PropTypes.string,
    title: PropTypes.string,
    voteAverage: PropTypes.number,
    id: PropTypes.number,
    rating: PropTypes.number,
    genre: PropTypes.instanceOf(Array),
  }),
};

export default CardComponent;
