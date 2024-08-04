import { API_URL } from "@/constants/api.constant";
import { TableQueries } from "@/types/common";
import { apiServices } from "@/services/apiServices";
import { EventPhotoCredential } from "@/types/event-photos";

export const fetchEventPhotoList = async ({
	query,
	pageIndex,
	pageSize,
}: TableQueries): Promise<EventPhotoCredential[] | undefined> => {
	try {
		const response = await apiServices(`${API_URL}/event-photos/index`, {
			method: "POST",
			body: JSON.stringify({
				query: query || "",
				pageIndex,
				pageSize,
			}),
		});

		const jsonData = await response.data;

		return jsonData as EventPhotoCredential[];
	} catch (err: any) {
		throw new Error(`Error fetching data: ${err.message}`);
	}
};

export const createEventPhoto = async (
	data: EventPhotoCredential
): Promise<EventPhotoCredential | undefined> => {
	try {
		const response = await apiServices(`${API_URL}/event-photos`, {
			method: "POST",
			body: JSON.stringify(data),
		});

		const jsonData = await response.data;

		return jsonData as EventPhotoCredential;
	} catch (err: any) {
		throw new Error(`Error creating event: ${err.message}`);
	}
};

export const updateEventPhoto = async (
	data: EventPhotoCredential
): Promise<EventPhotoCredential | undefined> => {
	try {
		const response = await apiServices(`${API_URL}/event-photos/${data.id}`, {
			method: "PUT",
			body: JSON.stringify(data),
		});

		const jsonData = await response.data;

		return jsonData as EventPhotoCredential;
	} catch (err: any) {
		throw new Error(`Error updating event: ${err.message}`);
	}
};

export const getEventPhotosByEventIdUserId = async (
	eventId: number,
	userId: number
): Promise<EventPhotoCredential[] | undefined> => {
	try {
		const url = new URL(`${API_URL}/event-photos`);
		url.searchParams.append("event_id", eventId.toString());
		url.searchParams.append("user_id", userId.toString());

		const response = await apiServices(url.toString(), {
			method: "GET",
		});

		const jsonData = await response.data;

		return jsonData as EventPhotoCredential[];
	} catch (err: any) {
		throw new Error(`Error fetching data: ${err.message}`);
	}
};

export const deleteEventPhoto = async (id: number): Promise<void> => {
	try {
		await apiServices(`${API_URL}/event-photos/${id}`, {
			method: "DELETE",
		});
	} catch (err: any) {
		throw new Error(`Error deleting event: ${err.message}`);
	}
};
