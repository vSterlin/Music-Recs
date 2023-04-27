import { error } from "@sveltejs/kit";

const send = async (
	url: string,
	method: string,
	body?: object,
	token?: string
): Promise<unknown> => {
	const headers = new Headers();
	if (token) {
		headers.append("Authorization", `Bearer ${token}`);
	}

	const options: RequestInit = {
		method,
		headers
	};

	if (body) {
		headers.append("Content-Type", "application/json");
		options.body = JSON.stringify(body);
	}

	const response = await fetch(url, options);

	if (!response.ok) {
		throw error(response.status);
	}

	const data = await response.json();
	return data;
};

const get = (url: string, token?: string): Promise<unknown> => {
	return send(url, "GET", undefined, token);
};

const post = (url: string, body?: object, token?: string): Promise<unknown> => {
	return send(url, "POST", body, token);
};

const put = (url: string, body?: object, token?: string): Promise<unknown> => {
	return send(url, "PUT", body, token);
};

const del = (url: string, token?: string): Promise<unknown> => {
	return send(url, "DELETE", undefined, token);
};

export { get, post, put, del };
