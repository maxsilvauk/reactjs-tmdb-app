import React from 'react'

/**
 * Represents the title used in the MovieInfo.
 * @param {object} props - the title name
 */
export default function Title(props) {

  const style = {
    fontWeight: 'bold',
    textTransform: 'uppercase'
  };

  return (<h1 style={style}>{props.title}</h1>);
}
