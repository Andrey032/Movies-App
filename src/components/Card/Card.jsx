import RateComponent from '../Rate/Rate';
import ImageComponent from '../Image/Image';
import Title from '../Title/Title';
import ProgressComponent from '../Progress/Progress';
import { sliceText } from '../../utils/constants';
import Genres from '../Genres/Genres';
import { Card, Typography, Flex } from 'antd';
import { format } from 'date-fns';

const { Text, Paragraph } = Typography;

const CardComponent = ({ item, getIdAndRateCard }) => {
  const {
    overview,
    posterPath,
    releaseDate,
    title,
    voteAverage,
    id,
    rating,
    genreIds,
  } = item;
  const hendleTime = (timeArr) => {
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

export default CardComponent;
