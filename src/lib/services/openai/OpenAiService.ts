import { Configuration, OpenAIApi } from "openai";
import { recommendTrackPrompt, trackQualitiesPrompt, type RecommendTracksParams } from "./prompts";
import QualitiesSchema, { type Qualities } from "./schema/qualities";
import { ZodError } from "zod";
import RecommendationsSchema, { type Recommendations } from "./schema/recommendations";
import { ValidationError } from "$lib/utils/server/validation-error";
import { cleanResponse } from "./utils/clean-response";
const configuration = new Configuration({
	apiKey: import.meta.env.VITE_OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

class OpenAiService {
	async getTrackQualities(name: string, artists: string[]): Promise<Qualities> {
		const prompt = trackQualitiesPrompt({
			name,
			artists
		});

		const response = await openai.createCompletion({
			model: "text-davinci-003",
			prompt,
			max_tokens: 100,
			temperature: 0.1
		});

		const qualitiesJson = JSON.parse(response.data.choices[0].text || "{}");

		try {
			const qualities = QualitiesSchema.parse(qualitiesJson);
			return qualities;
		} catch (err) {
			if (err instanceof ZodError) {
				throw new ValidationError();
			} else {
				throw err;
			}
		}
	}

	async getTrackRecommendations(params: RecommendTracksParams): Promise<Recommendations> {
		const prompt = recommendTrackPrompt(params);

		console.log(prompt);

		const response = await openai.createCompletion({
			model: "text-davinci-003",
			prompt,
			max_tokens: 500,
			temperature: 0.1
		});

		const recommendationsJson = cleanResponse(response.data.choices[0].text || "[]");

		try {
			const recommendations = RecommendationsSchema.parse(recommendationsJson);
			return recommendations;
		} catch (err) {
			if (err instanceof ZodError) {
				throw new ValidationError();
			} else {
				throw err;
			}
		}
	}
}

export default OpenAiService;
