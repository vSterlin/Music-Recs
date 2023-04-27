const cleanResponse = (response: string) => {
	const startIndex = response.indexOf("[");
	const endIndex = response.lastIndexOf("]");
	const json = response.slice(startIndex, endIndex + 1);
	return JSON.parse(json);
};

export { cleanResponse };
