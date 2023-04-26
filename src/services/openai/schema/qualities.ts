import { z } from "zod"

const toLowerCaseArray = (items: z.ZodArray<z.ZodString>) => {
	return items.transform((items) => items.map((item) => item.toLowerCase()))
}

const lowerCaseArray = toLowerCaseArray(z.array(z.string()))

const QualitiesSchema = z.object({
	instruments: lowerCaseArray,
	genres: lowerCaseArray,
	moods: lowerCaseArray,
	themes: lowerCaseArray
})

type Qualities = z.infer<typeof QualitiesSchema>

export type { Qualities }
export default QualitiesSchema
