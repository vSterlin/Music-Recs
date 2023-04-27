import type { RequestEvent } from "@sveltejs/kit";

const extractSearchParamsFromRequest = (req: RequestEvent) => {
	console.log(req.url.searchParams.entries());
	return Object.fromEntries(req.url.searchParams.entries());
};

export { extractSearchParamsFromRequest };
