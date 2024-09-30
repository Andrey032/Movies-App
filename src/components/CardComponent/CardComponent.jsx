import RateComponent from '../RateComponent/RateComponent';
import ImageComponent from '../ImageComponent/ImageComponent';
import Title from '../Title/Title';
import ProgressComponent from '../ProgressComponent/ProgressComponent';
import { sliceText } from '../../utils/constants';
import Genres from '../Genres/Genres';
import { Card, Typography, Flex } from 'antd';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
const { Text, Paragraph } = Typography;

const CardComponent = ({ item = {}, getIdAndRateCard = () => {} }) => {
  const [blockHeight, setBlockHeight] = useState(25);
  const hightBoxRef = useRef(null);
  const {
    overview = '',
    poster_path: posterPath = '',
    release_date: releaseDate = '',
    title = '',
    vote_average: voteAverage = 0,
    id = 0,
    rating = 0,
    genre_ids: genreArr = [],
  } = item;

  useEffect(() => {
    const currentHeight = hightBoxRef.current.offsetHeight;
    if (currentHeight > 23) {
      setBlockHeight(20);
    }
  }, []);

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
            <Genres ref={hightBoxRef} genreArr={genreArr} />
          </Flex>
          <Flex className='paragraf-container'>
            <Paragraph>{sliceText(overview, blockHeight)}</Paragraph>
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
