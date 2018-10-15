const Genres = {};

Genres.getMovieListGenres = (movie) => {
  const genres = JSON.parse(sessionStorage.getItem('genres'));
  let movieGenres = [];

  genres.forEach(function(genre, i) {
    movie.genre_ids.forEach((movGenId, i) => {
      if (movGenId === genre.id) {
        movieGenres.push(genre.name)
      }
    });
  });

  return movieGenres;
};

Genres.getFilterGenres = (movie) => {
  const movies = JSON.parse(sessionStorage.getItem('movies'));
  const genres = JSON.parse(sessionStorage.getItem('genres'));

  let genreIds = [];
  let filterGenres = [];

  movies.map((movie) => {
    movie.genre_ids.forEach((genre_id, i) => {
      genreIds.push(genre_id)
    })
    return (genreIds)
  });

  const uGenreIds = [...new Set(genreIds.map(id => id))];

  genres.forEach((genre, i) => {
    uGenreIds.forEach((genreId, i) => {
      if (genreId === genre.id) {
        filterGenres.push({id: genreId, name: genre.name})
      }
    });
  });

  return filterGenres;
};

export default Genres;
