import type { TableProps } from "antd";
import { EventData } from "@/types/event";
import ActionColumns from "./ActionColumns";

const columns: TableProps<EventData>["columns"] = [
	{
		title: "No.",
		render: (_, __, index) => <span>{index + 1}</span>,
	},
	{
		title: "Event Name",
		dataIndex: "event_name",
		key: "event_name",
		render: (text) => <a>{text}</a>,
	},
	{
		title: "Description",
		dataIndex: "description",
		key: "description",
	},
	{
		title: "Date",
		dataIndex: "date",
		key: "date",
	},
	{
		title: "Time",
		dataIndex: "time",
		key: "time",
	},
	{
		title: "Location",
		dataIndex: "location",
		key: "location",
	},
	{
		title: "Action",
		key: "action",
		render: (_, record) => <ActionColumns row={record} />,
	},
];

export default columns;
