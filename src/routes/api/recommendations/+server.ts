import OpenAiService from "$lib/services/openai/OpenAiService";
import SpotifyService from "$lib/services/spotify/SpotifyService";
import { extractSearchParamsFromRequest } from "$lib/utils/server/extract-search-params-from-request";
import handleServerError from "$lib/utils/server/handle-server-error";
import sendResponse from "$lib/utils/server/send-server-response";
import type { RequestHandler } from "@sveltejs/kit";
import { z } from "zod";

const stringToArraySchema = z.string().transform((value) => value.split(","));

const searchParamsSchema = z.object({
	songId: z.string(),
	themes: stringToArraySchema,
	moods: stringToArraySchema,
	genres: stringToArraySchema,
	instruments: stringToArraySchema
});

export const GET: RequestHandler = async (req) => {
	try {
		const searchParams = searchParamsSchema.parse(extractSearchParamsFromRequest(req));

		const { songId } = searchParams;

		const spotifyService = new SpotifyService("");
		const openAiService = new OpenAiService();

		const track = await spotifyService.findTrackById(songId);

		const recommendations = await openAiService.getTrackRecommendations({
			name: track.name,
			artists: track.artists.map((artist) => artist.name),
			themes: searchParams.themes,
			moods: searchParams.moods,
			genres: searchParams.genres,
			instruments: searchParams.instruments,

			amount: 10,
			hasToBeByArtist: "different"
		});

		return sendResponse(recommendations);
	} catch (err) {
		console.log(err);
		return handleServerError(err);
	}
};
