import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { X, GripVertical } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Song } from "./SongCard";

interface PlaylistSongCardProps {
  song: Song;
  onRemove: (id: string) => void;
  index: number;
}

export function PlaylistSongCard({ song, onRemove, index }: PlaylistSongCardProps) {
  return (
    <Card className="overflow-hidden border-zinc-800 bg-zinc-900/30 backdrop-blur-sm transition-all hover:bg-zinc-800/50">
      <div className="flex items-center gap-3 p-3">
        <div className="flex items-center gap-2 text-zinc-500">
          <GripVertical className="h-4 w-4" />
          <span className="text-sm min-w-[20px]">{index + 1}</span>
        </div>
        
        <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded">
          <ImageWithFallback
            src={song.albumArt}
            alt={song.album}
            className="h-full w-full object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="truncate text-white text-sm">{song.name}</h4>
          <p className="truncate text-xs text-zinc-400">{song.artist}</p>
        </div>
        
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs text-zinc-400">{song.duration}</span>
          <Button
            onClick={() => onRemove(song.id)}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-zinc-400 hover:text-red-500 hover:bg-red-500/10"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
