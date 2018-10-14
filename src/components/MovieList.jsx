import React, {Component} from 'react';
import Poster from './Poster';
import {Link} from 'react-router';
import {Grid, Row, Col} from 'react-bootstrap';
import Genres from '../helpers/Genres';

export default class MovieList extends Component {

  render() {

    const style = {
      display: 'flex',
      flexWrap: 'wrap'
    }

    const propsGenres = this.props.genres;
    let movies = this.props.movies.filter(function(movie) {
      return movie.poster_path != null;
    }).map(function(movie) {

      let genres = Genres.getMovieListGenres(propsGenres, movie)

      return (<Col xs={6} sm={4} md={2} key={movie.id}>
        <Link to={'/movie/' + movie.id}>
          <Poster info="info" id={movie.id} path={movie.poster_path} title={movie.title} popularity={movie.popularity} genres={genres} responsive="responsive"/>
        </Link>
      </Col>);
    });

    return (<Grid fluid={false}>
      <Row style={style}>
        {movies}
      </Row>
    </Grid>);
  }
}
