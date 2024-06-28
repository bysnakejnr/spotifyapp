import React, {useState} from "react";
import styles from './App.module.css';
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import SearchBar from "../SearchBar/SearchBar";
import {Spotify} from "../../util/Spotify/Spotify";

function App (props) {

    const [playlistName, setPlaylistName] = useState("Playlist")
    const [playlistTracks, setPlaylistTracks] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    function addTrack(track){
        const existingTrack = playlistTracks.find(t => t.id === track.id)
        const newTrack = playlistTracks.concat(track);
        if(existingTrack) {
            console.log("Track already exists")
        }
        else{
            setPlaylistTracks(newTrack)
        }
    }

    function removeTrack(track){
        const existingTrack = playlistTracks.filter((t)=> t.id !==track.id);
        setPlaylistTracks(existingTrack);

    }

    function updatePlaylistName(name){
        setPlaylistName(name);

    }

    function savePlaylist(){
        const trackURIs = playlistTracks.map((t)=> t.uri);
        Spotify.savePlaylist(playlistName, trackURIs).then(()=>{
            setPlaylistName("New Playlist");
            setPlaylistTracks([]);
        })
    }

    function search(term){
        Spotify.search(term).then(result => setSearchResults(result));
        console.log(term)
    }
  return (
      <div>
        <h1>
          Mu<span className={styles.highlight}>S</span>ic by Baris Berber
        </h1>
          <div className={styles.App}>
              <h1>Search for music, add it to your playlist, and click save to save it to your spotify account!</h1>
              <SearchBar onSearch={search}/>


              <div className={styles['App-playlist']}>
                  <SearchResults userSearchResults={searchResults} onAdd={addTrack} isRemoval={true}/>

                  <Playlist playlistName={playlistName}
                            playlistTracks={playlistTracks}
                            onRemove={removeTrack}
                            onNameChange={updatePlaylistName}
                            onSave={savePlaylist}
                  />
              </div>
          </div>
      </div>
  );
}

export default App;