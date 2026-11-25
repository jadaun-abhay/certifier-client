export default {
    appDirectory: "./src/app",
    ssr: false,
    // Every route here needs a live auth check (clientLoader/clientMiddleware
    // hitting the API) - there's no static content to prerender, and doing so
    // at build time (with no backend reachable in a CI/build sandbox) is what
    // was breaking `vite build`.
    prerender: false,
};
