const driveEndpoints = {
    folder: "/api/drive/v1/folder/",
    folderDetail: (id) => `/api/drive/v1/folder/${id}/`,
    file: "/api/drive/v1/file/",
    fileDetail: (id) => `/api/drive/v1/file/${id}/`,
    trash: "/api/drive/v1/trash/",
    trashItem: (kind, id) => `/api/drive/v1/trash/${kind}/${id}/`,
};

export default driveEndpoints;
