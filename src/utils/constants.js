const TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwN2M4YTNmYTBhZjM0Mjk5OTk3ODBlYWQ3ZmNlYWM4OSIsIm5iZiI6MTcyNjk1MTA3MC41Mjg4ODYsInN1YiI6IjY2YjNhYjE4OWNhNzllMDc1MmI1MjEyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.__l99B96G4loSsKjmuY41TrIYXnhj55Rdv1f-L84Sc0';

const BASE_URL = 'https://api.themoviedb.org/3';

const sliceText = (str, length = 25) => {
  if (str === undefined) return str;
  if (str.length === 0) return str;
  const words = str.split(' ');
  const spliceWords = words.slice(0, length);
  if (spliceWords.length < 3) {
    return spliceWords.join(' ');
  }
  return `${spliceWords.join(' ')}...`;
};

export { TOKEN, BASE_URL, sliceText };
