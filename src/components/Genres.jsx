import React from 'react';

export default function Genres(genres){
  const listStyle = {
    'listStyleType': 'none',
    'padding': '0px'
  };

  const itemStyle = {
    'display': 'inline-block',
    'marginRight': '10px',
    'marginBottom': '20%'
  };

  return(
    <ul style={listStyle}>
      {genres.genres.map((genre, i) => (
        <li key={genre.name} style={itemStyle}>{genre.name}{i === genres.genres.length - 1 ? '' : ', '}</li>
      ))}
    </ul>
  );
}
