import { error } from "@sveltejs/kit";

import { OpenAiValidationError } from "$lib/services/openai/OpenAiError";
import { SpotifyTrackNotFoundError } from "$lib/services/spotify/SpotifyServiceError";
import { ValidationError } from "./validation-error";
import { ZodError } from "zod";

const handleServerError = (err: unknown) => {
	if (err instanceof SpotifyTrackNotFoundError) {
		throw error(404, "Track not found");
	} else if (
		err instanceof OpenAiValidationError ||
		err instanceof ValidationError ||
		err instanceof ZodError
	) {
		throw error(400, "Validation error");
	} else {
		throw err;
	}
};

export default handleServerError;
