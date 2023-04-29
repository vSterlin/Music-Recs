const extractAuthHeader = (req: Request): string | undefined => {
	return req.headers.get("authorization")?.split(" ")[1];
};

export { extractAuthHeader };
