import { User } from "@/types/auth";
import { API_URL } from "@/constants/api.constant";
import { TableQueries } from "@/types/common";
import { apiServices } from "@/services/apiServices";

export const fetchUserList = async ({
	query,
	pageIndex,
	pageSize,
}: TableQueries): Promise<User[] | undefined> => {
	try {
		const response = await apiServices(`${API_URL}/users/index`, {
			method: "POST",
			body: JSON.stringify({
				query: query || "",
				pageIndex,
				pageSize,
			}),
		});

		const jsonData = await response.data;

		return jsonData as User[];
	} catch (err: any) {
		throw new Error(`Error fetching data: ${err.message}`);
	}
};
