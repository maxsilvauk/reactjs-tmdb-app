import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import {
  FETCH_GENRES,
  FETCH_GENRES_SUCCESS,
  FETCH_GENRES_FAILURE,
  FETCH_MOVIES,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
  FETCH_MOVIE,
  FETCH_MOVIE_SUCCESS,
  FETCH_MOVIE_FAILURE,
  FETCH_TRAILERS,
  FETCH_TRAILERS_SUCCESS,
  FETCH_TRAILERS_FAILURE,
  SEARCH_MOVIE,
  SEARCH_MOVIE_SUCCESS,
  SEARCH_MOVIE_FAILURE,
  ENTER_SEARCH_TEXT
} from '../actions'

const defaultStateList = {
  isFetching: false,
  items: [],
  error: {}
};

const genresList = (state = defaultStateList, action) => {
  switch (action.type) {
    case FETCH_GENRES:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_GENRES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: action.data
      };
    case FETCH_GENRES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.data
      };
    default:
      return state;
  }
};

const movieList = (state = defaultStateList, action) => {
  switch (action.type) {
    case FETCH_MOVIES:
    case SEARCH_MOVIE:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_MOVIES_SUCCESS:
    case SEARCH_MOVIE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: action.data
      };
    case FETCH_MOVIES_FAILURE:
    case SEARCH_MOVIE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.data
      };
    default:
      return state;
  }
};

const trailerList = (state = defaultStateList, action) => {
  switch (action.type) {
    case FETCH_TRAILERS:
      return Object.assign({}, state, {isFetching: true});
    case FETCH_TRAILERS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.data
      });
    case FETCH_TRAILERS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.data
      });
    default:
      return state;
  }
};

const defaultState = {
  isFetching: false,
  item: {},
  error: {}
};

const movieDetail = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_MOVIE:
      return Object.assign({}, state, {isFetching: true});
    case FETCH_MOVIE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        item: action.data
      });
    case FETCH_MOVIE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.data
      });
    default:
      return state;
  }
};

const input = (state = '', action) => {
  switch (action.type) {
    case ENTER_SEARCH_TEXT:
      return Object.assign({}, state, {isFetching: true});
    default:
      return state;
  }
};

const movieApp = combineReducers({
  movieList,
  genresList,
  trailerList,
  movieDetail,
  input,
  routing: routerReducer
});

export default movieApp;
