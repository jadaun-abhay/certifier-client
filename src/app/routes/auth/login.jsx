import { redirect } from "react-router";
import { authenticateUser } from "../../../features/auth/api/auth.api";
import LoginForm from "../../../features/auth/components/login-form";
import { userAuthContext } from "../../../shared/contexts/user.context";
import toast from "react-hot-toast";

// eslint-disable-next-line react-refresh/only-export-components
export const clientLoader = ({ context }) => {
    const userAuthStatus = context.get(userAuthContext);
    return userAuthStatus;
};

// eslint-disable-next-line react-refresh/only-export-components
export const clientAction = async ({ request }) => {
    const formData = await request.formData();

    try {
        await toast.promise(
            authenticateUser({
                email: formData.get("email"),
                password: formData.get("password"),
            }),
            {
                loading: "Logging in...",
                success: "Welcome back!",
                error: (error) =>
                    error?.response?.data?.detail ?? "Invalid email or password",
            },
        );
    } catch {
        return null;
    }
    return redirect("/");
};

const Login = () => {
    return (
        <div className="max-w-3xl max-h-3/5 p-4 rounded-xl bg-[#2c2638] shadow-xl flex">
            <div className="w-1/2 hidden sm:block">
                <img
                    src="/dune.jpeg"
                    alt="Dune"
                    className="h-full rounded-xl"
                />
            </div>
            <LoginForm />
        </div>
    );
};
export default Login;
