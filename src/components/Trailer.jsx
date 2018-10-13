import React from 'react';
import {URL_YOUTUBE} from '../const';

/**
 * Represents a trailer
 * @param {string} trailer - the address of trailer for YouTube api
 */
export default function Trailer({trailer}) {
  return <iframe frameBorder="0" className="trailer" src={URL_YOUTUBE + trailer} allowFullScreen="allowFullScreen"/>;
}

Trailer.propTypes = {
  trailer: React.PropTypes.string.isRequired
};
