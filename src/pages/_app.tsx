import React, { useEffect } from "react";
import "@/styles/globals.css";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import SidebarLayout from "@/components/layout/SidebarLayout";

export default function App({ Component, pageProps }: AppProps) {
	const queryClient = new QueryClient();

	return (
		<ConfigProvider>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<MainLayoutWrapper>
						<Component {...pageProps} />
					</MainLayoutWrapper>
				</AuthProvider>
			</QueryClientProvider>
		</ConfigProvider>
	);
}

const MainLayoutWrapper: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { userRole, setUserRole } = useAuth();

	useEffect(() => {
		const storedUserRole = localStorage.getItem("userRole");
		if (storedUserRole) {
			setUserRole(storedUserRole as "Admin" | "Member");
		}
	}, [setUserRole]);

	useEffect(() => {
		if (userRole) {
			localStorage.setItem("userRole", userRole);
		}
	}, [userRole]);

	return <SidebarLayout userRole={userRole}>{children}</SidebarLayout>;
};
