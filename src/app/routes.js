import { layout, route } from "@react-router/dev/routes";

const routes = [
    layout("./layouts/auth.layout.jsx", [
        route("login", "./routes/auth/login.jsx"),
        route("sigup", "./routes/auth/signup.jsx"),
    ]),
];

export default routes;
