import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Space, Modal, Form, message } from "antd";
import {
	EditOutlined,
	InfoCircleOutlined,
	DeleteOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useAuth } from "@/context/AuthContext";
import EventComp from "@/components/event/form";
import { updateEvent } from "@/services/eventApi";
import { EventData } from "@/types/event";
import { deleteEvent } from "@/services/eventApi";

interface ActionColumnProps {
	row: EventData;
}

const ActionColumns = ({ row }: ActionColumnProps) => {
	const queryClient = useQueryClient();
	const { userRole } = useAuth();

	const [form] = Form.useForm();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isPreview, setIsPreview] = useState(false);

	const handleViewInfo = () => {
		setIsPreview(true);
		setIsModalOpen(true);
		form.setFieldsValue({
			...row,
			eventName: row.event_name,
			date: dayjs(row.date),
			time: dayjs(row.time, "HH:mm"),
		});
	};

	const handleEdit = () => {
		setIsPreview(false);
		setIsModalOpen(true);
		form.setFieldsValue({
			...row,
			eventName: row.event_name,
			date: dayjs(row.date),
			time: dayjs(row.time, "HH:mm"),
		});
	};

	const mutation = useMutation({
		mutationFn: deleteEvent,
		onSuccess: () => {
			queryClient.invalidateQueries(["events"]);
		},
		onError: (error: any) => {
			console.error("Error deleting event:", error.message);
		},
	});

	const handleDelete = (eventId: number) => {
		if (window.confirm("Are you sure you want to delete this event?")) {
			mutation.mutate(eventId);
		}
	};

	const { mutate: updateEventMutation } = useMutation({
		mutationFn: (updatedEvent: EventData) => updateEvent(updatedEvent),
		onSuccess: () => {
			message.success("Event updated successfully!");
			handleModalClose();
			queryClient.invalidateQueries(["events"]);
		},
		onError: (error: any) => {
			message.error(`Error updating event: ${error.message}`);
		},
	});

	const onFinish = (values: any) => {
		const formattedDate = dayjs(values.date).format("YYYY-MM-DD");
		const formattedTime = dayjs(values.time).format("HH:mm");
		const formattedValues = {
			...values,
			id: row.id,
			event_name: values.eventName,
			date: formattedDate,
			time: formattedTime,
		};
		updateEventMutation(formattedValues);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
		form.resetFields();
	};

	return (
		<>
			<Space size="middle">
				<span className="cursor-pointer" onClick={handleViewInfo}>
					<InfoCircleOutlined />
				</span>
				{userRole === "Admin" && (
					<>
						<span className="cursor-pointer" onClick={handleEdit}>
							<EditOutlined />
						</span>

						<span
							className="cursor-pointer"
							onClick={() => row.id && handleDelete(row.id)}
						>
							<DeleteOutlined />
						</span>
					</>
				)}
			</Space>

			<Modal
				title={isPreview ? "View Event" : "Edit Event"}
				open={isModalOpen}
				onCancel={handleModalClose}
				footer={null}
			>
				<EventComp onFinish={onFinish} form={form} isPreview={isPreview} />
			</Modal>
		</>
	);
};

export default ActionColumns;
