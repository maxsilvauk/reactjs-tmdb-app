import React from 'react';
import {URL_IMG, IMG_SIZE_LARGE} from '../const'
import {Image} from 'react-bootstrap'
import styled from 'styled-components'

export default function Poster(props) {

  const StyledImg = styled.div `
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
    top: 4%;
    left: 5%;
    color:white;
    opacity:0;
  `;

  // const listGenres = props.genres.map((genre) => <li>{genre}</li>);
  // console.log('LIST', listGenres)

  const Overlay = styled.div `
    background: black;
    z-index: 100;
  `;

  return (<StyledImg>
    <Overlay></Overlay>
    <Image className="image" key={props.id} src={URL_IMG + IMG_SIZE_LARGE + props.path} responsive="true"/> {
      props.info && <Info className="title">
          <h4>{props.title}</h4>
          {props.voteAverage}
        </Info>
    }
  </StyledImg>);
}
