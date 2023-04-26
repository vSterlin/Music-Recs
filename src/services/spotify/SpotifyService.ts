import SpotifyWebApi from "spotify-web-api-node"
import { SpotifyArtistNotFoundError } from "./SpotifyServiceError"
import TrackSchema, { type Track } from "./schema/track"

// class SpotifyAuthService {
// 	private spotifyApi: SpotifyWebApi;

// 	constructor() {
// 		this.spotifyApi = new SpotifyWebApi({
// 			clientId: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
// 			clientSecret: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET,
// 			redirectUri: 'http://127.0.0.1:5173/'
// 		});
// 	}
// }

class SpotifyService {
	private spotifyApi: SpotifyWebApi

	constructor(accessToken: string) {
		this.spotifyApi = new SpotifyWebApi({
			clientId: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
			clientSecret: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET,
			redirectUri: "http://127.0.0.1:5173/",
			accessToken: import.meta.env.VITE_SPOTIFY_ACCESS_TOKEN
		})
	}

	async findTrackByName(name: string): Promise<Track> {
		const trackResult = (await this.spotifyApi.searchTracks(name)).body.tracks?.items[0]

		if (!trackResult) {
			throw new SpotifyArtistNotFoundError()
		}

		const track = TrackSchema.parse(trackResult)

		return track
	}

	// async getTrack(trackId: string) {}
}

export default SpotifyService
