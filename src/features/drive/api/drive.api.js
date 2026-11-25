import apiClient from "@/shared/services/apiClient";
import driveEndpoints from "./endpoints";

export async function listFolders(parentId) {
    const response = await apiClient.get(driveEndpoints.folder, {
        params: parentId ? { parent: parentId } : undefined,
    });
    return response.data;
}

export async function listFiles(folderId) {
    const response = await apiClient.get(driveEndpoints.file, {
        params: folderId ? { folder: folderId } : undefined,
    });
    return response.data;
}

export async function getFolder(folderId) {
    const response = await apiClient.get(driveEndpoints.folderDetail(folderId));
    return response.data;
}

export async function getFile(fileId) {
    const response = await apiClient.get(driveEndpoints.fileDetail(fileId));
    return response.data;
}

export async function createFolder({ name, parent }) {
    const response = await apiClient.post(driveEndpoints.folder, {
        name,
        parent: parent ?? null,
    });
    return response.data;
}

export async function uploadFile({ file, folder }) {
    const formData = new FormData();
    formData.append("file", file);
    if (folder) formData.append("folder", folder);
    const response = await apiClient.post(driveEndpoints.file, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
}

export async function updateFolder(id, patch) {
    const response = await apiClient.patch(driveEndpoints.folderDetail(id), patch);
    return response.data;
}

export async function updateFile(id, patch) {
    const response = await apiClient.patch(driveEndpoints.fileDetail(id), patch);
    return response.data;
}

export async function trashFolder(id) {
    await apiClient.delete(driveEndpoints.folderDetail(id));
}

export async function trashFile(id) {
    await apiClient.delete(driveEndpoints.fileDetail(id));
}

export async function listTrash() {
    const response = await apiClient.get(driveEndpoints.trash);
    return response.data;
}

export async function restoreTrashItem(kind, id) {
    const response = await apiClient.patch(driveEndpoints.trashItem(kind, id));
    return response.data;
}

export async function deleteTrashItemPermanently(kind, id) {
    await apiClient.delete(driveEndpoints.trashItem(kind, id));
}
