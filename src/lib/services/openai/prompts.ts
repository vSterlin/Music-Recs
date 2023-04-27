const trackParametersPrompt = (trackParams: RecommendTracksParams) => {
	const { name, artists, themes, moods, genres, instruments, hasToBeByArtist } = trackParams;

	const mustBeBy = {
		any: "The songs can be by any artist.",
		same: "The songs must be by the  artist of original song.",
		different: "The recommended songs must not be by the artists of the original song."
	}[hasToBeByArtist];

	// TODO: Add more info about the parameters
	return `
	
		Focus on picking songs that sound the most similar.


 		Song name: ${name}
		Artists: ${artists.join(", ")}
		Themes: ${themes.join(", ")}
		Moods: ${moods.join(", ")}
		Genres: ${genres.join(", ")}
		Instruments: ${instruments.join(", ")}

		${mustBeBy}
	`;
};

const recommendTrackPrompt = (trackParams: RecommendTracksParams) => {
	return `
    You are a music recommender. I will give you a song name, artist, song themes, moods, genres and instruments.
    You will have to return me an array that consits of songs that are similar based on all the provided parameters.

     
		${trackParametersPrompt(trackParams)}

    Output only JSON. Do not include any other text in your response. You will return me a JSON array that consits of objects
    with the following properties: artist, name. 
    Example: ${recommendTrackExample}
  `;
};

const trackQualitiesPrompt = (track: Track) => {
	return `
    I will present you with a song and artist it is by. You will return me a JSON object with the following properties: genres, instruments, moods, themes. 
    All of these properties are arrays of strings.

    Output only JSON. Do not include any other text in your response. 
    Example: ${trackQualitiesExample}

    Song: ${track.name}
    Artist: ${track.artists[0]}
  `;
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
	hasToBeByArtist: "same" | "different" | "any";
};

export { recommendTrackPrompt, trackQualitiesPrompt };
