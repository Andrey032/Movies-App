import RateComponent from '../Rate/Rate';
import ImageComponent from '../Image/Image';
import Title from '../Title/Title';
import ProgressComponent from '../Progress/Progress';
import { Card, Typography, Flex } from 'antd';
import { format } from 'date-fns';

const { Text, Paragraph } = Typography;

const CardComponent = ({ item }) => {
  const hendleTime = (timeArr) => {
    if (!timeArr) return null;
    const nowData = new Date(timeArr);
    const formatTime = format(nowData, 'MMMM d, y');
    return formatTime;
  };

  const sliceText = (str) => {
    if (str.length === 0) return str;
    const words = str.split(' ');
    const spliceWords = words.slice(0, 25);
    if (spliceWords.length < 12) {
      return spliceWords.join(' ');
    }
    return `${spliceWords.join(' ')}...`;
  };

  return (
    <Card
      hoverable
      className='card'
      styles={{
        body: {
          padding: 0,
        },
      }}
    >
      <Flex justify='space-between'>
        <ImageComponent poster={item.poster_path} title={item.original_title} />
        <Flex vertical className='info-container'>
          <Flex
            justify='space-between'
            align='center'
            className='title-container'
          >
            <Title title={item.original_title} />
            <ProgressComponent voteAverage={item.vote_average} />
          </Flex>
          <Flex className='date-container'>
            <Text type='secondary'>{hendleTime(item.release_date)}</Text>
          </Flex>
          <Flex className='genre-container'>
            <Text keyboard>Action</Text>
            <Text keyboard>Drama</Text>
          </Flex>
          <Flex className='paragraf-container'>
            <Paragraph>{sliceText(item.overview)}</Paragraph>
          </Flex>
          <Flex className='rate-container'>
            <RateComponent item={item} />
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

export default CardComponent;
