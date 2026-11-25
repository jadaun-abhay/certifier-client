export function formatBytes(bytes) {
    if (!bytes && bytes !== 0) return "";
    if (bytes === 0) return "0 B";
    const units = ["B", "KB", "MB", "GB", "TB"];
    const exponent = Math.min(
        Math.floor(Math.log(bytes) / Math.log(1024)),
        units.length - 1,
    );
    const value = bytes / 1024 ** exponent;
    return `${exponent === 0 ? value : value.toFixed(1)} ${units[exponent]}`;
}

export function formatDate(isoString) {
    if (!isoString) return "";
    return new Date(isoString).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

export function extractErrorMessage(error, fallback = "Something went wrong") {
    return error?.response?.data?.detail ?? fallback;
}

// The backend can return `file` as a relative path (no scheme/host) since it
// doesn't always have a request in the serializer context to build an
// absolute URI. Resolve it against the API origin, not the frontend's own.
export function resolveFileUrl(path) {
    if (!path) return path;
    return new URL(path, import.meta.env.VITE_API_URL).toString();
}
