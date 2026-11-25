import { authenticateUser } from "../api/auth.api";

const useAuth = async ({ credentials }) => {
    const authStatus = await authenticateUser({ credentials });
    return authStatus;
};

export default useAuth;
