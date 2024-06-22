import React, {useState} from "react";
import styles from './App.module.css';
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";

function App (props) {

    const [playlistName, setPlaylistName] = useState("Playlist")
    const [playlistTracks, setPlaylistTracks] = useState([
        {
        name: "example track name 1",
        artist : "ex track artist 1",
        album: "ex track album 1",
        id:1

},{
    name: "example track name 2",
        artist : "ex track artist 2",
        album: "ex track album 2",
        id:2

},{
    name: "example track name 3",
        artist : "ex track artist 3",
        album: "ex track album 3",
        id:3

},
    ]);
    const [searchResults, setSearchResults] = useState([{
        name: "example track name 1",
        artist : "ex track artist 1",
        album: "ex track album 1",
        id:1

    },{
        name: "example track name 2",
        artist : "ex track artist 2",
        album: "ex track album 2",
        id:2

    },{
        name: "example track name 3",
        artist : "ex track artist 3",
        album: "ex track album 3",
        id:3

    },]);

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
  return (
      <div>
        <h1>
          Mu<span className={styles.highlight}>S</span>ic by Baris Berber
        </h1>
        <div className={styles.App}>
          {/* <!-- Add a SearchBar component --> */}

          <div className={styles['App-playlist']}>
              <SearchResults userSearchResults={searchResults} onAdd={addTrack} isRemoval={true}/>

              <Playlist playlistName={playlistName} playlistTracks={playlistTracks} onRemove={removeTrack}/>
          </div>
        </div>
      </div>
  );
}

export default App;