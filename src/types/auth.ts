export type User = {
	id?: number;
	user_name: string;
	role: string;
};

export type SignInCredential = {
	user_name: string;
	password: string;
};

export type SignInResponse = {
	access_token: string;
	user: User;
};

export type SignUpCredential = {
	user_name: string;
	password: string;
	role: "Admin" | "Member";
};

export type SignUpResponse = {
	user: User;
};
