import { Outlet, redirect } from "react-router";
import { getUserAuthenticationStatus } from "../../features/auth/api/auth.api";

// Already-authenticated users shouldn't see the login/signup forms - send
// them straight to the app instead of re-prompting for credentials.
// eslint-disable-next-line react-refresh/only-export-components
export const clientLoader = async ({ request }) => {
    const user = await getUserAuthenticationStatus(request);
    if (user) {
        return redirect("/");
    }
    return null;
};

function AuthLayout() {
    return (
        <div className="flex justify-center items-center h-full bg-[#686279]">
            <Outlet />
        </div>
    );
}

export default AuthLayout;
