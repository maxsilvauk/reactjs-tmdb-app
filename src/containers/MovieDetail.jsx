import React, {Component} from 'react';
import {TrailerList} from '../components';
import {TRAILER_MAX_NUM} from '../const';
import {Grid, Row, Col} from 'react-bootstrap/lib';
import {MovieInfo, Poster} from '../components';
import {connect} from 'react-redux';
import {fetchMovieDetail, fetchTrailerList} from '../actions';

class MovieDetail extends Component {

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(fetchMovieDetail(this.props.params.id));
    dispatch(fetchTrailerList(this.props.params.id));
  }

  componentWillReceiveProps(nextProps) {
    const {dispatch} = this.props;
    if (nextProps.params.id && this.props.params.id !== nextProps.params.id) {
      dispatch(fetchMovieDetail(nextProps.params.id));
      dispatch(fetchTrailerList(nextProps.params.id));
    }
  }

  render() {
    const {movie, trailers, isFetcing_movie, isFetcing_trailers} = this.props;

    if (isFetcing_movie || isFetcing_trailers) {
      return <p>loading...</p>
    }

    if (movie.hasOwnProperty('id')) {
      return (<Grid fluid={false}>
        <Row>
          <Col xs={12} sm={6} md={4}>
            <Poster id={movie.id} path={movie.poster_path} responsive="responsive"/>
          </Col>
          <Col xs={12} sm={6} md={8}>
            <MovieInfo movie={movie}/>
            <TrailerList data={trailers.slice(0, TRAILER_MAX_NUM)}/>
          </Col>
        </Row>
      </Grid>);
    } else {
      return null;
    }
  }
}

function mapStateToProps(state) {
  const {movieDetail, trailerList} = state;
  const {isFetcing_movie, item: movie, error_movie} = movieDetail;
  const {isFetcing_trailers, items: trailers, error_trailers} = trailerList;

  return {
    isFetcing_movie,
    movie,
    error_movie,
    isFetcing_trailers,
    trailers,
    error_trailers
  }
}

export default connect(mapStateToProps)(MovieDetail);
