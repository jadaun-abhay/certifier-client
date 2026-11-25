import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { createTemplate, listFonts } from "@/features/handler/api/handler.api";
import FilePicker from "@/features/handler/components/FilePicker";
import TemplateFieldEditor from "@/features/handler/components/TemplateFieldEditor";
import FieldSettingsList from "@/features/handler/components/FieldSettingsList";
import { resolveFileUrl, extractErrorMessage } from "@/shared/utils/format";
import { ImageIcon } from "@/shared/components/icons";

const IMAGE_ACCEPTS = ["image/", ".png", ".jpg", ".jpeg"];

export default function TemplateNewPage() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [backgroundFile, setBackgroundFile] = useState(null);
    const [pickerOpen, setPickerOpen] = useState(false);
    const [fields, setFields] = useState([]);
    const [fonts, setFonts] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        listFonts()
            .then(setFonts)
            .catch(() => {
                /* font list is optional context here - template creation still works without it */
            });
    }, []);

    const handleAddField = (box) => {
        setFields((prev) => [
            ...prev,
            {
                field_name: `field_${prev.length + 1}`,
                alignment: "center",
                text_color: "#000000",
                font: null,
                ...box,
            },
        ]);
    };

    const handleFieldChange = (index, patch) => {
        setFields((prev) => prev.map((field, i) => (i === index ? { ...field, ...patch } : field)));
    };

    const handleFieldRemove = (index) => {
        setFields((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) return toast.error("Give the template a name");
        if (!backgroundFile) return toast.error("Pick a certificate background image");
        if (fields.length === 0) return toast.error("Add at least one field");
        if (fields.some((f) => !f.field_name.trim()))
            return toast.error("Every field needs a name");

        setSubmitting(true);
        try {
            const template = await createTemplate({
                name: name.trim(),
                file: backgroundFile.id,
                fields,
            });
            toast.success("Template created");
            navigate(`/templates/${template.id}`);
        } catch (error) {
            toast.error(extractErrorMessage(error, "Couldn't create template"));
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl">
            <h1 className="mb-6 text-lg font-semibold text-white">New certificate template</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                    <label className="mb-1 block text-sm text-gray-300">Template name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Course Completion"
                        className="w-full max-w-sm rounded-lg bg-[#3c364c] p-2 text-white focus:outline-none"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm text-gray-300">Background image</label>
                    {!backgroundFile ? (
                        <button
                            type="button"
                            onClick={() => setPickerOpen(true)}
                            className="flex items-center gap-2 rounded-lg bg-[#3c364c] px-4 py-2 text-sm text-white hover:bg-[#4a4360]"
                        >
                            <ImageIcon width={16} height={16} />
                            Choose from Drive
                        </button>
                    ) : (
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-white">{backgroundFile.name}</span>
                            <button
                                type="button"
                                onClick={() => setPickerOpen(true)}
                                className="text-sm text-[#a47ce5] hover:underline"
                            >
                                Change
                            </button>
                        </div>
                    )}
                </div>

                {backgroundFile && (
                    <div>
                        <label className="mb-1 block text-sm text-gray-300">Fields</label>
                        <TemplateFieldEditor
                            imageUrl={resolveFileUrl(backgroundFile.file)}
                            fields={fields}
                            onAddField={handleAddField}
                            onRemoveField={handleFieldRemove}
                        />
                        <div className="mt-4">
                            <FieldSettingsList
                                fields={fields}
                                fonts={fonts}
                                onChange={handleFieldChange}
                                onRemove={handleFieldRemove}
                            />
                        </div>
                    </div>
                )}

                <div>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="rounded-lg bg-[#6d54b5] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#a47ce5] transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {submitting ? "Creating..." : "Create template"}
                    </button>
                </div>
            </form>

            {pickerOpen && (
                <FilePicker
                    title="Choose a background image"
                    accepts={IMAGE_ACCEPTS}
                    onClose={() => setPickerOpen(false)}
                    onSelect={setBackgroundFile}
                />
            )}
        </div>
    );
}
