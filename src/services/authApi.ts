import {
	SignInResponse,
	SignInCredential,
	SignUpResponse,
	SignUpCredential,
} from "@/types/auth";
import { API_URL } from "@/constants/api.constant";
import { apiServices } from "@/services/apiServices";

export const signIn = async (
	credentials: SignInCredential
): Promise<SignInResponse> => {
	try {
		const response = await fetch(`${API_URL}/login`, {
			method: "POST",

			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(credentials),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const jsonData = await response.json();
		return jsonData as SignInResponse;
	} catch (err: any) {
		throw new Error(`Error fetching data: ${err.message}`);
	}
};

export const signUp = async (
	credentials: SignUpCredential
): Promise<SignUpResponse> => {
	try {
		const response = await fetch(`${API_URL}/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(credentials),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const jsonData = await response.json();
		return jsonData;
	} catch (err: any) {
		throw new Error(`Error fetching data: ${err.message}`);
	}
};

export const signOut = async () => {
	try {
		const response = await apiServices(`${API_URL}/logout`, {
			method: "POST",
		});

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const jsonData = await response.json();
		return jsonData;
	} catch (err: any) {
		throw new Error(`Error fetching data: ${err.message}`);
	}
};
