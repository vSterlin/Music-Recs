import { error, type RequestHandler } from "@sveltejs/kit"
import SpotifyService from "../../../services/spotify/SpotifyService"

import { SpotifyTrackNotFoundError } from "../../../services/spotify/SpotifyServiceError"

export const GET: RequestHandler = async (req) => {
	const search = req.url.searchParams.get("search")

	if (!search) {
		throw error(400, "Missing search parameter")
	}

	const spotifyService = new SpotifyService("")

	try {
		const track = await spotifyService.findTrackByName(search)

		console.log(track)
		return new Response(JSON.stringify(track))
	} catch (err) {
		if (err instanceof SpotifyTrackNotFoundError) {
			throw error(404, "Track not found")
		}
	}

	return new Response()
}
