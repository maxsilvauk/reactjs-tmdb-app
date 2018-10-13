import React from 'react';

export default function Description(props) {

  const style = {
    'marginBottom': '1%'
  };

  return (<div>
    <h3 style={style}>{props.title}</h3>
    <p>
      {props.description}
    </p>
  </div>);
}
