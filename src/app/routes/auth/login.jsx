import LoginForm from "../../../features/auth/components/login-form";
import { userAuthContext } from "../../../shared/contexts/user.context";

// eslint-disable-next-line react-refresh/only-export-components
export const loader = ({ context }) => {
    const userAuthStatus = context.get(userAuthContext);
    return userAuthStatus;
};

const Login = () => {
    return (
        <div className="max-w-4xl min-h-3/5 p-4 rounded-xl bg-[#2c2638] shadow-xl flex">
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
