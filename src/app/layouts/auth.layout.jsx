import { Outlet } from "react-router";

function AuthLayout() {
    return (
        <div className="flex justify-center items-center h-full bg-[#686279]">
            <Outlet />
        </div>
    );
}

export default AuthLayout;
