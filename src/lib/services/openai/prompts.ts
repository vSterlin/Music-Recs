import { trimPrompt } from "./utils/clean";

const trackParametersPrompt = (trackParams: RecommendTracksParams) => {
	const { name, artists, themes, moods, genres, instruments } = trackParams;

	const paramList = [
		`Song name: ${name}`,
		`Artists: ${artists.join(", ")}`,
		themes.length > 0 && `Themes: ${themes.join(", ")}`,
		moods.length > 0 && `Moods: ${moods.join(", ")}`,
		genres.length > 0 && `Genres: ${genres.join(", ")}`,
		instruments.length > 0 && `Instruments: ${instruments.join(", ")}`
	]
		.filter(Boolean)
		.map((param) => `- ${param}`);

	return `
		Paramaters:
			${paramList.join("\n")}

	`.trim();
};

const recommendTrackPrompt = (trackParams: RecommendTracksParams) => {
	const { artists, hasToBeByArtist, amount } = trackParams;
	const artistsString = artists.join(", ");
	const mustBeBy =
		"- " +
		{
			any: "The recommended songs can be by any artist",
			same: `The recommended songs must be by the artist of the original song, specifically ${artistsString}}`,
			different: `The recommended songs MUST NOT be by the same artist as the original song`
		}[hasToBeByArtist];

	const prompt = `
    You are a music recommender. I will give you a song name, artists, song themes, moods, genres and instruments.
    You will have to return me an array that consists of songs that are similar to the song provided below based on all the provided parameters.

		Please provide a JSON array that consists of objects with the following properties: artist, name.
		Example: ${recommendTrackExample}

		${trackParametersPrompt(trackParams)}

    Output: 
			- An array of recommended songs, each represented as an object with properties "name" (string) and "artist" (string)

		Constrains:
			${mustBeBy}
			- There must be ${amount} songs in the output array
  `;

	return trimPrompt(prompt);
};

const trackQualitiesPrompt = (track: Track) => {
	const prompt = `
    I will present you with a song and artist it is by. You will return me a JSON object with the following properties: genres, instruments, moods, themes. 
    All of these properties are arrays of strings.

    Output only JSON. Do not include any other text in your response. 
    Example: ${trackQualitiesExample}

    Song: ${track.name}
    Artist: ${track.artists[0]}
  `;

	return trimPrompt(prompt);
};

const recommendTrackExample = JSON.stringify([
	{
		name: "song1",
		artist: "artist1"
	},
	{
		name: "song2",
		artist: "artist2"
	}
]);

const trackQualitiesExample = JSON.stringify({
	genres: ["rock", "metal"],
	instruments: ["guitar", "drums"],
	moods: ["happy", "sad"],
	themes: ["love", "hate"]
});

type Track = {
	name: string;
	artists: string[];
};

export type RecommendTracksParams = {
	name: string;
	artists: string[];
	themes: string[];
	moods: string[];
	genres: string[];
	instruments: string[];
	amount: number;
	hasToBeByArtist: "same" | "different" | "any";
};

export { recommendTrackPrompt, trackQualitiesPrompt };
