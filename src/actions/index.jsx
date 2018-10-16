import {
  URL_LIST,
  URL_GENRES,
  URL_SEARCH,
  URL_DETAIL,
  URL_VIDEO,
  API_KEY,
  API_KEY_ALT
} from '../const';

export const SEARCH_MOVIE = 'SEARCH_MOVIE';
export const SEARCH_MOVIE_SUCCESS = 'SEARCH_MOVIE_SUCCESS';
export const SEARCH_MOVIE_FAILURE = 'SEARCH_MOVIE_FAILURE';
export const FETCH_MOVIES = 'FETCH_MOVIES';
export const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS';
export const FETCH_MOVIES_FAILURE = 'FETCH_MOVIES_FAILURE';
export const FETCH_GENRES = 'FETCH_GENRES';
export const FETCH_GENRES_SUCCESS = 'FETCH_GENRES_SUCCESS';
export const FETCH_GENRES_FAILURE = 'FETCH_GENRES_FAILURE';
export const RESET_MOVIES = 'RESET_MOVIES';
export const FETCH_MOVIE = 'FETCH_MOVIE';
export const FETCH_MOVIE_SUCCESS = 'FETCH_MOVIE_SUCCESS';
export const FETCH_MOVIE_FAILURE = 'FETCH_MOVIE_FAILURE';
export const FETCH_TRAILERS = 'FETCH_TRAILERS';
export const FETCH_TRAILERS_SUCCESS = 'FETCH_TRAILERS_SUCCESS';
export const FETCH_TRAILERS_FAILURE = 'FETCH_TRAILERS_FAILURE';

/**
 * Represents searchMovie()
 * Dispatch
 * @param {string} searchText
 */
function searchMovie(searchText) {
  return {
    type: SEARCH_MOVIE,
    searchText
  };
}

/**
 * Represents searchMovieSuccess()
 * Dispatch
 * @param {object} data
 * @param {string} keyword
 */
function searchMovieSuccess(data, keyword) {
  return {
    type: SEARCH_MOVIE_SUCCESS,
    data,
    keyword
  };
}

/**
 * Represents searchMovieFail()
 * Dispatch
 * @param {object} error
 */
function searchMovieFail(error) {
  return {
    type: SEARCH_MOVIE_FAILURE,
    error
  };
}

/**
 * Represents searchGenres()
 * Dispatch
 */
function fetchGenres() {
  return {
    type: FETCH_GENRES
  };
}

/**
 * Represents fetchGenresSuccess()
 * Dispatch
 * @param {object} data
 */
function fetchGenresSuccess(data) {
  return {
    type: FETCH_GENRES_SUCCESS,
    data
  };
}

/**
 * Represents fetchGenresFail()
 * Dispatch
 * @param {object} error
 */
function fetchGenresFail(error) {
  return {
    type: FETCH_GENRES_FAILURE,
    error
  };
}

/**
 * Represents fetchMovies()
 * Dispatch
 */
function fetchMovies() {
  return {
    type: FETCH_MOVIES
  };
}

/**
 * Represents fetchMoviesSuccess()
 * Dispatch
 * @param {object} data
 */
function fetchMoviesSuccess(data) {
  return {
    type: FETCH_MOVIES_SUCCESS,
    data
  };
}

/**
 * Represents fetchMoviesFail()
 * Dispatch
 * @param {object} error
 */
function fetchMoviesFail(error) {
  return {
    type: FETCH_MOVIES_FAILURE,
    error
  };
}

/**
 * Represents fetchMovie()
 * Dispatch
 */
function fetchMovie() {
  return {
    type: FETCH_MOVIE
  };
}

/**
 * Represents fetchMoviesSuccess()
 * Dispatch
 * @param {object} data
 */
function fetchMovieSuccess(data) {
  return {
    type: FETCH_MOVIE_SUCCESS,
    data
  };
}

/**
 * Represents fetchMoviesFail()
 * Dispatch
 * @param {object} error
 */
function fetchMovieFail(error) {
  return {
    type: FETCH_MOVIE_FAILURE,
    error
  };
}

/**
 * Represents fetchTrailers()
 * Dispatch
 */
function fetchTrailers() {
  return {
    type: FETCH_TRAILERS
  };
}

/**
 * Represents fetchTrailersSuccess()
 * Dispatch
 */
function fetchTrailersSuccess(data) {
  return {
    type: FETCH_TRAILERS_SUCCESS,
    data
  };
}

/**
 * Represents fetchTrailersFail()
 * Dispatch
 * @param {object} error
 */
function fetchTrailersFail(error) {
  return {
    type: FETCH_TRAILERS_FAILURE,
    error
  };
}

/**
 * Represents searchMovieList()
 * API call for searching movies.
 * @param {string} keyword - the search string.
 */
export function searchMovieList(keyword) {
  let url = URL_SEARCH + keyword + API_KEY_ALT;

  return function(dispatch){
    dispatch(searchMovie())
    return fetch(url)
      .then(response => response.json())
      .then(json => json.results)
      .then(data => dispatch(searchMovieSuccess(data,keyword)))
      .catch(error => dispatch(searchMovieFail(error)))
  }
}

/**
 * Represents _onSetGenresSession()
 * Sets the genres in the session.
 * @param {object} dispatch
 * @param {object} data
 */
const _onSetGenresSession = (dispatch, data) => {
  sessionStorage.setItem('genres', JSON.stringify(data));
  dispatch(fetchGenresSuccess(data))
}

/**
 * Represents fetchGenresList()
 * API call for fetching genres.
 */
export function fetchGenresList() {
  const url = URL_GENRES + API_KEY;

  return function(dispatch){
    dispatch(fetchGenres())
    return fetch(url)
      .then(response => response.json())
      .then(json => json.genres)
      .then(data => _onSetGenresSession(dispatch, data))
      .catch(error => dispatch(fetchGenresFail(error)))
  }
}

/**
 * Represents _onSetMoviesListSession
 * Sets the movies in the session.
 * @param {object} dispatch
 * @param {object} data
 */
const _onSetMoviesListSession = (dispatch, data) => {
  sessionStorage.setItem('movies', JSON.stringify(data));
  console.log('session set')
  dispatch(fetchMoviesSuccess(data))
}

/**
 * Represents fetchMovieList()
 * API call for fetching movies.
 */
export function fetchMovieList(option) {
  const url = URL_LIST + API_KEY;

  return function(dispatch) {
    dispatch(fetchMovies());
    return fetch(url)
      .then(response => response.json())
      .then(json => json.results)
      .then(data => _onSetMoviesListSession(dispatch, data))
      .catch(error => dispatch(fetchMoviesFail(error)))
  }
}

/**
 * Represents fetchMovieDetail()
 * API call for fetching movie detail.
 * @param {number} id
 */
export function fetchMovieDetail(id) {
  const url = URL_DETAIL + id + API_KEY;

  return function(dispatch){
    dispatch(fetchMovie())
    return fetch(url)
      .then(response => response.json())
      .then(data => dispatch(fetchMovieSuccess(data)))
      .catch(error => dispatch(fetchMovieFail(error)))
  }
}

/**
 * Represents fetchTrailerList()
 * API call for fetching trailers for a movie.
 * @param {number} id - movie id.
 */
export function fetchTrailerList(id) {
  const url = URL_DETAIL + id + URL_VIDEO + API_KEY;

  return function(dispatch) {
    dispatch(fetchTrailers())
    return fetch(url)
      .then(response => response.json())
      .then(json => json.results)
      .then(data => {
        let youtubeTrailers = data.filter(function(trailer){
          return trailer.site === 'YouTube';
        });
        dispatch(fetchTrailersSuccess(youtubeTrailers));
      }).catch(error => dispatch(fetchTrailersFail(error)))
  }
}
