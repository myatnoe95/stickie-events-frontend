import React from "react";
import { Table } from "antd";
import { User } from "@/types/auth";
import columns from "./column";

interface UserListProps {
	data: User[];
}

const UserList = ({ data }: UserListProps) => (
	<Table rowKey="id" columns={columns} dataSource={data} />
);

export default UserList;
