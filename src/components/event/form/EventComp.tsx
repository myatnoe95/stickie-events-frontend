import { Form, Input, DatePicker, Button, TimePicker } from "antd";
const { TextArea } = Input;

interface EventCompProps {
	onFinish?: (values: any) => void;
	isPreview?: boolean;
	form: any;
}

const EventComp = ({ onFinish, form, isPreview }: EventCompProps) => {
	return (
		<Form
			form={form}
			layout="vertical"
			onFinish={onFinish}
			className="mt-4"
			disabled={isPreview}
		>
			<Form.Item
				name="eventName"
				label="Event Name"
				rules={[{ required: true, message: "Please enter the event name!" }]}
			>
				<Input placeholder="Enter event name" />
			</Form.Item>

			<Form.Item
				name="date"
				label="Date"
				rules={[{ required: true, message: "Please select the event date!" }]}
			>
				<DatePicker style={{ width: "100%" }} />
			</Form.Item>

			<Form.Item
				name="time"
				label="Time"
				rules={[{ required: true, message: "Please select the event time!" }]}
			>
				<TimePicker use12Hours format="h:mm A" style={{ width: "100%" }} />
			</Form.Item>

			<Form.Item
				name="location"
				label="Location"
				rules={[
					{ required: true, message: "Please enter the event location!" },
				]}
			>
				<Input placeholder="Enter event location" />
			</Form.Item>

			<Form.Item name="description" label="Description">
				<TextArea rows={4} placeholder="Enter event description" />
			</Form.Item>

			{!isPreview && (
				<Form.Item>
					<div className="flex justify-end">
						<Button type="primary" htmlType="submit">
							Submit
						</Button>
					</div>
				</Form.Item>
			)}
		</Form>
	);
};

export default EventComp;
