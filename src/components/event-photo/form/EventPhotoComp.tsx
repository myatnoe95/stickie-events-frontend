import React, { useState } from "react";
import { Form, Select, Button, Upload } from "antd";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { API_IMAGE_URL } from "@/constants/api.constant";
import { convertImageToBase64 } from "@/utils/fileUtils";
import { UploadOutlined } from "@ant-design/icons";

import { fetchEventList } from "@/services/eventApi";

const { Option } = Select;

interface EventPhotoCompProps {
	onFinish?: (values: any) => void;
	isPreview?: boolean;
	form: any;
}

const EventPhotoComp = ({ onFinish, form, isPreview }: EventPhotoCompProps) => {
	const [fileList, setFileList] = useState([]);
	const photo_url = form.getFieldValue("photo_url");

	const {
		data: eventListData,
		error: eventError,
		isLoading: eventLoading,
	} = useQuery({
		queryKey: ["events"],
		queryFn: () => fetchEventList({ query: "", pageIndex: 0, pageSize: 10 }),
		staleTime: Infinity,
	});

	const handleChange = ({ fileList: newFileList }) => {
		setFileList(newFileList);
	};

	const handleFileConversion = async (file: any) => {
		try {
			const base64 = await convertImageToBase64(file);
		} catch (error) {
			console.error("Error converting file to base64:", error);
		}
	};

	const validateFileList = (_, value: any) => {
		if (!value || value.length === 0) {
			return Promise.reject("Please upload a photo!");
		}
		return Promise.resolve();
	};

	return (
		<Form
			form={form}
			layout="vertical"
			onFinish={onFinish}
			className="mt-4"
			disabled={isPreview}
		>
			<Form.Item
				name="event_id"
				label="Event"
				rules={[{ required: true, message: "Please select an event!" }]}
			>
				<Select placeholder="Select an event">
					{eventListData?.map((event) => (
						<Option key={event.id} value={event.id}>
							{event.event_name}
						</Option>
					))}
				</Select>
			</Form.Item>

			{isPreview ? (
				<>
					<span className="block mt-2 font-bold text-sm">
						Uploaded Event Photo
					</span>
					<Image
						src={`${API_IMAGE_URL}/${photo_url}`}
						alt="Event Photo"
						className="p-2"
						width={300}
						height={200}
					/>
				</>
			) : (
				<Form.Item
					name="photo_url"
					label="Upload Photo"
					valuePropName="fileList"
					getValueFromEvent={(e) => e.fileList}
					rules={[{ validator: validateFileList }]}
				>
					<Upload
						multiple
						listType="picture"
						accept=".jpg,.jpeg,.png"
						fileList={fileList}
						beforeUpload={async (file) => {
							await handleFileConversion(file);
							return false;
						}}
						onChange={handleChange}
					>
						<Button icon={<UploadOutlined />}>Upload</Button>
					</Upload>
				</Form.Item>
			)}

			{!isPreview && (
				<Form.Item>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			)}
		</Form>
	);
};

export default EventPhotoComp;
