import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDizzy } from '@fortawesome/free-solid-svg-icons'

library.add({faDizzy})

export default function DisplayMsg(props) {

  const iconStyle = {
    display: 'block',
    fontSize: '270px',
    color: '#30d673'
  }

  const errorMsgTitleStyle = {
    display: 'block',
    fontSize: '40px',
    color: '#30d673',
    marginTop: '10px',
    fontWeight: 'bold',
    textAlign: 'center'
  }

  const errorMsgBodyStyle = {
    display: 'block',
    fontSize: '16px',
    color: 'white',
    marginTop: '10px',
    width: '270px',
    textAlign: 'center'
  }

  if (!props.hasOwnProperty('message')) {
    return (
      <div id="not-found"><FontAwesomeIcon icon="dizzy" style={iconStyle} />
      <p style={errorMsgTitleStyle}>Whooops!</p>
      <p style={errorMsgBodyStyle}>TMDB API is being really slow or there have been too many requests please try again!</p></div>
    );
  } else {
    return (<div>{props.message}</div>);
  }
}
