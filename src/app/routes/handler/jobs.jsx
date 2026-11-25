import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import { listJobs } from "@/features/handler/api/handler.api";
import { extractErrorMessage, formatDate } from "@/shared/utils/format";
import JobStatusBadge from "@/features/handler/components/JobStatusBadge";
import { ZapIcon, PlusIcon } from "@/shared/components/icons";

export default function JobsPage() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    const load = useCallback(async () => {
        setLoading(true);
        try {
            setJobs(await listJobs());
        } catch (error) {
            toast.error(extractErrorMessage(error, "Couldn't load jobs"));
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
                <h1 className="text-lg font-semibold text-white">Generation jobs</h1>
                <Link
                    to="/jobs/new"
                    className="flex items-center gap-2 rounded-lg bg-[#6d54b5] px-4 py-2 text-sm font-medium text-white hover:bg-[#a47ce5] transition active:scale-95"
                >
                    <PlusIcon width={16} height={16} />
                    New job
                </Link>
            </div>

            {loading && <p className="text-gray-400">Loading...</p>}

            {!loading && jobs.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 py-24 text-gray-400">
                    <ZapIcon width={40} height={40} />
                    <p className="mt-3">No generation jobs yet</p>
                </div>
            )}

            {!loading && jobs.length > 0 && (
                <div className="flex flex-col gap-2">
                    {jobs.map((job) => (
                        <Link
                            key={job.id}
                            to={`/jobs/${job.id}`}
                            className="flex items-center justify-between rounded-xl bg-[#2c2638] px-4 py-3 hover:bg-[#352e45]"
                        >
                            <div>
                                <p className="text-sm font-medium text-white">{job.purpose}</p>
                                <p className="text-xs text-gray-400">
                                    {formatDate(job.created_at)}
                                </p>
                            </div>
                            <JobStatusBadge status={job.status} statusDisplay={job.status_display} />
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
