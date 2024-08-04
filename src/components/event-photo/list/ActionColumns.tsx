import React, { useState } from "react";
import { Space, message, Form, Modal } from "antd";
import {
	CheckCircleTwoTone,
	CloseCircleTwoTone,
	InfoCircleOutlined,
	DeleteOutlined,
} from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEventPhoto, deleteEventPhoto } from "@/services/photoApi";
import { EventPhotoData } from "@/types/event-photos";
import EventPhotoComp from "@/components/event-photo/form";
import { useAuth } from "@/context/AuthContext";

interface ActionColumnProps {
	row: EventPhotoData;
}

const ActionColumns = ({ row }: ActionColumnProps) => {
	const queryClient = useQueryClient();
	const { userRole } = useAuth();
	const [form] = Form.useForm();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isPreview, setIsPreview] = useState(false);

	const mutation = useMutation({
		mutationFn: (data: EventPhotoData) => updateEventPhoto(data),
		onSuccess: () => {
			message.success("Status Updated Successfully!");
			queryClient.invalidateQueries(["event-photos"]);
		},
		onError: (error: Error) => {
			message.error(`Failed to update status: ${error.message}`);
		},
	});

	const handleStatusUpdate = (status: "Pending" | "Approved" | "Rejected") => {
		mutation.mutate({
			...row,
			status,
		});
	};

	const handleViewInfo = () => {
		setIsPreview(true);
		setIsModalOpen(true);
		form.setFieldsValue({
			...row,
		});
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
		form.resetFields();
	};

	const deleteMutation = useMutation({
		mutationFn: deleteEventPhoto,
		onSuccess: () => {
			queryClient.invalidateQueries(["event-photos"]);
		},
		onError: (error: any) => {
			console.error("Error deleting event:", error.message);
		},
	});

	const handleDelete = (eventPhotoId: number) => {
		if (window.confirm("Are you sure you want to delete this event?")) {
			deleteMutation.mutate(eventPhotoId);
		}
	};

	const isLoading = mutation.status === "pending";

	return (
		<>
			<Space size="middle">
				{userRole === "Admin" ? (
					<>
						<span
							className={`cursor-pointer ${isLoading ? "opacity-50" : ""}`}
							onClick={() => handleStatusUpdate("Approved")}
							style={{ pointerEvents: isLoading ? "none" : "auto" }}
						>
							<CheckCircleTwoTone />
							<span className="pl-2 text-blue-400">Approved</span>
						</span>

						<span
							className={`cursor-pointer ${isLoading ? "opacity-50" : ""}`}
							onClick={() => handleStatusUpdate("Rejected")}
							style={{ pointerEvents: isLoading ? "none" : "auto" }}
						>
							<CloseCircleTwoTone />
							<span className="pl-2 text-red-500">Rejected</span>
						</span>

						<span
							className="cursor-pointer"
							onClick={() => row.id && handleDelete(row.id)}
						>
							<DeleteOutlined />
						</span>
					</>
				) : (
					<span className="cursor-pointer" onClick={handleViewInfo}>
						<InfoCircleOutlined />
					</span>
				)}
			</Space>
			<Modal
				title={isPreview && "View Event Photo"}
				open={isModalOpen}
				onCancel={handleModalClose}
				footer={null}
			>
				<EventPhotoComp form={form} isPreview={isPreview} />
			</Modal>
		</>
	);
};

export default ActionColumns;
