import React from "react";
import { Layout, Menu } from "antd";
import { useRouter } from "next/router";
import {
	PictureTwoTone,
	CalendarOutlined,
	LogoutOutlined,
	UserOutlined,
} from "@ant-design/icons";

const { Sider, Content } = Layout;

const SidebarLayout: React.FC<{
	children: React.ReactNode;
	userRole: "Admin" | "Member";
}> = ({ children, userRole }) => {
	const router = useRouter();

	const publicRoutes = ["/login", "/register"];

	const showSidebar = !publicRoutes.includes(router.pathname);

	const handleLogout = () => {
		localStorage.removeItem("authToken");
		router.push("/login");
	};

	const menuItems = [
		{
			key: "/events",
			label: "Event",
			icon: <CalendarOutlined />,
			onClick: () => router.push("/events"),
		},
		{
			key: "/event-photos",
			label: "Event Photos",
			icon: <PictureTwoTone />,
			onClick: () => router.push("/event-photos"),
		},
		...(userRole === "Admin"
			? [
					{
						key: "/users",
						label: "User List",
						icon: <UserOutlined />,
						onClick: () => router.push("/users"),
					},
			  ]
			: []),
		{
			key: "/logout",
			label: "Logout",
			icon: <LogoutOutlined />,
			onClick: handleLogout,
		},
	];

	return (
		<Layout style={{ minHeight: "100vh" }}>
			{showSidebar && (
				<Sider width={250} className="site-layout-background">
					<div className="logo" />
					<Menu
						mode="inline"
						defaultSelectedKeys={[router.pathname]}
						items={menuItems}
					/>
				</Sider>
			)}

			<Layout>
				<Content style={{ margin: "16px" }}>
					<div
						className="site-layout-background"
						style={{ padding: 24, minHeight: 360 }}
					>
						{children}
					</div>
				</Content>
			</Layout>
		</Layout>
	);
};

export default SidebarLayout;
