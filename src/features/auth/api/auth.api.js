import apiClient from "@/shared/services/apiClient";
import authEndpoints from "./endpoints";

export const getUserAuthenticationStatus = async (request) => {
    try {
        const response = await apiClient.get(authEndpoints.login, {
            headers: {
                Cookie: request.headers.get("Cookie") ?? "",
            },
        });
        return response.data;
    } catch (error) {
        if (error?.response?.status === 401) return false;
        throw error;
    }
};

export async function authenticateUser(credentials) {
    const response = await apiClient.post(authEndpoints.login, credentials);
    return response.data;
}

export async function registerUser(details) {
    const response = await apiClient.post(authEndpoints.register, details);
    return response.data;
}

export function logout() {
    document.cookie = "sessionid=; max-age=0; path=/";
}
