import { useRef } from "react";
import { PlusIcon, UploadIcon } from "@/shared/components/icons";

export default function Toolbar({ onNewFolder, onUploadFiles, uploading }) {
    const fileInputRef = useRef(null);

    return (
        <div className="flex items-center gap-3">
            <button
                type="button"
                onClick={onNewFolder}
                className="flex items-center gap-2 rounded-lg bg-[#6d54b5] px-4 py-2 text-sm font-medium text-white hover:bg-[#a47ce5] transition active:scale-95"
            >
                <PlusIcon width={16} height={16} />
                New folder
            </button>
            <button
                type="button"
                disabled={uploading}
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 rounded-lg bg-[#3c364c] px-4 py-2 text-sm font-medium text-white hover:bg-[#4a4360] transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
                <UploadIcon width={16} height={16} />
                {uploading ? "Uploading..." : "Upload"}
            </button>
            <input
                ref={fileInputRef}
                type="file"
                multiple
                hidden
                onChange={(e) => {
                    const files = Array.from(e.target.files ?? []);
                    if (files.length) onUploadFiles(files);
                    e.target.value = "";
                }}
            />
        </div>
    );
}
