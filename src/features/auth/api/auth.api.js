import apiClient from "@/shared/services/apiClient";
import authEndpoints from "./endpoints";

export const getUserAuthenticationStatus = async (request) => {
    const response = await apiClient.get(authEndpoints.login, {
        headers: {
            Cookie: request.headers.get("Cookie") ?? "",
        },
    });
    return response.status == "200";
};
