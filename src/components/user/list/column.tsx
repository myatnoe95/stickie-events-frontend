import { Space } from "antd";
import type { TableProps } from "antd";
import { User } from "@/types/auth";

const columns: TableProps<User>["columns"] = [
	{
		title: "No.",
		render: (_, __, index) => <span>{index + 1}</span>,
	},
	{
		title: "User Name",
		dataIndex: "user_name",
		key: "user_name",
		render: (text) => <a>{text}</a>,
	},
	{
		title: "Role",
		dataIndex: "role",
		key: "role",
		render: (text) => <a>{text}</a>,
	},
	{
		title: "Action",
		key: "action",
		render: (_, record) => (
			<Space size="middle">
				<a>Invite {record.name}</a>
				<a>Delete</a>
			</Space>
		),
	},
];

export default columns;
