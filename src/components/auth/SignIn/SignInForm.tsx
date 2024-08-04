import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { signIn } from "@/services/authApi";
import { SignInResponse, SignInCredential } from "@/types/auth";

const SignInForm = () => {
	const router = useRouter();
	const { setUserRole } = useAuth();
	const [passwordVisible, setPasswordVisible] = useState(false);

	const togglePasswordVisibility = () => {
		setPasswordVisible(!passwordVisible);
	};

	const mutation = useMutation({
		mutationFn: (credentials: SignInCredential) => signIn(credentials),
		onSuccess: (data: SignInResponse) => {
			localStorage.setItem("token", data.access_token);
			localStorage.setItem("role", data.user.role);
			const role = data.user.role as "Admin" | "Member";
			setUserRole(role);

			message.success("Login successful!");
			router.push("/events");
		},
		onError: (error: any) => {
			message.error("Login failed. Please check your username and password.");
		},
	});

	const onFinish = (values: any) => {
		mutation.mutate({
			user_name: values.username,
			password: values.password,
		});
	};

	return (
		<Form
			name="login"
			initialValues={{ remember: true }}
			style={{ maxWidth: 360, margin: "auto" }}
			onFinish={onFinish}
		>
			<Form.Item
				name="username"
				rules={[{ required: true, message: "Please input your Username!" }]}
			>
				<Input placeholder="Username" />
			</Form.Item>
			<Form.Item
				name="password"
				rules={[{ required: true, message: "Please input your Password!" }]}
			>
				<Input
					type={passwordVisible ? "text" : "password"}
					placeholder="Password"
					suffix={
						<Button
							type="link"
							onClick={togglePasswordVisibility}
							style={{ padding: 0 }}
						>
							{passwordVisible ? "Hide" : "Show"}
						</Button>
					}
				/>
			</Form.Item>

			<Form.Item>
				<Button block type="primary" htmlType="submit">
					Log in
				</Button>
				<div className="text-center mt-2">
					or <Link href="/register"> Register now!</Link>
				</div>
			</Form.Item>
		</Form>
	);
};

export default SignInForm;
