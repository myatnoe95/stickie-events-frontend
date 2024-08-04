import SignInForm from "@/components/auth/SignIn";

const Login = () => {
	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="text-center">
				<h3 className="mb-4 text-3xl uppercase">Sign In Form</h3>
				<SignInForm />
			</div>
		</div>
	);
};

export default Login;
