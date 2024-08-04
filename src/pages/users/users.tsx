import React, { useState } from "react";
import { Form, Input } from "antd";
import debounce from "lodash/debounce";
import { SearchOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import UserList from "@/components/user/list";
import { TableQueries } from "@/types/common";
import { fetchUserList } from "@/services/userApi";

const Users = () => {
	const [form] = Form.useForm();
	const debounceFn = debounce(handleDebounce, 1000);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [tableData, setTableData] = useState<TableQueries>({
		query: "",
		pageIndex: 0,
		pageSize: 10,
	});

	const {
		data: userListData,
		error,
		isLoading,
	} = useQuery({
		queryKey: ["users", tableData],
		queryFn: () => fetchUserList(tableData),
		staleTime: Infinity,
	});
	console.log("📝 -> Users -> userListData:", userListData);

	function handleDebounce(search: string) {
		setTableData((prev) => ({
			...prev,
			query: search,
		}));
	}

	function onSearch(e: React.ChangeEvent<HTMLInputElement>) {
		debounceFn(e.target.value);
	}

	return (
		<div>
			<div className="flex justify-between mb-5 ">
				<h5 className="font-bold text-lg w-2/3">Users List</h5>

				<Input
					placeholder="Search"
					className="w-1/3 h-10"
					prefix={<SearchOutlined className="text-xl" />}
					onChange={onSearch}
				/>
			</div>

			<UserList data={userListData ?? []} />
		</div>
	);
};

export default Users;
