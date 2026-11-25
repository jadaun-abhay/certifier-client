import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import mkcert from "vite-plugin-mkcert";

// https://vite.dev/config/
export default defineConfig(({ command, isPreview }) => ({
    // mkcert gives the local dev server a trusted HTTPS cert (needed for the
    // SameSite=None session cookie to stick locally). It has no purpose - and
    // actively breaks React Router's build-time prerender, which spins up a
    // `vite preview` server internally (Vite reports that as command="serve"
    // too, hence the extra isPreview check) and expects it to be plain http -
    // during `vite build`, so it's real-dev-server only.
    plugins: [
        reactRouter(),
        tailwindcss(),
        ...(command === "serve" && !isPreview ? [mkcert()] : []),
    ],
    resolve: {
        alias: {
            "@": path.resolve(import.meta.dirname, "./src"),
        },
    },
}));
