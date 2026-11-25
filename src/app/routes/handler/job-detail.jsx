import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import toast from "react-hot-toast";
import { getJob } from "@/features/handler/api/handler.api";
import { getFile } from "@/features/drive/api/drive.api";
import { resolveFileUrl, extractErrorMessage } from "@/shared/utils/format";
import JobStatusBadge from "@/features/handler/components/JobStatusBadge";
import { DownloadIcon } from "@/shared/components/icons";

const POLL_INTERVAL_MS = 2000;
const ACTIVE_STATUSES = new Set([1, 2]);

export default function JobDetailPage() {
    const { jobId } = useParams();
    const [job, setJob] = useState(null);
    const [outputFile, setOutputFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const timerRef = useRef(null);

    useEffect(() => {
        let cancelled = false;

        async function poll() {
            try {
                const data = await getJob(jobId);
                if (cancelled) return;
                setJob(data);
                setLoading(false);

                if (data.status === 3 && data.output_zip) {
                    const file = await getFile(data.output_zip);
                    if (!cancelled) setOutputFile(file);
                }

                if (ACTIVE_STATUSES.has(data.status)) {
                    timerRef.current = setTimeout(poll, POLL_INTERVAL_MS);
                }
            } catch (error) {
                if (!cancelled) {
                    toast.error(extractErrorMessage(error, "Couldn't load job"));
                    setLoading(false);
                }
            }
        }

        poll();
        return () => {
            cancelled = true;
            clearTimeout(timerRef.current);
        };
    }, [jobId]);

    if (loading) return <p className="text-gray-400">Loading...</p>;
    if (!job) return null;

    return (
        <div className="max-w-lg">
            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-lg font-semibold text-white">{job.purpose}</h1>
                <JobStatusBadge status={job.status} statusDisplay={job.status_display} />
            </div>

            {ACTIVE_STATUSES.has(job.status) && (
                <p className="text-sm text-gray-400">
                    Generating certificates... this page refreshes automatically.
                </p>
            )}

            {job.status === 4 && (
                <p className="rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
                    {job.error_message || "Generation failed."}
                </p>
            )}

            {job.status === 3 && outputFile && (
                <a
                    href={resolveFileUrl(outputFile.file)}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 flex w-fit items-center gap-2 rounded-lg bg-[#6d54b5] px-4 py-2 text-sm font-medium text-white hover:bg-[#a47ce5] transition active:scale-95"
                >
                    <DownloadIcon width={16} height={16} />
                    Download {outputFile.name}
                </a>
            )}
        </div>
    );
}
