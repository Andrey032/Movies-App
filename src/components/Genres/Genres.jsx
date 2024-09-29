import { forwardRef } from 'react';
import { MovieGenresConsumer } from '../movieContext/movieContext';
import { Typography } from 'antd';

const { Text } = Typography;

const Genres = forwardRef(({ genreArr }, ref) => {
  return (
    <MovieGenresConsumer>
      {(genres) => {
        return (
          <div ref={ref}>
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
});

export default Genres;
