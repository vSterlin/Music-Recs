import SpotifyWebApi from "spotify-web-api-node";
import { SpotifyArtistNotFoundError } from "./SpotifyServiceError";
import SpotifyTrackSchema, { type SpotifyTrack } from "./schema/track";

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
	private spotifyApi: SpotifyWebApi;

	constructor(accessToken: string) {
		this.spotifyApi = new SpotifyWebApi({
			clientId: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
			clientSecret: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET,
			redirectUri: "http://127.0.0.1:5173/",
			accessToken
		});
	}

	async findTrackByName(name: string): Promise<SpotifyTrack> {
		const trackResult = (await this.spotifyApi.searchTracks(name)).body.tracks?.items[0];

		if (!trackResult) {
			throw new SpotifyArtistNotFoundError();
		}

		const track = SpotifyTrackSchema.parse(trackResult);
		return track;
	}

	async findTrackById(id: string): Promise<SpotifyTrack> {
		const trackResult = (await this.spotifyApi.getTrack(id)).body;

		if (!trackResult) {
			throw new SpotifyArtistNotFoundError();
		}

		const track = SpotifyTrackSchema.parse(trackResult);
		return track;
	}
}

export default SpotifyService;
