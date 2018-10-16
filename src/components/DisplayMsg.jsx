import React from 'react';
import { Image } from 'react-bootstrap/lib'
import logo from '../assets/images/themoviedb_green.svg'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import '../assets/css/displaymsg.css';

/**
 * Represents the display message shown when loading or
 * no movies or genres can be found.
 * @param {object} props - the props.
 */
export default function DisplayMsg(props) {

  if (!props.hasOwnProperty('message')) {
    return (
      <div>
        <ReactCSSTransitionGroup
            transitionName="fade"
            transitionAppearTimeout={400}
            transitionEnterTimeout={400}
            transitionLeaveTimeout={400}
            transitionAppear={true}>
            <div className="displayMsgIcon">
              <Image src={logo} id="logo" key="displayMsgImage"/>
              <p className="displayMsgTitle" key="displayMsgTitle">Whooops!</p>
              <p className="displayMsgBody" key="displayMsgBody">TMDB API is being really slow or there have been too many requests. Click <a href="/">here</a> to retry.</p>
            </div>
        </ReactCSSTransitionGroup>
        <div className="displayMsgOverlay"/>
      </div>
    );
  } else {
    return (<div>{props.message}</div>);
  }
}
