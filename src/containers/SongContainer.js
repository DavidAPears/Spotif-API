import React from 'react';
import SongSelector from '../components/SongSelector.js';
// import SongDetail from '../components/SongDetail.js';

class SongContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      songs: [],
      selectedSong: null
    };
    // this.handleSongSelected = this.handleSongSelected.bind(this);
  }

  componentDidMount() {
    const url = 'GET https://api.spotify.com/v1/browse/new-releases'
    fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((songs) => {
      this.setState({
        songs: songs.albums
      });
    })
  }

  handleSongSelected(index) {
    console.log(index);
    const selectedSong = this.state.songs[index];
    console.log(this.state.songs[1]);
    console.log(selectedSong);
    this.setState({
      selectedSong: selectedSong
    });
  }

render() {
  return (
    <div className="song-container">
      <h2> PLACEHOLDER </h2>
      <SongSelector songs={this.state.songs}/>
      {/* //   onSongSelected = {this.handleSongSelected} /> */}
      {/* <ArtistDetail selectedSong={this.state.selectedSong}/> */}
    </div>
  )
}


};


export default SongContainer;
