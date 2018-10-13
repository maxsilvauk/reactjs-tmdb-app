import React from 'react'
import Title from './Title'
import Genres from './Genres'
import Description from './Description'
import {Row} from 'react-bootstrap'

export default function MovieInfo(props) {

  const style = {
    padding: '20px'
  };

  return (<div style={style}>
    <Row>
      <Title title={props.movie.title}/>
    </Row>
    <Row>
      <Genres genres={props.movie.genres}/>
    </Row>
    <Row>
      <Description title={'Description'} description={props.movie.overview}/>
    </Row>
  </div>);
}
