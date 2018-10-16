import React, {Component} from 'react';
import {MovieList, DisplayMsg} from '../components';
import {connect} from 'react-redux';
import {fetchMovieList, fetchGenresList, searchMovieList} from '../actions';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

/**
 * Represents the MovieContainer Class.
 * - The logic for an individual Movie is found here.
 */
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
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.movies !== nextProps.movies) {
      return true;
    }
    return false;
  }

  render() {
    const {movies, genres, isFetcing_movies, isFetcing_genres} = this.props;

    if (isFetcing_movies || isFetcing_genres) {
      return (<DisplayMsg/>);
    }

    if (movies.length > 0 && genres.length > 0) {
      return (
        <ReactCSSTransitionGroup
          transitionAppearTimeout={2000}
          transitionEnterTimeout={2000}
          transitionLeaveTimeout={2000}
          transitionName="movieListFade"
          transitionAppear={true}>
          <MovieList movies={movies} genres={genres} key="movieList"/>
        </ReactCSSTransitionGroup>
      );
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
