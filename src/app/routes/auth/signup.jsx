import { redirect } from "react-router";
import toast from "react-hot-toast";
import { registerUser } from "../../../features/auth/api/auth.api";
import SignupForm from "../../../features/auth/components/signup-form";

// eslint-disable-next-line react-refresh/only-export-components
export const clientAction = async ({ request }) => {
    const formData = await request.formData();

    try {
        await toast.promise(
            registerUser({
                email: formData.get("email"),
                password: formData.get("password"),
                first_name: formData.get("first_name") ?? "",
                last_name: formData.get("last_name") ?? "",
            }),
            {
                loading: "Creating your account...",
                success: "Account created!",
                error: (error) =>
                    error?.response?.data?.detail ?? "Couldn't create account",
            },
        );
    } catch {
        return null;
    }
    return redirect("/");
};

const Signup = () => {
    return (
        <div className="max-w-3xl max-h-3/5 p-4 rounded-xl bg-[#2c2638] shadow-xl flex">
            <div className="w-1/2 hidden sm:block">
                <img src="/dune.jpeg" alt="Dune" className="h-full rounded-xl" />
            </div>
            <SignupForm />
        </div>
    );
};

export default Signup;
