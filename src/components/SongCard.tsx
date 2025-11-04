import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Plus, Music } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export interface Song {
  id: string;
  name: string;
  artist: string;
  album: string;
  duration: string;
  albumArt: string;
  uri: string;
}

interface SongCardProps {
  song: Song;
  onAdd: (song: Song) => void;
  isAdded?: boolean;
}

export function SongCard({ song, onAdd, isAdded }: SongCardProps) {
  return (
    <Card className="group overflow-hidden border-zinc-800 bg-zinc-900/50 backdrop-blur-sm transition-all hover:bg-zinc-800/70 hover:shadow-lg hover:shadow-green-500/10">
      <div className="flex items-center gap-4 p-3">
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
          <ImageWithFallback
            src={song.albumArt}
            alt={song.album}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
            <Music className="h-6 w-6 text-white" />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="truncate text-white">{song.name}</h3>
          <p className="truncate text-zinc-400">{song.artist}</p>
          <p className="text-xs text-zinc-500">{song.album}</p>
        </div>
        
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-sm text-zinc-400">{song.duration}</span>
          <Button
            onClick={() => onAdd(song)}
            disabled={isAdded}
            size="sm"
            className={`transition-all ${
              isAdded 
                ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-500 hover:scale-105'
            }`}
          >
            <Plus className="h-4 w-4 mr-1" />
            {isAdded ? 'Added' : 'Add'}
          </Button>
        </div>
      </div>
    </Card>
  );
}
