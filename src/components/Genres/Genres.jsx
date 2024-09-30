import { forwardRef, useImperativeHandle, useRef } from 'react';
import { MovieGenresConsumer } from '../movieContext/movieContext';
import { Typography } from 'antd';

const { Text } = Typography;

const Genres = forwardRef(({ genreArr }, ref) => {
  const divRef = useRef(null);
  useImperativeHandle(ref, () => ({
    offsetHeight: divRef.current.offsetHeight,
  }));
  return (
    <MovieGenresConsumer>
      {(genres) => {
        return (
          <div ref={divRef}>
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
