import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDizzy } from '@fortawesome/free-solid-svg-icons'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

library.add({faDizzy})

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
    transform: 'translate(-50%, -50%)'
  }

  const displayMsgTitleStyle = {
    display: 'block',
    fontSize: '40px',
    color: '#30d673',
    marginTop: '10px',
    fontWeight: 'bold',
    textAlign: 'center'
  }

  const displayMsgBodyStyle = {
    display: 'block',
    fontSize: '16px',
    color: 'white',
    marginTop: '10px',
    width: '230px',
    textAlign: 'center'
  }

  if (!props.hasOwnProperty('message')) {
    return (
      <ReactCSSTransitionGroup
          transitionName="fade"
          transitionAppearTimeout={800}
          transitionEnterTimeout={800}
          transitionLeaveTimeout={800}
          transitionAppear={true}>
          <div style={displayMsgIconStyle}>
            <FontAwesomeIcon style={iconStyle} icon="dizzy" key="displayMsgIcon" />
            <p style={displayMsgTitleStyle} key="displayMsgTitle">Whooops!</p>
            <p style={displayMsgBodyStyle} key="displayMsgBody">TMDB API is being really slow or there have been too many requests. Click <a href="/">here</a> to retry.</p>
          </div>
      </ReactCSSTransitionGroup>
    );
  } else {
    return (<div>{props.message}</div>);
  }
}
