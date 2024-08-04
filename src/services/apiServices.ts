export const apiServices = async (
	url: string,
	options: RequestInit = {}
): Promise<any> => {
	const accessToken = localStorage.getItem("token") || "";

	if (accessToken) {
		options.headers = {
			...options.headers,
			Authorization: `Bearer ${accessToken}`,
			"Content-Type": "application/json",
		};
	}

	const response = await fetch(url, options);

	if (response.status === 401 || response.status === 403) {
		throw new Error("Unauthorized or forbidden");
	}

	if (!response.ok) {
		throw new Error(`HTTP error! Status: ${response.status}`);
	}

	return response.json();
};
