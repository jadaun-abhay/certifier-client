import { useEffect, useRef, useState } from "react";
import {
    MoreIcon,
    StarIcon,
    TrashIcon,
    DownloadIcon,
    ArrowRightIcon,
} from "@/shared/components/icons";
import { resolveFileUrl } from "@/shared/utils/format";

export default function ItemMenu({ item, onRename, onMove, onToggleStar, onTrash }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (!open) return;
        const handleClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [open]);

    const act = (fn) => (e) => {
        e.preventDefault();
        e.stopPropagation();
        setOpen(false);
        fn();
    };

    return (
        <div className="relative" ref={ref}>
            <button
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setOpen((v) => !v);
                }}
                className="rounded-lg p-1.5 text-gray-300 hover:bg-white/10 hover:text-white"
                aria-label="More options"
            >
                <MoreIcon width={18} height={18} />
            </button>
            {open && (
                <div className="absolute right-0 top-9 z-20 w-44 overflow-hidden rounded-lg bg-[#3c364c] py-1 text-sm text-white shadow-xl">
                    <button
                        type="button"
                        onClick={act(onRename)}
                        className="flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-white/10"
                    >
                        Rename
                    </button>
                    <button
                        type="button"
                        onClick={act(onMove)}
                        className="flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-white/10"
                    >
                        <ArrowRightIcon width={16} height={16} /> Move
                    </button>
                    <button
                        type="button"
                        onClick={act(onToggleStar)}
                        className="flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-white/10"
                    >
                        <StarIcon width={16} height={16} filled={item.is_starred} />
                        {item.is_starred ? "Unstar" : "Star"}
                    </button>
                    {item.kind === "file" && (
                        <a
                            href={resolveFileUrl(item.file)}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-white/10"
                        >
                            <DownloadIcon width={16} height={16} /> Download
                        </a>
                    )}
                    <button
                        type="button"
                        onClick={act(onTrash)}
                        className="flex w-full items-center gap-2 px-3 py-2 text-left text-red-400 hover:bg-white/10"
                    >
                        <TrashIcon width={16} height={16} /> Move to trash
                    </button>
                </div>
            )}
        </div>
    );
}
