const Genres = {};

/**
 * Represents getMovieListGenres()
 * Gets the genre name for the MovieListItem.
 * @param {object} movie - the individual movie
 */
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

/**
 * Represents getFilterGenres()
 * Gets the list of unique genres for the filter.
 */
Genres.getFilterGenres = (genres) => {
  const movies = JSON.parse(sessionStorage.getItem('movies'));

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
