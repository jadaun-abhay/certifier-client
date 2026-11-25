import { getFolder } from "../api/drive.api";

export async function buildBreadcrumbTrail(folderId) {
    const trail = [];
    let currentId = folderId;
    while (currentId) {
        const folder = await getFolder(currentId);
        trail.unshift(folder);
        currentId = folder.parent;
    }
    return trail;
}
