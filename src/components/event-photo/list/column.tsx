import type { TableProps } from "antd";
import Image from "next/image";
import { API_IMAGE_URL } from "@/constants/api.constant";
import { EventPhotoData } from "@/types/event-photos";
import ActionColumns from "./ActionColumns";

const columns: TableProps<EventPhotoData>["columns"] = [
	{
		title: "No.",
		render: (_, __, index) => <span>{index + 1}</span>,
	},
	{
		title: "User Name",
		dataIndex: "user_id",
		key: "event_name",
		render: (_, record) => {
			return <a>{record.user?.user_name}</a>;
		},
	},
	{
		title: "Event Name",
		dataIndex: "event_id",
		key: "event_name",
		render: (_, record) => {
			return <a>{record.event?.event_name}</a>;
		},
	},
	{
		title: "Event Photo",
		dataIndex: "photo_url",
		key: "photo_url",
		render: (text) => (
			<Image
				src={`${API_IMAGE_URL}/${text}`}
				alt="Event Photo"
				width={100}
				height={100}
			/>
		),
	},
	{
		title: "Status",
		dataIndex: "status",
		key: "status",
		render: (text) => (
			<>
				<span
					className={`inline-block w-2 h-2 mr-2 rounded-full ${getStatusColor(
						text
					)}`}
				></span>
				<span>{text}</span>
			</>
		),
	},
	{
		title: "Action",
		key: "action",
		render: (_, record) => <ActionColumns row={record} />,
	},
];

const getStatusColor = (type: string) => {
	switch (type) {
		case "Approved":
			return "bg-green-400 rounded-full";
		case "Pending":
			return "bg-blue-400 rounded-full ";
		case "Rejected":
			return "bg-red-400 rounded-full ";
		default:
			return "";
	}
};

export default columns;
