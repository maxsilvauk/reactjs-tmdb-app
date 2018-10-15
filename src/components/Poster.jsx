import React from 'react';
import {URL_IMG, IMG_SIZE_LARGE} from '../const'
import {Image} from 'react-bootstrap'
import styled from 'styled-components'
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSmile, faPercent} from '@fortawesome/free-solid-svg-icons'

library.add({faSmile, faPercent})

export default function Poster(props) {

  const Movie = styled.div `
    .title {
       opacity: 1;
       font-weight:normal;

       ul {
         list-style-type:none;
         padding:0;
       }
    }
  `;

  const Info = styled.div `
    position: absolute;
    bottom: 4%;
    left: 5%;
    color: white;
    opacity: 0;
    z-index: 2;
  `;

  const Overlay = styled.div `
    background: linear-gradient(to bottom, transparent 0%, black 99%);
    z-index: 1;
    position: absolute;
    height: 100%;
    width: 100%;
    display: block;

    &:hover, &:focus {
      opacity: 0;
      transition: opacity 0.5s;
      -webkit-transition: opacity 0.5s;
  }
  `;

  const popularity = {
    color: '#30d673'
  }

  const percent = {
    fontSize: '10px',
    marginLeft: '1px'
  }

  const listStyle = {
    'listStyleType': 'none',
    'padding': '0px',
    'marginTop': '6px',
    'marginBottom': '6px',
    'fontSize': '12px'
  };

  const itemStyle = {
    'display': 'inline-block',
    'marginRight': '5px'
  };

  const genres = props.genres.map((genre, i) => {
    return (<li style={itemStyle} key={i}>{genre} { i === props.genres.length - 1 ? '' : ',' }</li>)
  })

  return (
      <Movie>
        <Overlay></Overlay>
        <Image key="movieListFade" src={URL_IMG + IMG_SIZE_LARGE + props.path} responsive/>
        {
          props.info && <Info className="title">
              <span style={popularity}>
                <FontAwesomeIcon icon="smile"/> {Math.round(props.popularity)}<FontAwesomeIcon icon="percent" style={percent}/>
              </span>
              <ul style={listStyle}>
                {genres}
              </ul>
              <h4>{props.title}</h4>
            </Info>
        }
      </Movie>
  );
}
