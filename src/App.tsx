import {useEffect, useState} from "react";
import { SearchBar } from "./components/SearchBar";
import { SearchResults } from "./components/SearchResults";
import { PlaylistBuilder } from "./components/PlaylistBuilder";
import { Song } from "./components/SongCard";
import { Music } from "lucide-react";
import { Toaster } from "./components/ui/sonner";
import { Spotify } from "./util/Spotify";
import {toast} from "sonner";
const clientID = import.meta.env.CLIENT_ID;



export default function App() {
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [playlist, setPlaylist] = useState<Song[]>([]);
  const [isSearched, setIsSearched] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check if token is in URL when the component mounts
    const tokenInURL = window.location.href.match(/access_token=([^&]*)/);
    if (tokenInURL) {
      Spotify.getAccessToken(); // grabs token and cleans URL
      toast.success("✅ You’re now logged in with Spotify!");
      setLoggedIn(true);
    }
  }, []);

  function search(query:string) {
    Spotify.search(query).then((results) => setSearchResults(results));
    console.log(query);
    setIsSearched(true);
  }

  const handleAddSong = (song: Song) => {
    if (!playlist.find((s: Song) => s.id === song.id)) {
      setPlaylist([...playlist, song]);
    }
  };

  const handleRemoveSong = (id: string) => {
    setPlaylist(playlist.filter((song: Song) => song.id !== id));
  };

  const handleClearPlaylist = () => {
    setPlaylist([]);
  };

  const addedSongIds = new Set(playlist.map((song: Song) => song.id));

  return (

    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
      <Toaster position="top-center" richColors />
      
      {/* Header */}
      <header className="border-b border-zinc-800 bg-black/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
              <Music className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl text-white">Spotify Playlist Creator</h1>
              <p className="text-sm text-zinc-400">Search, create, and save your perfect playlist</p>
            </div>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar onSearch={search} />
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-240px)]">
          {/* Search Results */}
          <div className="bg-gradient-to-b from-zinc-900/50 to-zinc-900/30 backdrop-blur-sm rounded-lg border border-zinc-800 p-6">
            <SearchResults
              songs={searchResults}
              onAddSong={handleAddSong}
              addedSongIds={addedSongIds}
              isSearched={isSearched}
            />
          </div>

          {/* Playlist Builder */}
          <PlaylistBuilder
            songs={playlist}
            onRemoveSong={handleRemoveSong}
            onClearPlaylist={handleClearPlaylist}
          />
        </div>
      </main>
    </div>
  );
}
