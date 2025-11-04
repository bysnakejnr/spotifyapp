let accessToken;
const clientID = "3eb0e64711b4468fb3c97b9e9d0d2ab2";
const redirectURI = "http://localhost:3000";
import { toast } from "sonner";

const Spotify = {
    getAccessToken() {
        if (accessToken) return accessToken;

        const tokenInURL = window.location.href.match(/access_token=([^&]*)/);
        const expirtyTime = window.location.href.match(/expires_in=([^&]*)/);

        if(tokenInURL && expirtyTime){

            accessToken = tokenInURL[1];
            const expiresIn = Number(expirtyTime[1]);

            window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
            window.history.pushState("Access Token", null, "/");
            return accessToken;

        }
        const redirect = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        window.location.href = redirect
    },

    search(term: string) {
        accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            method: "GET",
            headers: {Authorization: `Bearer ${accessToken}`},
        })
            .then(res => res.json())
            .then(json => {
                if(!json){
                    console.error("Response Error")
                }
                return json.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    duration: track.duration_ms,
                    albumArt: track.album.images[0].url,
                    uri: track.uri,
                }))
            })
    },

    savePlaylist(name, trackUris) {
        if (!name || !trackUris) return;
        const aToken = Spotify.getAccessToken();
        const headers = {Authorization: `Bearer ${aToken}`};
        let userId;

        return fetch("https://api.spotify.com/v1/me", {headers: headers})
            .then(res => res.json())
            .then(json => {
                userId = json.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${aToken}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({name: name}),
                })
            })
            .then(res => res.json())
            .then(json => {
                const playlistId = json.id;
                return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${aToken}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({uris: trackUris}),
                });
            });
    }
}
export {Spotify};