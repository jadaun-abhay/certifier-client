import { Link } from "react-router";
import { FolderIcon, FileIcon, StarIcon } from "@/shared/components/icons";
import { formatBytes, resolveFileUrl } from "@/shared/utils/format";
import ItemMenu from "./ItemMenu";

export default function ItemCard({ item, onRename, onMove, onToggleStar, onTrash }) {
    const isFolder = item.kind === "folder";

    const content = (
        <>
            <div className="flex items-start justify-between">
                <div className={isFolder ? "text-[#a47ce5]" : "text-gray-300"}>
                    {isFolder ? (
                        <FolderIcon width={28} height={28} />
                    ) : (
                        <FileIcon width={28} height={28} />
                    )}
                </div>
                <div className="flex items-center gap-1">
                    {item.is_starred && (
                        <StarIcon
                            width={16}
                            height={16}
                            filled
                            className="text-yellow-400"
                        />
                    )}
                    <ItemMenu
                        item={item}
                        onRename={onRename}
                        onMove={onMove}
                        onToggleStar={onToggleStar}
                        onTrash={onTrash}
                    />
                </div>
            </div>
            <p className="mt-3 truncate text-sm font-medium text-white" title={item.name}>
                {item.name}
            </p>
            {!isFolder && (
                <p className="mt-1 text-xs text-gray-400">{formatBytes(item.size)}</p>
            )}
        </>
    );

    const className =
        "block rounded-xl bg-[#2c2638] p-4 shadow transition hover:bg-[#352e45]";

    if (isFolder) {
        return (
            <Link to={`/folder/${item.id}`} className={className}>
                {content}
            </Link>
        );
    }

    return (
        <a
            href={resolveFileUrl(item.file)}
            target="_blank"
            rel="noreferrer"
            className={className}
        >
            {content}
        </a>
    );
}
