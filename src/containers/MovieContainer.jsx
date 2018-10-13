import React, {Component} from 'react';
import {MovieList, DisplayMsg} from '../components';
import {connect} from 'react-redux';
import {fetchMovieList, fetchGenresList, searchMovieList} from '../actions';

class MovieContainer extends Component {

  componentDidMount() {
    if (!this.props.params.keyword) {
      const {dispatch} = this.props;
      dispatch(fetchMovieList());
      dispatch(fetchGenresList());
    }
  }

  componentWillReceiveProps(nextProps) {
    const {dispatch} = this.props;
    if (nextProps.params.keyword && this.props.params.keyword !== nextProps.params.keyword) {
      dispatch(searchMovieList(nextProps.params.keyword));
      dispatch(fetchGenresList(nextProps.params.keyword));
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.movies !== nextProps.movies) {
      return true;
    }
    return false;
  }

  render() {
    const {movies, genres} = this.props;

    if (movies.length > 0 && genres.length > 0) {
      return (<MovieList movies={movies} genres={genres}/>);
    } else {
      return (<DisplayMsg/>);
    }
  }
}

function mapStateToProps(state, ownProps) {
  const {movieList, genresList} = state;

  const {isFetcing_genresList, items: genres, error_genresList} = genresList; // eslint-disable-line
  const {isFetcing_movieList, items: movies, error_movieList} = movieList; // eslint-disable-line

  const keyword = ownProps.params.keyword;

  return {
    movies,
    genres,
    keyword
  }
}

export default connect(mapStateToProps)(MovieContainer);
