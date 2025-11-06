import { SongCard, Song } from "./SongCard";
import { ScrollArea } from "./ui/scroll-area";
import { Music2 } from "lucide-react";

interface SearchResultsProps {
  songs: Song[];
  onAddSong: (song: Song) => void;
  addedSongIds: Set<string>;
  isSearched: boolean;
}

export function SearchResults({ songs, onAddSong, addedSongIds, isSearched }: SearchResultsProps) {
  if (!isSearched) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <Music2 className="h-16 w-16 text-zinc-700 mb-4" />
        <h3 className="text-xl text-zinc-400 mb-2">Start Your Music Journey</h3>
        <p className="text-zinc-500">Search for your favorite songs to create your perfect playlist</p>
      </div>
    );
  }

  if (songs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <Music2 className="h-16 w-16 text-zinc-700 mb-4" />
        <h3 className="text-xl text-zinc-400 mb-2">No results found</h3>
        <p className="text-zinc-500">Try searching with different keywords</p>
      </div>
    );
  }

  return (
    <div className="min-h-full">
      <div className="mb-4">
        <h2 className="text-xl text-white">Search Results</h2>
        <p className="text-sm text-zinc-400">{songs.length} songs found</p>
      </div>
      <ScrollArea className="min-h-full h-[calc(100vh-320px)] pr-2">
        <div className="space-y-2 pr-4">
          {songs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              onAdd={onAddSong}
              isAdded={addedSongIds.has(song.id)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
