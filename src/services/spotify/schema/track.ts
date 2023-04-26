import { z } from "zod"

const ArtistSchema = z.object({
	id: z.string(),
	name: z.string()
})

const AlbumSchema = z.object({
	id: z.string(),
	name: z.string()
})

const TrackSchema = z.object({
	name: z.string(),
	artists: z.array(ArtistSchema),
	album: AlbumSchema
})

type Track = z.infer<typeof TrackSchema>

export type { Track }
export default TrackSchema
