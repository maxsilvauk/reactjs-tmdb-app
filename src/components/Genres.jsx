import React from 'react';

/**
 * Represents the genres displayed in movie info.
 * @param {object} genres - the genre data.
 */
export default function Genres(genres) {
  const listStyle = {
    'listStyleType': 'none',
    'padding': '0px'
  };

  const itemStyle = {
    'display': 'inline-block',
    'marginRight': '10px',
  };

  return(
    <ul style={listStyle}>
      {genres.genres.map((genre, i) => (
        <li key={genre.name} style={itemStyle}>{genre.name}{i === genres.genres.length - 1 ? '' : ', '}</li>
      ))}
    </ul>
  );
}
