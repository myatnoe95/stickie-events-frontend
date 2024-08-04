import React, { useState } from "react";
import { Modal, Form, Input, Select, Button, message } from "antd";
import debounce from "lodash/debounce";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SearchOutlined, PlusCircleOutlined } from "@ant-design/icons";
import EventPhotoList from "@/components/event-photo/list";
import EventPhotoComp from "@/components/event-photo/form";
import { createEventPhoto, fetchEventPhotoList } from "@/services/photoApi";
import { TableQueries } from "@/types/common";
import { EventPhotoCredential } from "@/types/event-photos";

const EventPhotos = () => {
	const queryClient = useQueryClient();
	const [form] = Form.useForm();
	const [fileList, setFileList] = useState([]);

	const debounceFn = debounce(handleDebounce, 1000);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [tableData, setTableData] = useState<TableQueries>({
		query: "",
		pageIndex: 0,
		pageSize: 10,
	});

	const {
		data: eventPhotoListData,
		error: eventError,
		isLoading: eventLoading,
	} = useQuery({
		queryKey: ["event-photos"],
		queryFn: () => fetchEventPhotoList(tableData),
		staleTime: Infinity,
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

	const createEventPhotoMutation = useMutation({
		mutationFn: (credentials: EventPhotoCredential) =>
			createEventPhoto(credentials),
		onSuccess: (data: any) => {
			message.success("Event Create Successfully!");
			form.resetFields();
			queryClient.invalidateQueries(["event-photos"]);
			setDialogOpen(false);
		},
		onError: (error: any) => {
			console.error("Error creating event:", error);
		},
	});

	const onFinish = async (values: any) => {
		const thumbUrls = values.photo_url.map((file: any) => file.thumbUrl);
		const payload = {
			event_id: values.event_id,
			photo_url: thumbUrls,
		};
		createEventPhotoMutation.mutate(payload);
	};

	return (
		<div>
			<div className="flex justify-between mb-5 ">
				<h5 className="font-bold text-lg w-2/3">Event Photos List</h5>

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
					Create Event Photos
				</Button>
			</div>

			<Modal
				title="Create Event Photos"
				open={dialogOpen}
				onCancel={() => setDialogOpen(!dialogOpen)}
				footer={null}
			>
				<EventPhotoComp onFinish={onFinish} form={form} isPreview={false} />
			</Modal>
			<EventPhotoList data={eventPhotoListData ?? []} />
		</div>
	);
};

export default EventPhotos;
