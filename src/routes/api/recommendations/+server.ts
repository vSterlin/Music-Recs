import { error, type RequestHandler } from "@sveltejs/kit"
import SpotifyService from "../../../services/spotify/SpotifyService"

import { SpotifyTrackNotFoundError } from "../../../services/spotify/SpotifyServiceError"
import OpenAiService from "../../../services/openai/OpenAiService"
import { OpenAiValidationError } from "../../../services/openai/OpenAiError"

export const GET: RequestHandler = async (req) => {
	const search = req.url.searchParams.get("search")

	if (!search) {
		throw error(400, "Missing search parameter")
	}

	const spotifyService = new SpotifyService("")
	const openAiService = new OpenAiService()

	try {
		const track = await spotifyService.findTrackByName(search)

		const qualities = await openAiService.getTrackQualities(
			track.name,
			track.artists.map((artist) => artist.name)
		)

		const trackDetails = {
			...track,
			...qualities
		}

		return new Response(JSON.stringify(trackDetails))
	} catch (err) {
		return handleError(err)
	}
}

const handleError = (err: unknown) => {
	if (err instanceof SpotifyTrackNotFoundError) {
		throw error(404, "Track not found")
	} else if (err instanceof OpenAiValidationError) {
		throw error(400, "OpenAI validation error")
	} else {
		throw error(500, "Internal server error")
	}
}
