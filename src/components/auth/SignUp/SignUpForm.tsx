import React from "react";
import { Button, Form, Input, Select, message } from "antd";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Link from "next/link";
import { signUp } from "@/services/authApi";
import { SignUpResponse, SignUpCredential } from "@/types/auth";

const SignUpForm = () => {
	const { Option } = Select;
	const router = useRouter();

	const mutation = useMutation({
		mutationFn: (credentials: SignUpCredential) => signUp(credentials),
		onSuccess: (data: SignUpResponse) => {
			message.success("Sign up successful!");
			router.push("/login");
		},
		onError: (error: any) => {
			message.error(`Sign up failed: ${error.message}`);
		},
	});

	const onFinish = (values: any) => {
		mutation.mutate({
			user_name: values.username,
			password: values.password,
			role: values.role,
		});
	};

	return (
		<Form
			name="signUp"
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
				<Input type="password" placeholder="Password" />
			</Form.Item>

			<Form.Item
				name="role"
				rules={[{ required: true, message: "Please select your Role!" }]}
			>
				<Select placeholder="role">
					<Option value="Admin">Admin</Option>
					<Option value="Member">Member</Option>
				</Select>
			</Form.Item>

			<Form.Item>
				<Button block type="primary" htmlType="submit">
					Sign Up
				</Button>
				<div className="text-center mt-2">
					<span className="text-red-300">Already register?</span>
					<Link href="/login"> Go to login Form</Link>
				</div>
			</Form.Item>
		</Form>
	);
};

export default SignUpForm;
