import React, { Component } from 'react';
import logo from './logo.svg';
import SongContainer from './containers/SongContainer.js';
import './App.css';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();


class App extends Component {
    constructor(){
      super();
      const params = this.getHashParams();
      const token = params.access_token;
      if (token) {
        spotifyApi.setAccessToken(token);
      }
      this.state = {
        loggedIn: token ? true : false,
        nowPlaying: { name: 'Not Checked', albumArt: '' }
      }
    }


  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  render() {
    return (
      <div className="App">

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Spotif-API</h1>
        </header>

        <a href='http://localhost:8888' > Login to Spotify </a>

        <div>
          Now Playing: { this.state.nowPlaying.name }
        </div>

        <div>
          <img src={this.state.nowPlaying.albumArt} style={{ height: 300 }}/>
        </div>
        { this.state.loggedIn &&
          <button onClick={() => this.getNowPlaying()}>
            Check Now Playing
          </button>
        }

        <div>
          <SongContainer/>
        </div>

      </div>
    );
  }

  getNowPlaying(){
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          nowPlaying: {
              name: response.item.name,
              albumArt: response.item.album.images[0].url
            }
        });
      })
  }

}

export default App;
