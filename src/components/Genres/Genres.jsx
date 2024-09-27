import { MovieGenresConsumer } from '../movieContext/movieContext';
import { Typography } from 'antd';

const { Text } = Typography;

const Genres = ({ genreArr }) => {
  return (
    <MovieGenresConsumer>
      {(genres) => {
        return (
          <div>
            {genreArr.map((genre) => {
              const genreFind = genres.find((genreEl) => genreEl.id === genre);
              const { id, name } = genreFind;
              return (
                <Text key={id} keyboard>
                  {name}
                </Text>
              );
            })}
          </div>
        );
      }}
    </MovieGenresConsumer>
  );
};

export default Genres;
