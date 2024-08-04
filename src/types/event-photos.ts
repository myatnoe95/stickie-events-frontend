import { User } from "./auth";
import { EventData } from "./event";

export type EventPhotoData = {
	id?: number;
	user_id?: number;
	user?: User;
	event_id: number;
	event?: EventData;
	photo_url: string;
	status: "Pending" | "Approved" | "Rejected";
};

export type EventPhotoCredential = {
	id?: number;
	user_id?: number;
	event_id: number;
	photo_url: string[];
	status?: "Pending" | "Approved" | "Rejected";
};
