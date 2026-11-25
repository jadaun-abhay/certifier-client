import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import toast from "react-hot-toast";
import { listTemplates, createJob } from "@/features/handler/api/handler.api";
import FilePicker from "@/features/handler/components/FilePicker";
import { extractErrorMessage } from "@/shared/utils/format";
import { FileIcon } from "@/shared/components/icons";

const DATA_FILE_ACCEPTS = [".csv", ".json", ".xlsx"];

export default function JobNewPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [templates, setTemplates] = useState([]);
    const [templateId, setTemplateId] = useState(searchParams.get("template") ?? "");
    const [purpose, setPurpose] = useState("");
    const [dataFile, setDataFile] = useState(null);
    const [pickerOpen, setPickerOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        listTemplates()
            .then(setTemplates)
            .catch((error) => toast.error(extractErrorMessage(error, "Couldn't load templates")));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!templateId) return toast.error("Pick a template");
        if (!dataFile) return toast.error("Pick a data file (csv/json/xlsx)");
        if (!purpose.trim()) return toast.error("Give this batch a purpose/name");

        setSubmitting(true);
        try {
            const job = await createJob({
                template: Number(templateId),
                data_file: dataFile.id,
                purpose: purpose.trim(),
            });
            toast.success("Generation started");
            navigate(`/jobs/${job.id}`);
        } catch (error) {
            toast.error(extractErrorMessage(error, "Couldn't start generation"));
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-lg">
            <h1 className="mb-6 text-lg font-semibold text-white">Generate certificates</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label className="mb-1 block text-sm text-gray-300">Template</label>
                    <select
                        value={templateId}
                        onChange={(e) => setTemplateId(e.target.value)}
                        className="w-full rounded-lg bg-[#3c364c] p-2 text-white focus:outline-none"
                    >
                        <option value="">Select a template</option>
                        {templates.map((template) => (
                            <option key={template.id} value={template.id}>
                                {template.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="mb-1 block text-sm text-gray-300">
                        Data file (one row per certificate)
                    </label>
                    {!dataFile ? (
                        <button
                            type="button"
                            onClick={() => setPickerOpen(true)}
                            className="flex items-center gap-2 rounded-lg bg-[#3c364c] px-4 py-2 text-sm text-white hover:bg-[#4a4360]"
                        >
                            <FileIcon width={16} height={16} />
                            Choose from Drive
                        </button>
                    ) : (
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-white">{dataFile.name}</span>
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

                <div>
                    <label className="mb-1 block text-sm text-gray-300">Purpose / batch name</label>
                    <input
                        type="text"
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        placeholder="Python Bootcamp Batch 1"
                        className="w-full rounded-lg bg-[#3c364c] p-2 text-white focus:outline-none"
                    />
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    className="mt-2 w-fit rounded-lg bg-[#6d54b5] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#a47ce5] transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {submitting ? "Starting..." : "Generate"}
                </button>
            </form>

            {pickerOpen && (
                <FilePicker
                    title="Choose a data file"
                    accepts={DATA_FILE_ACCEPTS}
                    onClose={() => setPickerOpen(false)}
                    onSelect={setDataFile}
                />
            )}
        </div>
    );
}
