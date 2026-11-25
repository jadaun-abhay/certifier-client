import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "@/shared/components/Modal";
import { FolderIcon, FileIcon, ChevronRightIcon } from "@/shared/components/icons";
import { listFolders, listFiles } from "@/features/drive/api/drive.api";
import { extractErrorMessage, formatBytes } from "@/shared/utils/format";

export default function FilePicker({ title, onClose, onSelect, accepts }) {
    const [trail, setTrail] = useState([{ id: null, name: "My Drive" }]);
    const [folders, setFolders] = useState([]);
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);

    const current = trail[trail.length - 1];

    useEffect(() => {
        let cancelled = false;
        // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional fetch-on-navigate
        setLoading(true);
        Promise.all([listFolders(current.id), listFiles(current.id)])
            .then(([folderList, fileList]) => {
                if (cancelled) return;
                setFolders(folderList);
                setFiles(fileList);
            })
            .catch((error) => toast.error(extractErrorMessage(error, "Couldn't load files")))
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, [current.id]);

    const matches = (file) =>
        !accepts || accepts.some((token) => file.content_type?.includes(token) || file.name.toLowerCase().endsWith(token));

    return (
        <Modal title={title} onClose={onClose}>
            <div className="mb-3 flex flex-wrap items-center gap-1 text-sm text-gray-300">
                {trail.map((crumb, index) => (
                    <span key={crumb.id ?? "root"} className="flex items-center gap-1">
                        <button
                            type="button"
                            className="rounded px-1 hover:bg-white/10 hover:text-white"
                            onClick={() => setTrail(trail.slice(0, index + 1))}
                        >
                            {crumb.name}
                        </button>
                        {index < trail.length - 1 && (
                            <ChevronRightIcon width={14} height={14} />
                        )}
                    </span>
                ))}
            </div>

            <div className="h-72 overflow-y-auto rounded-lg bg-[#3c364c]">
                {loading && <p className="p-4 text-sm text-gray-400">Loading...</p>}
                {!loading && folders.length === 0 && files.length === 0 && (
                    <p className="p-4 text-sm text-gray-400">Nothing here.</p>
                )}
                {!loading &&
                    folders.map((folder) => (
                        <button
                            key={`folder-${folder.id}`}
                            type="button"
                            className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-white/10"
                            onClick={() =>
                                setTrail([...trail, { id: folder.id, name: folder.name }])
                            }
                        >
                            <FolderIcon width={16} height={16} className="text-[#a47ce5]" />
                            {folder.name}
                        </button>
                    ))}
                {!loading &&
                    files.map((file) => {
                        const disabled = !matches(file);
                        return (
                            <button
                                key={`file-${file.id}`}
                                type="button"
                                disabled={disabled}
                                onClick={() => {
                                    onSelect(file);
                                    onClose();
                                }}
                                className={`flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm ${
                                    disabled
                                        ? "cursor-not-allowed opacity-30"
                                        : "hover:bg-white/10"
                                }`}
                            >
                                <span className="flex items-center gap-2 truncate">
                                    <FileIcon width={16} height={16} className="text-gray-300" />
                                    {file.name}
                                </span>
                                <span className="shrink-0 text-xs text-gray-400">
                                    {formatBytes(file.size)}
                                </span>
                            </button>
                        );
                    })}
            </div>

            <div className="mt-4 flex justify-end">
                <button
                    type="button"
                    onClick={onClose}
                    className="rounded-lg px-4 py-2 text-sm text-gray-300 hover:bg-white/10"
                >
                    Cancel
                </button>
            </div>
        </Modal>
    );
}
