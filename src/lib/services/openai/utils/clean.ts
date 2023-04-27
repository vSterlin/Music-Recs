const cleanResponse = (response: string) => {
	const startIndex = response.indexOf("[");
	const endIndex = response.lastIndexOf("]");
	const json = response.slice(startIndex, endIndex + 1);
	return JSON.parse(json);
};

const trimPrompt = (prompt: string) => {
	return prompt
		.split("\n")
		.map((s) => s.trim())
		.join("\n");
};

export { cleanResponse, trimPrompt };
