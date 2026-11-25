import { Link } from "react-router";
import { ChevronRightIcon } from "@/shared/components/icons";

export default function Breadcrumbs({ trail }) {
    return (
        <div className="flex flex-wrap items-center gap-1 text-lg text-gray-300">
            <Link to="/" className="rounded px-1 font-semibold hover:bg-white/10 hover:text-white">
                My Drive
            </Link>
            {trail.map((folder, index) => (
                <span key={folder.id} className="flex items-center gap-1">
                    <ChevronRightIcon width={16} height={16} />
                    {index === trail.length - 1 ? (
                        <span className="px-1 font-semibold text-white">{folder.name}</span>
                    ) : (
                        <Link
                            to={`/folder/${folder.id}`}
                            className="rounded px-1 hover:bg-white/10 hover:text-white"
                        >
                            {folder.name}
                        </Link>
                    )}
                </span>
            ))}
        </div>
    );
}
