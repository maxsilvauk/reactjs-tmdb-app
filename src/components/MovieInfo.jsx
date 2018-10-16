import React from 'react'
import Title from './Title'
import Genres from './Genres'
import Description from './Description'
import {Row} from 'react-bootstrap'

/**
 * Represents the moveinfo part of moviedetail.
 * @param {object} props - the props passed from MovieDetail
 */
export default function MovieInfo(props) {

  const style = {
    padding: '20px'
  };

  return (
    <div style={style}>
      <Row>
        <Title title={props.movie.title}/>
      </Row>
      <Row>
        <Genres genres={props.movie.genres}/>
      </Row>
      <Row>
        <Description title={'Description'} description={props.movie.overview}/>
      </Row>
    </div>
  );
}
