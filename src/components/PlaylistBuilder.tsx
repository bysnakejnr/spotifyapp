import { PlaylistSongCard } from "./PlaylistSongCard";
import { Song } from "./SongCard";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Save, ListMusic, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Spotify } from "../util/Spotify";

interface PlaylistBuilderProps {
  songs: Song[];
  onRemoveSong: (id: string) => void;
  onClearPlaylist: () => void;
}

export function PlaylistBuilder({ songs, onRemoveSong, onClearPlaylist }: PlaylistBuilderProps) {
  const [playlistName, setPlaylistName] = useState("");

  const handleSaveToSpotify = () => {
    if (!playlistName.trim()) {
      toast.error("Please enter a playlist name");
      return;
    }
    if (songs.length === 0) {
      toast.error("Add some songs to your playlist first");
      return;
    }
    
    // Mock save functionality
    const trackURIs = songs.map((s)=>s.uri);
    Spotify.savePlaylist(playlistName, trackURIs).then(()=>{
          setPlaylistName("");
          onClearPlaylist();
      toast.success(`Playlist "${playlistName}" saved to Spotify!`, {
        description: `${songs.length} songs added successfully`
      });


  })  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-zinc-900/50 to-zinc-900/30 backdrop-blur-sm rounded-lg border border-zinc-800 p-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <ListMusic className="h-6 w-6 text-green-500" />
          <h2 className="text-2xl text-white">Your Playlist</h2>
        </div>
        
        <Input
          type="text"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
          placeholder="Enter playlist name..."
          className="mb-4 bg-zinc-900/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-green-500 focus:ring-green-500/20"
        />
        
        <div className="flex gap-2">
          <Button
            onClick={handleSaveToSpotify}
            className="flex-1 bg-green-600 hover:bg-green-500"
          >
            <Save className="h-4 w-4 mr-2" />
            Save to Spotify
          </Button>
          {songs.length > 0 && (
            <Button
              onClick={onClearPlaylist}
              variant="outline"
              className="border-zinc-700 bg-zinc-900/50 text-zinc-400 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {songs.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
          <div className="h-24 w-24 rounded-full bg-zinc-800/50 flex items-center justify-center mb-4">
            <ListMusic className="h-12 w-12 text-zinc-600" />
          </div>
          <h3 className="text-lg text-zinc-400 mb-2">Your playlist is empty</h3>
          <p className="text-sm text-zinc-500">Add songs from search results to get started</p>
        </div>
      ) : (
        <div className="flex-1 overflow-hidden">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm text-zinc-400">{songs.length} song{songs.length !== 1 ? 's' : ''}</p>
            <p className="text-xs text-zinc-500">Drag to reorder</p>
          </div>
          <ScrollArea className="h-[calc(100%-32px)]">
            <div className="space-y-2 pr-4">
              {songs.map((song, index) => (
                <PlaylistSongCard
                  key={song.id}
                  song={song}
                  onRemove={onRemoveSong}
                  index={index}
                />
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
