import React, { createContext, useContext, useState } from "react";

interface AuthContextType {
	userRole: "Admin" | "Member";
	setUserRole: (role: "Admin" | "Member") => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [userRole, setUserRole] = useState<"Admin" | "Member">("Admin");

	return (
		<AuthContext.Provider value={{ userRole, setUserRole }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
