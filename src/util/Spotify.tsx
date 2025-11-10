// src/utils/Spotify.ts
let accessToken: string | undefined;
const clientID = import.meta.env.VITE_CLIENT_ID;
// const redirectURI = "http://localhost:3000";
const redirectURI = "https://barismusic.netlify.app";
import { toast } from "sonner";

const Spotify = {
    getAccessToken() {
        if (accessToken) return accessToken;

        const tokenInURL = window.location.href.match(/access_token=([^&]*)/);
        const expiryTime = window.location.href.match(/expires_in=([^&]*)/);

        if (tokenInURL && expiryTime) {
            accessToken = tokenInURL[1];
            const expiresIn = Number(expiryTime[1]);

            // Clear token after expiry
            window.setTimeout(() => (accessToken = ""), expiresIn * 1000);

            // Clean up URL
            window.history.pushState("Access Token", "", "/");
            return accessToken;
        }

        // If no token, redirect for authorization
        const redirect = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        window.location.href = redirect;
    },

    async search(term: string) {
        if (!term) return [];

        if (!accessToken) accessToken = Spotify.getAccessToken();
        if (!accessToken) return [];

        try {
            const res = await fetch(
                `https://api.spotify.com/v1/search?type=track&q=${term}`,
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            );

            const json = await res.json();
            if (!json.tracks) {
                toast.error("No tracks found.");
                return [];
            }

            return json.tracks.items.map((track: any) => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                duration: track.duration_ms,
                albumArt: track.album.images[0]?.url,
                uri: track.uri,
            }));
        } catch (err) {
            toast.error("Error fetching songs.");
            console.error(err);
            return [];
        }
    },

    async savePlaylist(name: string, trackUris: string[]) {
        if (!name || !trackUris?.length) {
            toast.error("Playlist name or tracks missing!");
            return;
        }

        const aToken = Spotify.getAccessToken();
        if (!aToken) return;

        const headers = { Authorization: `Bearer ${aToken}`, "Content-Type": "application/json" };

        try {
            const meResponse = await fetch("https://api.spotify.com/v1/me", { headers });
            const userData = await meResponse.json();

            const createPlaylistResponse = await fetch(
                `https://api.spotify.com/v1/users/${userData.id}/playlists`,
                {
                    method: "POST",
                    headers,
                    body: JSON.stringify({ name }),
                }
            );

            const playlist = await createPlaylistResponse.json();

            await fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
                method: "POST",
                headers,
                body: JSON.stringify({ uris: trackUris }),
            });

            toast.success(`Playlist "${name}" created successfully!`);
        } catch (err) {
            toast.error("Error saving playlist.");
            console.error(err);
        }
    },
};

export { Spotify };
