import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import toast from "react-hot-toast";
import { getTemplate, previewTemplate } from "@/features/handler/api/handler.api";
import { getFile } from "@/features/drive/api/drive.api";
import { resolveFileUrl, extractErrorMessage } from "@/shared/utils/format";
import { PlayIcon, ZapIcon } from "@/shared/components/icons";

export default function TemplateDetailPage() {
    const { templateId } = useParams();
    const [template, setTemplate] = useState(null);
    const [backgroundUrl, setBackgroundUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sampleRow, setSampleRow] = useState({});
    const [previewUrl, setPreviewUrl] = useState(null);
    const [previewing, setPreviewing] = useState(false);

    useEffect(() => {
        let cancelled = false;
        async function load() {
            try {
                const data = await getTemplate(templateId);
                if (cancelled) return;
                setTemplate(data);
                setSampleRow(
                    Object.fromEntries(data.fields_data.map((f) => [f.field_name, ""])),
                );

                try {
                    const file = await getFile(data.file);
                    if (!cancelled) setBackgroundUrl(resolveFileUrl(file.file));
                } catch {
                    if (!cancelled) {
                        toast.error("This template's background image is no longer available");
                    }
                }
            } catch (error) {
                toast.error(extractErrorMessage(error, "Couldn't load template"));
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        load();
        return () => {
            cancelled = true;
        };
    }, [templateId]);

    const handlePreview = async (e) => {
        e.preventDefault();
        setPreviewing(true);
        try {
            setPreviewUrl(await previewTemplate(templateId, sampleRow));
        } catch (error) {
            toast.error(extractErrorMessage(error, "Preview failed"));
        } finally {
            setPreviewing(false);
        }
    };

    if (loading) return <p className="text-gray-400">Loading...</p>;
    if (!template) return null;

    return (
        <div className="max-w-4xl">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-lg font-semibold text-white">{template.name}</h1>
                <Link
                    to={`/jobs/new?template=${template.id}`}
                    className="flex items-center gap-2 rounded-lg bg-[#6d54b5] px-4 py-2 text-sm font-medium text-white hover:bg-[#a47ce5] transition active:scale-95"
                >
                    <ZapIcon width={16} height={16} />
                    Generate certificates
                </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="relative inline-block">
                    {backgroundUrl ? (
                        <img
                            src={backgroundUrl}
                            alt={template.name}
                            className="block max-w-full rounded-lg"
                        />
                    ) : (
                        <div className="flex h-48 w-full max-w-sm items-center justify-center rounded-lg border border-dashed border-white/10 text-sm text-gray-400">
                            Background image unavailable
                        </div>
                    )}
                </div>

                <div>
                    <h2 className="mb-2 text-sm font-semibold text-white">
                        Preview a sample row
                    </h2>
                    <form onSubmit={handlePreview} className="flex flex-col gap-2">
                        {template.fields_data.map((field) => (
                            <input
                                key={field.id}
                                type="text"
                                value={sampleRow[field.field_name] ?? ""}
                                onChange={(e) =>
                                    setSampleRow((prev) => ({
                                        ...prev,
                                        [field.field_name]: e.target.value,
                                    }))
                                }
                                placeholder={field.field_name}
                                className="rounded-lg bg-[#3c364c] p-2 text-sm text-white focus:outline-none"
                            />
                        ))}
                        <button
                            type="submit"
                            disabled={previewing}
                            className="mt-2 flex w-fit items-center gap-2 rounded-lg bg-[#3c364c] px-4 py-2 text-sm text-white hover:bg-[#4a4360] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <PlayIcon width={14} height={14} />
                            {previewing ? "Rendering..." : "Render preview"}
                        </button>
                    </form>

                    {previewUrl && (
                        <img
                            src={previewUrl}
                            alt="Rendered preview"
                            className="mt-4 max-w-full rounded-lg border border-white/10"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
