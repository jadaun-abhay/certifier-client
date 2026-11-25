import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { listFonts, uploadFont } from "@/features/handler/api/handler.api";
import { extractErrorMessage, formatDate } from "@/shared/utils/format";
import { TypeIcon, UploadIcon } from "@/shared/components/icons";

export default function FontsPage() {
    const [fonts, setFonts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    const load = useCallback(async () => {
        setLoading(true);
        try {
            setFonts(await listFonts());
        } catch (error) {
            toast.error(extractErrorMessage(error, "Couldn't load fonts"));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional fetch-on-mount
        load();
    }, [load]);

    const handleUpload = async (e) => {
        e.preventDefault();
        const file = fileInputRef.current?.files?.[0];
        if (!file) return toast.error("Choose a .ttf/.otf font file");
        if (!name.trim()) return toast.error("Give the font a name");

        setUploading(true);
        try {
            await uploadFont({ name: name.trim(), file });
            toast.success("Font uploaded");
            setName("");
            fileInputRef.current.value = "";
            load();
        } catch (error) {
            toast.error(extractErrorMessage(error, "Upload failed"));
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="max-w-2xl">
            <h1 className="mb-6 text-lg font-semibold text-white">Fonts</h1>

            <form
                onSubmit={handleUpload}
                className="mb-6 flex flex-wrap items-center gap-3 rounded-xl bg-[#2c2638] p-4"
            >
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Font name"
                    className="rounded-lg bg-[#3c364c] p-2 text-sm text-white focus:outline-none"
                />
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".ttf,.otf"
                    className="text-sm text-gray-300 file:mr-3 file:rounded-lg file:border-0 file:bg-[#3c364c] file:px-3 file:py-1.5 file:text-sm file:text-white"
                />
                <button
                    type="submit"
                    disabled={uploading}
                    className="flex items-center gap-2 rounded-lg bg-[#6d54b5] px-4 py-2 text-sm font-medium text-white hover:bg-[#a47ce5] transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <UploadIcon width={16} height={16} />
                    {uploading ? "Uploading..." : "Upload"}
                </button>
            </form>

            {loading && <p className="text-gray-400">Loading...</p>}

            {!loading && fonts.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 py-16 text-gray-400">
                    <TypeIcon width={32} height={32} />
                    <p className="mt-3">No fonts uploaded - templates will use the default font</p>
                </div>
            )}

            {!loading && fonts.length > 0 && (
                <div className="flex flex-col gap-2">
                    {fonts.map((font) => (
                        <div
                            key={font.id}
                            className="flex items-center justify-between rounded-xl bg-[#2c2638] px-4 py-3"
                        >
                            <div className="flex items-center gap-3 text-white">
                                <TypeIcon width={18} height={18} className="text-[#a47ce5]" />
                                <span>{font.name}</span>
                            </div>
                            <span className="text-xs text-gray-400">
                                {formatDate(font.created_at)}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
