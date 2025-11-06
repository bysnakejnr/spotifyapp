🎵 Spotify Playlist Creator

A modern web app that helps you find songs, connect to your Spotify account, and create custom playlists — all in one place.
Built with React + Vite and the Spotify Web API.

🚀 Features

🎧 Spotify Login Integration – Securely connect with your Spotify account using OAuth.

🔍 Search Songs – Instantly search for any artist, track, or album through Spotify’s API.

➕ Build Playlists – Add and remove songs dynamically before saving your playlist.

💾 Save to Spotify – Create and save new playlists directly to your Spotify profile.

⚡ Fast & Responsive – Built with Vite for instant loads and smooth performance across all devices.

🛠️ Tech Stack
Category	Technologies
Frontend	React, Vite, TypeScript (if applicable)
Styling	CSS / TailwindCSS / custom components
API	Spotify Web API
Auth	OAuth 2.0 (Implicit Grant Flow)
Build Tools	Vite + Node.js
🧩 How It Works

Authenticate with Spotify
The app redirects you to Spotify’s login page and retrieves an access token upon approval.

Search Songs or Artists
You can type in keywords and instantly see results powered by the Spotify Web API.

Create Your Playlist
Add or remove songs in real time to curate your custom playlist.

Save to Spotify
When ready, click “Save Playlist” — it’s automatically created in your Spotify account.

🖥️ Getting Started

Clone this repository and install dependencies:

git clone https://github.com/bysnakejnr/spotifyapp.git
cd spotifyapp
npm install
npm run dev


Before running, create a .env file in the root directory and add your Spotify credentials:

VITE_CLIENT_ID=your_spotify_client_id
VITE_REDIRECT_URI=http://localhost:3000


⚠️ Make sure your redirect URI matches the one configured in your Spotify Developer Dashboard
.