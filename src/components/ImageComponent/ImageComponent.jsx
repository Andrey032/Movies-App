import noImage from '../../assets/image';
import { Image } from 'antd';

const ImageComponent = ({ poster, title }) => {
  return (
    <Image
      src={`https://image.tmdb.org/t/p/w500${poster}` || 'error'}
      fallback={noImage}
      className='image'
      alt={title}
    />
  );
};

export default ImageComponent;
