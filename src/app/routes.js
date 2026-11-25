import { index, layout, route } from "@react-router/dev/routes";

const routes = [
    layout("./layouts/protected.layout.jsx", [
        index("./routes/drive/home.jsx"),
        route("folder/:folderId", "./routes/drive/folder.jsx"),
        route("trash", "./routes/drive/trash.jsx"),
    ]),
    layout("./layouts/auth.layout.jsx", [
        route("login", "./routes/auth/login.jsx"),
        route("signup", "./routes/auth/signup.jsx"),
    ]),
];

export default routes;
