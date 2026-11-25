import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    listTrash,
    restoreTrashItem,
    deleteTrashItemPermanently,
} from "@/features/drive/api/drive.api";
import { extractErrorMessage } from "@/shared/utils/format";
import { FolderIcon, FileIcon, RestoreIcon, TrashIcon } from "@/shared/components/icons";

export default function TrashPage() {
    const [folders, setFolders] = useState([]);
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);

    const load = useCallback(async () => {
        setLoading(true);
        try {
            const data = await listTrash();
            setFolders(data.folders);
            setFiles(data.files);
        } catch (error) {
            toast.error(extractErrorMessage(error, "Couldn't load trash"));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional fetch-on-mount
        load();
    }, [load]);

    const items = [
        ...folders.map((f) => ({ ...f, kind: "folder" })),
        ...files.map((f) => ({ ...f, kind: "file" })),
    ];

    const handleRestore = async (item) => {
        try {
            await restoreTrashItem(item.kind, item.id);
            toast.success("Restored");
            load();
        } catch (error) {
            toast.error(extractErrorMessage(error, "Restore failed"));
        }
    };

    const handleDeleteForever = async (item) => {
        if (!window.confirm(`Permanently delete "${item.name}"? This can't be undone.`))
            return;
        try {
            await deleteTrashItemPermanently(item.kind, item.id);
            toast.success("Deleted permanently");
            load();
        } catch (error) {
            toast.error(extractErrorMessage(error, "Delete failed"));
        }
    };

    return (
        <div>
            <h1 className="mb-6 text-lg font-semibold text-white">Trash</h1>

            {loading && <p className="text-gray-400">Loading...</p>}

            {!loading && items.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 py-24 text-gray-400">
                    <TrashIcon width={40} height={40} />
                    <p className="mt-3">Trash is empty</p>
                </div>
            )}

            {!loading && items.length > 0 && (
                <div className="flex flex-col gap-2">
                    {items.map((item) => (
                        <div
                            key={`${item.kind}-${item.id}`}
                            className="flex items-center justify-between rounded-xl bg-[#2c2638] px-4 py-3"
                        >
                            <div className="flex items-center gap-3 text-white">
                                {item.kind === "folder" ? (
                                    <FolderIcon width={20} height={20} className="text-[#a47ce5]" />
                                ) : (
                                    <FileIcon width={20} height={20} className="text-gray-300" />
                                )}
                                <span>{item.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => handleRestore(item)}
                                    className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm text-gray-200 hover:bg-white/10"
                                >
                                    <RestoreIcon width={16} height={16} /> Restore
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleDeleteForever(item)}
                                    className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm text-red-400 hover:bg-white/10"
                                >
                                    <TrashIcon width={16} height={16} /> Delete forever
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
