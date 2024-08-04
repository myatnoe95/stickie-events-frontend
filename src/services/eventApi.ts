import { EventData } from "@/types/event";
import { API_URL } from "@/constants/api.constant";
import { TableQueries } from "@/types/common";
import { apiServices } from "@/services/apiServices";

export const fetchEventList = async ({
	query,
	pageIndex,
	pageSize,
}: TableQueries): Promise<EventData[] | undefined> => {
	try {
		const response = await apiServices(`${API_URL}/events/index`, {
			method: "POST",
			body: JSON.stringify({
				query: query || "",
				pageIndex,
				pageSize,
			}),
		});

		const jsonData = await response.data;

		return jsonData as EventData[];
	} catch (err: any) {
		throw new Error(`Error fetching data: ${err.message}`);
	}
};

export const createEvent = async (
	data: EventData
): Promise<EventData | undefined> => {
	try {
		const response = await apiServices(`${API_URL}/events`, {
			method: "POST",
			body: JSON.stringify(data),
		});

		const jsonData = await response.data;

		return jsonData as EventData;
	} catch (err: any) {
		throw new Error(`Error creating event: ${err.message}`);
	}
};

export const fetchEventById = async (
	id: number
): Promise<EventData | undefined> => {
	try {
		const response = await apiServices(`${API_URL}/events/${id}`, {
			method: "GET",
		});

		const jsonData = await response.data;

		return jsonData as EventData;
	} catch (err: any) {
		throw new Error(`Error fetching data: ${err.message}`);
	}
};

export const updateEvent = async (
	data: EventData
): Promise<EventData | undefined> => {
	try {
		const response = await apiServices(`${API_URL}/events/${data.id}`, {
			method: "PUT",
			body: JSON.stringify(data),
		});

		const jsonData = await response.data;

		return jsonData as EventData;
	} catch (err: any) {
		throw new Error(`Error updating event: ${err.message}`);
	}
};

export const deleteEvent = async (id: number): Promise<boolean> => {
	try {
		const response = await apiServices(`${API_URL}/events/${id}`, {
			method: "DELETE",
		});

		const jsonData = await response.data;

		return jsonData as boolean;
	} catch (err: any) {
		throw new Error(`Error deleting event: ${err.message}`);
	}
};
