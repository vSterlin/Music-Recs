class SpotifyServiceError extends Error {
	constructor(message: string) {
		super(message)
	}
}

class SpotifyArtistNotFoundError extends SpotifyServiceError {
	constructor() {
		super("Artist not found")
	}
}

class SpotifyTrackNotFoundError extends SpotifyServiceError {
	constructor() {
		super("Track not found")
	}
}

export { SpotifyArtistNotFoundError, SpotifyServiceError, SpotifyTrackNotFoundError }
