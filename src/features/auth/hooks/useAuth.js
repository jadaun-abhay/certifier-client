import { getUserAuthenticatedStatus } from "../api/auth.api";

const useAuth = async () => {
    const authStatus = await getUserAuthenticatedStatus();
    return authStatus;
};

export default useAuth;
