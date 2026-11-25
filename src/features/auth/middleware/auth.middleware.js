import { redirect } from "react-router";
import { userAuthContext } from "../../../shared/contexts/user.context";
import { getUserAuthenticationStatus } from "../api/auth.api";

export const authMiddleware = async ({ request, context }) => {
    const authStatus = await getUserAuthenticationStatus(request);
    if (!authStatus) {
        return redirect("/login");
    }
    context.set(userAuthContext, authStatus);
};
