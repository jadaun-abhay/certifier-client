import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "@/shared/components/Modal";
import { FolderIcon, ChevronRightIcon } from "@/shared/components/icons";
import { listFolders } from "../api/drive.api";
import { extractErrorMessage } from "@/shared/utils/format";

export default function MoveDialog({ item, onClose, onMove }) {
    const [trail, setTrail] = useState([{ id: null, name: "My Drive" }]);
    const [folders, setFolders] = useState([]);
    const [loading, setLoading] = useState(true);

    const current = trail[trail.length - 1];

    useEffect(() => {
        let cancelled = false;
        // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional fetch-on-navigate
        setLoading(true);
        listFolders(current.id)
            .then((data) => {
                if (!cancelled) setFolders(data);
            })
            .catch((error) => toast.error(extractErrorMessage(error, "Couldn't load folders")))
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, [current.id]);

    const sameLocation =
        current.id === item.parent || (current.id === null && item.parent === null);
    const isMovingIntoSelf = item.kind === "folder" && current.id === item.id;

    return (
        <Modal title={`Move "${item.name}"`} onClose={onClose}>
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

            <div className="h-56 overflow-y-auto rounded-lg bg-[#3c364c]">
                {loading && (
                    <p className="p-4 text-sm text-gray-400">Loading...</p>
                )}
                {!loading && folders.length === 0 && (
                    <p className="p-4 text-sm text-gray-400">No sub-folders here.</p>
                )}
                {!loading &&
                    folders
                        .filter((folder) => !(item.kind === "folder" && folder.id === item.id))
                        .map((folder) => (
                            <button
                                key={folder.id}
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
            </div>

            <div className="mt-4 flex justify-end gap-2">
                <button
                    type="button"
                    onClick={onClose}
                    className="rounded-lg px-4 py-2 text-sm text-gray-300 hover:bg-white/10"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    disabled={sameLocation || isMovingIntoSelf}
                    onClick={() => onMove(current.id)}
                    className="rounded-lg bg-[#6d54b5] px-4 py-2 text-sm hover:bg-[#a47ce5] transition disabled:cursor-not-allowed disabled:opacity-40"
                >
                    Move here
                </button>
            </div>
        </Modal>
    );
}
