const sendResponse = (body: object, status = 200) => {
	return new Response(JSON.stringify(body), {
		status,
		headers: {
			"Content-Type": "application/json"
		}
	});
};

export default sendResponse;
