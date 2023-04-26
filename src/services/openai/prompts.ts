type Track = {
	name: string
	artists: string[]
}
const recommendTrackPrompt = (track: Track) => {
	return `Recommend a song similar to ${track.name} by ${track.artists[0]}.`
}

const trackQualitiesPrompt = (track: Track) => {
	return `
    I will present you with a song and artist it is by. You will return me a JSON object with the following properties: genres, instruments, moods, themes. 
    All of these properties are arrays of strings.

    Output only JSON. Do not include any other text in your response. 
    Example: { "genres": ["rock", "metal"], "instruments": ["guitar", "drums"], "moods": ["happy", "sad"], "themes": ["love", "hate"] }

    Song: ${track.name}
    Artist: ${track.artists[0]}
  `
}

export { recommendTrackPrompt, trackQualitiesPrompt }
