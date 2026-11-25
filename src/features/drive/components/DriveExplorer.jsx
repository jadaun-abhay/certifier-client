import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    listFolders,
    listFiles,
    createFolder,
    uploadFile,
    updateFolder,
    updateFile,
    trashFolder,
    trashFile,
} from "../api/drive.api";
import { buildBreadcrumbTrail } from "../utils/breadcrumbs";
import { extractErrorMessage } from "@/shared/utils/format";
import Toolbar from "./Toolbar";
import Breadcrumbs from "./Breadcrumbs";
import ItemCard from "./ItemCard";
import NameDialog from "./NameDialog";
import MoveDialog from "./MoveDialog";
import { FolderIcon } from "@/shared/components/icons";

export default function DriveExplorer({ folderId = null }) {
    const [folders, setFolders] = useState([]);
    const [files, setFiles] = useState([]);
    const [trail, setTrail] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [dialog, setDialog] = useState(null);

    const load = useCallback(async () => {
        setLoading(true);
        try {
            const [folderList, fileList, breadcrumbTrail] = await Promise.all([
                listFolders(folderId),
                listFiles(folderId),
                folderId ? buildBreadcrumbTrail(folderId) : Promise.resolve([]),
            ]);
            setFolders(folderList);
            setFiles(fileList);
            setTrail(breadcrumbTrail);
        } catch (error) {
            toast.error(extractErrorMessage(error, "Couldn't load this folder"));
        } finally {
            setLoading(false);
        }
    }, [folderId]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional fetch-on-param-change
        load();
    }, [load]);

    const items = [
        ...folders.map((f) => ({ ...f, kind: "folder" })),
        ...files.map((f) => ({ ...f, kind: "file" })),
    ];

    const handleNewFolder = async (name) => {
        try {
            await createFolder({ name, parent: folderId });
            toast.success("Folder created");
            load();
        } catch (error) {
            toast.error(extractErrorMessage(error, "Couldn't create folder"));
            throw error;
        }
    };

    const handleUpload = async (fileList) => {
        setUploading(true);
        try {
            await Promise.all(fileList.map((file) => uploadFile({ file, folder: folderId })));
            toast.success(fileList.length > 1 ? "Files uploaded" : "File uploaded");
            load();
        } catch (error) {
            toast.error(extractErrorMessage(error, "Upload failed"));
        } finally {
            setUploading(false);
        }
    };

    const handleRename = async (item, name) => {
        try {
            if (item.kind === "folder") await updateFolder(item.id, { name });
            else await updateFile(item.id, { name });
            toast.success("Renamed");
            load();
        } catch (error) {
            toast.error(extractErrorMessage(error, "Rename failed"));
            throw error;
        }
    };

    const handleMove = async (item, newParentId) => {
        try {
            if (item.kind === "folder") await updateFolder(item.id, { parent: newParentId });
            else await updateFile(item.id, { folder: newParentId });
            toast.success("Moved");
            setDialog(null);
            load();
        } catch (error) {
            toast.error(extractErrorMessage(error, "Move failed"));
        }
    };

    const handleToggleStar = async (item) => {
        try {
            if (item.kind === "folder")
                await updateFolder(item.id, { is_starred: !item.is_starred });
            else await updateFile(item.id, { is_starred: !item.is_starred });
            load();
        } catch (error) {
            toast.error(extractErrorMessage(error, "Couldn't update star"));
        }
    };

    const handleTrash = async (item) => {
        if (!window.confirm(`Move "${item.name}" to trash?`)) return;
        try {
            if (item.kind === "folder") await trashFolder(item.id);
            else await trashFile(item.id);
            toast.success("Moved to trash");
            load();
        } catch (error) {
            toast.error(extractErrorMessage(error, "Couldn't move to trash"));
        }
    };

    return (
        <div>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <Breadcrumbs trail={trail} />
                <Toolbar
                    onNewFolder={() => setDialog({ type: "new-folder" })}
                    onUploadFiles={handleUpload}
                    uploading={uploading}
                />
            </div>

            {loading && <p className="text-gray-400">Loading...</p>}

            {!loading && items.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 py-24 text-gray-400">
                    <FolderIcon width={40} height={40} />
                    <p className="mt-3">This folder is empty</p>
                </div>
            )}

            {!loading && items.length > 0 && (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {items.map((item) => (
                        <ItemCard
                            key={`${item.kind}-${item.id}`}
                            item={item}
                            onRename={() => setDialog({ type: "rename", item })}
                            onMove={() => setDialog({ type: "move", item })}
                            onToggleStar={() => handleToggleStar(item)}
                            onTrash={() => handleTrash(item)}
                        />
                    ))}
                </div>
            )}

            {dialog?.type === "new-folder" && (
                <NameDialog
                    title="New folder"
                    confirmLabel="Create"
                    onClose={() => setDialog(null)}
                    onSubmit={handleNewFolder}
                />
            )}

            {dialog?.type === "rename" && (
                <NameDialog
                    title={`Rename "${dialog.item.name}"`}
                    initialValue={dialog.item.name}
                    confirmLabel="Rename"
                    onClose={() => setDialog(null)}
                    onSubmit={(name) => handleRename(dialog.item, name)}
                />
            )}

            {dialog?.type === "move" && (
                <MoveDialog
                    item={dialog.item}
                    onClose={() => setDialog(null)}
                    onMove={(newParentId) => handleMove(dialog.item, newParentId)}
                />
            )}
        </div>
    );
}
