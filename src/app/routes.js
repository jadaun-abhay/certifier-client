import { index, layout, route } from "@react-router/dev/routes";

const routes = [
    layout("./layouts/protected.layout.jsx", [
        index("./routes/drive/home.jsx"),
        route("folder/:folderId", "./routes/drive/folder.jsx"),
        route("trash", "./routes/drive/trash.jsx"),
        route("templates", "./routes/handler/templates.jsx"),
        route("templates/new", "./routes/handler/template-new.jsx"),
        route("templates/:templateId", "./routes/handler/template-detail.jsx"),
        route("jobs", "./routes/handler/jobs.jsx"),
        route("jobs/new", "./routes/handler/job-new.jsx"),
        route("jobs/:jobId", "./routes/handler/job-detail.jsx"),
        route("fonts", "./routes/handler/fonts.jsx"),
    ]),
    layout("./layouts/auth.layout.jsx", [
        route("login", "./routes/auth/login.jsx"),
        route("signup", "./routes/auth/signup.jsx"),
    ]),
];

export default routes;
