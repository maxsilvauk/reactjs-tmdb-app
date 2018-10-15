import {
  URL_LIST,
  URL_GENRES,
  URL_SEARCH,
  URL_DETAIL,
  URL_VIDEO,
  API_KEY,
  API_KEY_ALT
} from '../const';

// action types
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

function searchMovie(searchText) {
  return {
    type: SEARCH_MOVIE,
    searchText
  };
}

function searchMovieSuccess(data, keyword) {
  return {
    type: SEARCH_MOVIE_SUCCESS,
    data,
    keyword
  };
}

function searchMovieFail(error) {
  return {
    type: SEARCH_MOVIE_FAILURE,
    error
  };
}

function fetchGenres() {
  return {
    type: FETCH_GENRES
  };
}

function fetchGenresSuccess(data) {
  return {
    type: FETCH_GENRES_SUCCESS,
    data
  };
}

function fetchGenresFail(error) {
  return {
    type: FETCH_GENRES_FAILURE,
    error
  };
}

function fetchMovies() {
  return {
    type: FETCH_MOVIES
  };
}

function fetchMoviesSuccess(data) {
  return {
    type: FETCH_MOVIES_SUCCESS,
    data
  };
}

function fetchMoviesFail(error) {
  return {
    type: FETCH_MOVIES_FAILURE,
    error
  };
}

function fetchMovie() {
  return {
    type: FETCH_MOVIE
  };
}

function fetchMovieSuccess(data) {
  return {
    type: FETCH_MOVIE_SUCCESS,
    data
  };
}

function fetchMovieFail(error) {
  return {
    type: FETCH_MOVIE_FAILURE,
    error
  };
}

function fetchTrailers() {
  return {
    type: FETCH_TRAILERS
  };
}

function fetchTrailersSuccess(data) {
  return {
    type: FETCH_TRAILERS_SUCCESS,
    data
  };
}

function fetchTrailersFail(error) {
  return {
    type: FETCH_TRAILERS_FAILURE,
    error
  };
}

export function searchMovieList(keyword) {
  let url = URL_SEARCH + keyword + API_KEY_ALT;

  console.log('WE GET HERE')

  return function(dispatch){
    dispatch(searchMovie())
    return fetch(url)
      .then(response => response.json())
      .then(json => json.results)
      .then(data => dispatch(searchMovieSuccess(data,keyword)))
      .catch(error => dispatch(searchMovieFail(error)))
  }
}

export function fetchGenresList() {
  const url = URL_GENRES + API_KEY;

  return function(dispatch){
    dispatch(fetchGenres())
    return fetch(url)
      .then(response => response.json())
      .then(json => json.genres)
      .then(data => dispatch(fetchGenresSuccess(data)))
      .catch(error => dispatch(fetchGenresFail(error)))
  }
}

export function fetchMovieList(option) {
  const url = URL_LIST + API_KEY;

  return function(dispatch) {
    dispatch(fetchMovies());
    return fetch(url)
      .then(response => response.json())
      .then(json => json.results)
      .then(data => dispatch(fetchMoviesSuccess(data)))
      .catch(error => dispatch(fetchMoviesFail(error)))
  }
}

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
