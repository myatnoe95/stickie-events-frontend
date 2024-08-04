import React from "react";
import { Table } from "antd";
import { EventPhotoData } from "@/types/event-photos";
import columns from "./column";

interface EventPhotoListProps {
	data: EventPhotoData[];
}

const EventPhotoList = ({ data }: EventPhotoListProps) => (
	<Table rowKey="id" columns={columns} dataSource={data} />
);

export default EventPhotoList;
