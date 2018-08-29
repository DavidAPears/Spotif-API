import React from 'react';

const SongDetail = function (props) {
  // if(!props.selectedSong) return null;
  return (
    <div className="results-box">
      <p>"{props.song}"</p>
    </div>
  )
}


export default SongDetail;
