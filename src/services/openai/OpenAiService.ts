import { Configuration, OpenAIApi } from "openai"
import { recommendTrackPrompt, trackQualitiesPrompt } from "./prompts"
import QualitiesSchema, { type Qualities } from "./schema/qualities"
import { z, ZodError } from "zod"
import { OpenAiValidationError } from "./OpenAiError"
const configuration = new Configuration({
	apiKey: import.meta.env.VITE_OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)

class OpenAiService {
	async getTrackQualities(name: string, artists: string[]): Promise<Qualities> {
		const prompt = trackQualitiesPrompt({
			name,
			artists
		})

		const response = await openai.createCompletion({
			model: "text-davinci-003",
			prompt,
			max_tokens: 100,
			temperature: 0.1
		})

		const qualitiesJson = JSON.parse(response.data.choices[0].text || "{}")

		try {
			const qualities = QualitiesSchema.parse(qualitiesJson)
			return qualities
		} catch (err) {
			if (err instanceof ZodError) {
				throw new OpenAiValidationError()
			} else {
				throw err
			}
		}
	}
}

export default OpenAiService
