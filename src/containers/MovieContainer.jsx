import React, {PureComponent} from 'react';
import {MovieList, DisplayMsg} from '../components';
import {connect} from 'react-redux';
import {fetchMovieList, searchMovieList} from '../actions';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

/**
 * Represents the MovieContainer Class.
 * - The logic for an individual Movie is found here.
 */
class MovieContainer extends PureComponent {
  /**
   * Represents componentDidMount()
   * Invoked immediately after a component is mounted
   */
  componentDidMount() {
    if (!this.props.params.keyword) {
      const {dispatch} = this.props;
      dispatch(fetchMovieList());
    }
  }

  /**
   * Represents componentWillReceiveProps()
   * Is invoked before a mounted component receives new props.
   * @param {object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    const {dispatch} = this.props;
    if (nextProps.params.keyword && this.props.params.keyword !== nextProps.params.keyword) {
      dispatch(searchMovieList(nextProps.params.keyword));
    }
  }

  /**
   * Represents shouldComponentUpdate()
   * Every time we start an Update in a Component, we will re-render.
   * @param {object} nextProps
   * @param {object} nextState
   */
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.movies !== nextProps.movies) {
      return true;
    }
    return false;
  }

  render() {
    const {movies, isFetcing_movies} = this.props;

    if (isFetcing_movies) {
      return (<DisplayMsg/>);
    }

    const genres = JSON.parse(sessionStorage.getItem('genres'));

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
  const {movieList} = state;

  const {isFetcing_movieList, items: movies, error_movieList} = movieList; // eslint-disable-line

  const keyword = ownProps.params.keyword;

  return {
    movies,
    keyword
  }
}

export default connect(mapStateToProps)(MovieContainer);
