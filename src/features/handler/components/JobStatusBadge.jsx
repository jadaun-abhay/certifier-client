import { ClockIcon, ZapIcon, CheckCircleIcon, XCircleIcon } from "@/shared/components/icons";

const STATUS_STYLES = {
    1: { label: "Pending", icon: ClockIcon, className: "bg-white/10 text-gray-300" },
    2: { label: "Processing", icon: ZapIcon, className: "bg-[#6d54b5]/30 text-[#c7b3f5]" },
    3: { label: "Completed", icon: CheckCircleIcon, className: "bg-green-500/20 text-green-400" },
    4: { label: "Failed", icon: XCircleIcon, className: "bg-red-500/20 text-red-400" },
};

export default function JobStatusBadge({ status, statusDisplay }) {
    const config = STATUS_STYLES[status] ?? STATUS_STYLES[1];
    const Icon = config.icon;
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${config.className}`}
        >
            <Icon width={14} height={14} />
            {statusDisplay ?? config.label}
        </span>
    );
}
