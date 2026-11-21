import { redirect } from "react-router";
import { getUserAuthenticationStatus } from "../../features/auth/api/auth.api";
import { userAuthContext } from "../../shared/contexts/user.context";

const authMiddleware = async ({ request, context }) => {
    const authStatus = await getUserAuthenticationStatus(request);

    if (!authStatus) {
        return redirect("/login");
    }
    context.set(userAuthContext, authStatus);
};

export const middleware = [authMiddleware];

export async function loader() {
    return null;
}
