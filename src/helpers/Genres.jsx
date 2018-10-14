const Genres = {};

Genres.getMovieListGenres = (genres, movie) => {

  let movieGenres = [];
  genres.forEach(function(genre, i) {
    movie.genre_ids.forEach(function(movGenId, i) {
      if (movGenId === genre.id) {
        movieGenres.push(genre.name)
      }
    });
  });

  return movieGenres;
};

export default Genres;
