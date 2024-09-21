import { createContext } from 'react';

const { Provider: MovieGenresProvider, Consumer: MovieGenresConsumer } =
  createContext();

export { MovieGenresProvider, MovieGenresConsumer };
