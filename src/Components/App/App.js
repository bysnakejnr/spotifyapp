import React, {useState} from "react";
import styles from './App.module.css';

function App () {
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

    },])
  return (
      <div>
        <h1>
          Mu<span className={styles.highlight}>S</span>ic by Baris Berber
        </h1>
        <div className="App">
          {/* <!-- Add a SearchBar component --> */}

          <div className={styles['App-playlist']}>
            {/* <!-- Add a SearchResults component --> */}
            {/* <!-- Add a Playlist component --> */}
          </div>
        </div>
      </div>
  );
}

export default App;