import React, { Component } from 'react';
import logo from './logo.svg';
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
        nowPlaying: { name: 'Not Checked', albumArt: '' },
        newReleases: { name: 'Not Checked', albums: [] }
      }
 this.getNewReleases = this.getNewReleases.bind(this);
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
          <img src={this.state.nowPlaying.albumArt} alt="album-art" style={{ height: 400 }}/>
        </div>

        { this.state.loggedIn &&

          <button onClick={() => this.getNowPlaying()}>
            Check Now Playing
          </button>
        }

        <div>
          New Releases
          {this.state.newReleases.albums.map(album => {
          return <div>
            Title: {album.name}  ({album.album_type})
          </div>
          })}
        </div>

        { this.state.loggedIn &&

        <button onClick={() => this.getNewReleases()}>
          New Releases
        </button>
      }
    </div>
  );
}

// GETS CURRENT TRACK BEING PLAYED ON USERS SPOTIFY
  getNowPlaying(){
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          nowPlaying: {
              name: response.item.name,
              albumArt: response.item.album.images[0].url
            }
        });
      });
  }

// GETS LATEST RELEASES VIA SPOTIFY
  getNewReleases(){
  spotifyApi.getNewReleases({ limit : 10, offset: 0, country: 'GB' })
    .then((data) => {
      this.setState({
        newReleases: {
          albums: data.albums.items
        }
      });
      console.log(this.state.newReleases);
      }, function(err) {
         console.log("Something went wrong!", err);
       });
     };
    }



export default App;
