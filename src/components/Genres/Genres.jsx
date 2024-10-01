import { forwardRef, useImperativeHandle, useRef, useContext } from 'react';
import { Typography } from 'antd';
import GenresContext from '../movieContext/movieContext';

const { Text } = Typography;

const Genres = forwardRef(({ genreArr }, ref) => {
  const divRef = useRef(null);
  useImperativeHandle(ref, () => ({
    offsetHeight: divRef.current.offsetHeight,
  }));

  const genres = useContext(GenresContext);

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
});

export default Genres;
