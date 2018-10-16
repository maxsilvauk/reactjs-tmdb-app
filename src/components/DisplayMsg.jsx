import React from 'react';
import styled from 'styled-components'
import { Image } from 'react-bootstrap/lib'
import logo from '../assets/images/themoviedb_green.svg'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default function DisplayMsg(props) {

  const iconStyle = {
    display: 'block',
    fontSize: '230px',
    color: '#30d673'
  }

  const displayMsgIconStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 3
  }

  const displayMsgTitleStyle = {
    display: 'block',
    fontSize: '40px',
    color: '#30d673',
    marginTop: '10px',
    fontWeight: 'bold',
    textAlign: 'center',
    zIndex: 3
  }

  const displayMsgBodyStyle = {
    display: 'block',
    fontSize: '16px',
    color: 'white',
    marginTop: '10px',
    width: '230px',
    textAlign: 'center',
    zIndex: 3
  }

  const Overlay = styled.div `
    background:rgba(32,35,42,0.8);
    z-index: 2;
    position: fixed;
    top:0;
    left:0;
    height: 100%;
    width: 100%;
    display: block;
  `;

  if (!props.hasOwnProperty('message')) {
    return (
      <div>
        <ReactCSSTransitionGroup
            transitionName="fade"
            transitionAppearTimeout={400}
            transitionEnterTimeout={400}
            transitionLeaveTimeout={400}
            transitionAppear={true}>
            <div style={displayMsgIconStyle}>
              <Image src={logo} id="logo" key="fade"/>
              <p style={displayMsgTitleStyle} key="displayMsgTitle">Whooops!</p>
              <p style={displayMsgBodyStyle} key="displayMsgBody">TMDB API is being really slow or there have been too many requests. Click <a href="/">here</a> to retry.</p>
            </div>
        </ReactCSSTransitionGroup>
        <Overlay/>
      </div>
    );
  } else {
    return (<div>{props.message}</div>);
  }
}
