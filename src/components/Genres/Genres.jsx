import { MovieGenresConsumer } from '../movieContext/movieContext';
import { Typography } from 'antd';

const { Text } = Typography;

const Genres = ({ genreIds }) => {
  return (
    <MovieGenresConsumer>
      {(genres) => {
        return (
          <Text keyboard>
            {genreIds
              .map((genreId) => {
                const genre = genres.find((genreEl) => genreEl.id === genreId);
                return genre.name;
              })
              .join(', ')}
          </Text>
        );
      }}
    </MovieGenresConsumer>
  );
};

export default Genres;
