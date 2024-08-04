import React, { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { SearchOutlined, PlusCircleOutlined } from "@ant-design/icons";
import debounce from "lodash/debounce";
import dayjs from "dayjs";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import EventList from "@/components/event/list";
import EventComp from "@/components/event/form";
import { fetchEventList, createEvent } from "@/services/eventApi";
import { TableQueries } from "@/types/common";
import { EventData } from "@/types/event";

const Events = () => {
	const queryClient = useQueryClient();
	const [form] = Form.useForm();
	const debounceFn = debounce(handleDebounce, 1000);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [tableData, setTableData] = useState<TableQueries>({
		query: "",
		pageIndex: 0,
		pageSize: 10,
	});

	const {
		data: eventListData,
		error,
		isLoading,
	} = useQuery({
		queryKey: ["users", tableData],
		queryFn: () => fetchEventList(tableData),
		staleTime: Infinity,
	});

	const createEventMutation = useMutation({
		mutationFn: (credentials: EventData) => createEvent(credentials),
		onSuccess: (data: any) => {
			message.success("Event Create Successfully!");
			form.resetFields();
			queryClient.invalidateQueries(["events"]);
			setDialogOpen(false);
		},
		onError: (error: any) => {
			console.error("Error creating event:", error);
		},
	});

	function handleDebounce(search: string) {
		setTableData((prev) => ({
			...prev,
			query: search,
		}));
	}

	function onSearch(e: React.ChangeEvent<HTMLInputElement>) {
		debounceFn(e.target.value);
	}

	const onFinish = (values: any) => {
		const formattedDate = dayjs(values.date).format("YYYY-MM-DD");
		const formattedTime = dayjs(values.time).format("HH:mm");
		const payload = {
			event_name: values.eventName,
			description: values.description,
			date: formattedDate,
			time: formattedTime,
			location: values.location,
		};
		createEventMutation.mutate(payload);
	};

	return (
		<div>
			<div className="flex justify-between mb-5 ">
				<h5 className="font-bold text-lg w-2/3">Events List</h5>

				<Input
					placeholder="Search"
					className="w-1/3 h-10"
					prefix={<SearchOutlined className="text-xl" />}
					onChange={onSearch}
				/>
			</div>

			<div className="flex justify-end mb-5">
				<Button
					icon={<PlusCircleOutlined className="text-xl" />}
					className="w-48	mt-2"
					onClick={() => setDialogOpen(!dialogOpen)}
				>
					Create Event
				</Button>
			</div>

			<Modal
				title="Create Event"
				open={dialogOpen}
				onCancel={() => setDialogOpen(!dialogOpen)}
				footer={null}
			>
				<EventComp form={form} onFinish={onFinish} isPreview={false} />
			</Modal>
			<EventList data={eventListData ?? []} />
		</div>
	);
};

export default Events;
