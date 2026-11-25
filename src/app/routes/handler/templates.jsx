import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import { listTemplates } from "@/features/handler/api/handler.api";
import { extractErrorMessage, formatDate } from "@/shared/utils/format";
import { ImageIcon, PlusIcon } from "@/shared/components/icons";

export default function TemplatesPage() {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);

    const load = useCallback(async () => {
        setLoading(true);
        try {
            setTemplates(await listTemplates());
        } catch (error) {
            toast.error(extractErrorMessage(error, "Couldn't load templates"));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional fetch-on-mount
        load();
    }, [load]);

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-lg font-semibold text-white">Certificate templates</h1>
                <Link
                    to="/templates/new"
                    className="flex items-center gap-2 rounded-lg bg-[#6d54b5] px-4 py-2 text-sm font-medium text-white hover:bg-[#a47ce5] transition active:scale-95"
                >
                    <PlusIcon width={16} height={16} />
                    New template
                </Link>
            </div>

            {loading && <p className="text-gray-400">Loading...</p>}

            {!loading && templates.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 py-24 text-gray-400">
                    <ImageIcon width={40} height={40} />
                    <p className="mt-3">No templates yet</p>
                </div>
            )}

            {!loading && templates.length > 0 && (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                    {templates.map((template) => (
                        <Link
                            key={template.id}
                            to={`/templates/${template.id}`}
                            className="block rounded-xl bg-[#2c2638] p-4 shadow transition hover:bg-[#352e45]"
                        >
                            <ImageIcon width={28} height={28} className="text-[#a47ce5]" />
                            <p className="mt-3 truncate text-sm font-medium text-white">
                                {template.name}
                            </p>
                            <p className="mt-1 text-xs text-gray-400">
                                {template.fields_data?.length ?? 0} fields ·{" "}
                                {formatDate(template.created_at)}
                            </p>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
