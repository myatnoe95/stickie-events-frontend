import React from "react";
import { Table } from "antd";
import { EventData } from "@/types/event";
import columns from "./columns";

interface EventListProps {
	data: EventData[];
}

const EventList = ({ data }: EventListProps) => (
	<Table rowKey="id" columns={columns} dataSource={data} />
);

export default EventList;
