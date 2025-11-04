import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";


interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
    else{
        toast.error("Please enter a valid search");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for songs, artists, or albums..."
          className="h-12 pl-11 bg-zinc-900/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-green-500 focus:ring-green-500/20"
        />
      </div>
      <Button
        type="submit"
        className="h-12 px-8 bg-green-600 hover:bg-green-500"
      >
        Search
      </Button>
    </form>
  );
}
