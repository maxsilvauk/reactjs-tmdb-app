import React from 'react'
import Trailer from './Trailer'

/**
 * Represents the trailer list
 * @param {object} data - the trailer data
 */
export default function TrailerList({data}) {

  let trailers = data.map(function(trailer) {
    return (<Trailer key={trailer.key} trailer={trailer.key}/>);
  });

  const style = {
    paddingLeft: '4px',
    'marginTop': '1%',
    'marginBottom': '2%'
  };

  if (trailers.length !== 0) {
    return (
      <div>
        <h3 style={style}>Trailers</h3>
        {trailers}
      </div>
    );
  } else {
    return null;
  }
}
