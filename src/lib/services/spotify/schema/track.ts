import { z } from "zod";

const ArtistSchema = z.object({
	id: z.string(),
	name: z.string()
});

const AlbumSchema = z.object({
	id: z.string(),
	name: z.string(),
	images: z.array(
		z.object({
			height: z.number(),
			url: z.string(),
			width: z.number()
		})
	)
});

const SpotifyTrackSchema = z.object({
	id: z.string(),
	name: z.string(),
	artists: z.array(ArtistSchema),
	album: AlbumSchema
});

type SpotifyTrack = z.infer<typeof SpotifyTrackSchema>;

export type { SpotifyTrack };
export default SpotifyTrackSchema;
