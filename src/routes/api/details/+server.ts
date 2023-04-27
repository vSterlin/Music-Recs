import { error, type RequestHandler } from "@sveltejs/kit";
import SpotifyService from "$lib/services/spotify/SpotifyService";

import OpenAiService from "$lib/services/openai/OpenAiService";
import handleServerError from "$lib/utils/server/handle-server-error";
import sendResponse from "$lib/utils/server/send-server-response";

export const GET: RequestHandler = async (req) => {
	const search = req.url.searchParams.get("search");
	if (!search) {
		throw error(400, "Missing search parameter");
	}

	const spotifyService = new SpotifyService("");
	const openAiService = new OpenAiService();

	try {
		const track = await spotifyService.findTrackByName(search);

		const qualities = await openAiService.getTrackQualities(
			track.name,
			track.artists.map((artist) => artist.name)
		);

		const trackDetails = {
			...track,
			...qualities
		};

		return sendResponse(trackDetails);
	} catch (err) {
		return handleServerError(err);
	}
};
