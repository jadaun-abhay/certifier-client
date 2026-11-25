import { ScrollRestoration, Scripts, Outlet, Links } from "react-router";
import { Toaster } from "react-hot-toast";

// eslint-disable-next-line react-refresh/only-export-components
export const links = () => [{ rel: "icon", href: "/favicon.ico" }];

export const Layout = ({ children }) => {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <Links />
                <title>certifier-client</title>
            </head>
            <body className="h-screen">
                {children}
                <ScrollRestoration />
                <Scripts />
                <Toaster />
            </body>
        </html>
    );
};

const Root = () => {
    return <Outlet />;
};

export default Root;
