import SignUpForm from "@/components/auth/SignUp";

const Register = () => {
	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="text-center">
				<h3 className="mb-4 text-3xl uppercase">Sign Up Form</h3>
				<SignUpForm />
			</div>
		</div>
	);
};

export default Register;
