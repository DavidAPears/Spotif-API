import React from 'react';
import SongDetail from '../components/SongDetail.js';

 class SongSelector extends React.Component{
   render(){
     const options = this.props.songs.map((song, index) => {
       return <SongDetail
         song={song.albums}
       />
     })
     return (
       <div>
         {options}
       </div>
     )
   }
 };


export default SongSelector;
