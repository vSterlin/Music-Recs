import { z } from "zod"

const TrackSchema = z.object({
	name: z.string(),
	artists: z.array(
		z.object({
			id: z.string(),
			name: z.string()
		})
	),
	album: z.object({
		id: z.string(),
		name: z.string()
	})
})

type Track = z.infer<typeof TrackSchema>

export type { Track }
export default TrackSchema
