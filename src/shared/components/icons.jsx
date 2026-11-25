const base = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
};

export const FolderIcon = (props) => (
    <svg {...base} {...props}>
        <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
    </svg>
);

export const FileIcon = (props) => (
    <svg {...base} {...props}>
        <path d="M14 3v4a1 1 0 0 0 1 1h4" />
        <path d="M6 3h8l5 5v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
    </svg>
);

export const StarIcon = ({ filled, ...props }) => (
    <svg
        {...base}
        {...props}
        fill={filled ? "currentColor" : "none"}
    >
        <path d="m12 3 2.6 5.6 6.1.6-4.6 4.2 1.3 6-5.4-3-5.4 3 1.3-6-4.6-4.2 6.1-.6Z" />
    </svg>
);

export const TrashIcon = (props) => (
    <svg {...base} {...props}>
        <path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m-9 0 1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13" />
    </svg>
);

export const MoreIcon = (props) => (
    <svg {...base} {...props}>
        <circle cx="12" cy="5" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="12" cy="19" r="1.2" fill="currentColor" stroke="none" />
    </svg>
);

export const PlusIcon = (props) => (
    <svg {...base} {...props}>
        <path d="M12 5v14M5 12h14" />
    </svg>
);

export const UploadIcon = (props) => (
    <svg {...base} {...props}>
        <path d="M12 16V4m0 0 4 4m-4-4-4 4" />
        <path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
    </svg>
);

export const ChevronRightIcon = (props) => (
    <svg {...base} {...props}>
        <path d="m9 6 6 6-6 6" />
    </svg>
);

export const DownloadIcon = (props) => (
    <svg {...base} {...props}>
        <path d="M12 4v12m0 0 4-4m-4 4-4-4" />
        <path d="M4 20h16" />
    </svg>
);

export const ArrowRightIcon = (props) => (
    <svg {...base} {...props}>
        <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
);

export const CloseIcon = (props) => (
    <svg {...base} {...props}>
        <path d="m6 6 12 12M18 6 6 18" />
    </svg>
);

export const SpinnerIcon = (props) => (
    <svg
        {...base}
        {...props}
        className={`animate-spin ${props.className ?? ""}`}
    >
        <path d="M12 3a9 9 0 1 0 9 9" />
    </svg>
);

export const LogoutIcon = (props) => (
    <svg {...base} {...props}>
        <path d="M9 21H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3" />
        <path d="M16 17l5-5-5-5M21 12H9" />
    </svg>
);

export const ImageIcon = (props) => (
    <svg {...base} {...props}>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="9" cy="10" r="1.6" fill="currentColor" stroke="none" />
        <path d="m4 17 5-5 4 4 3-3 4 4" />
    </svg>
);

export const ZapIcon = (props) => (
    <svg {...base} {...props}>
        <path d="M13 3 5 13h6l-1 8 8-10h-6l1-8Z" />
    </svg>
);

export const TypeIcon = (props) => (
    <svg {...base} {...props}>
        <path d="M5 6h14M12 6v12M9 18h6" />
    </svg>
);

export const PlayIcon = (props) => (
    <svg {...base} {...props}>
        <path d="M7 4.5v15l12-7.5Z" />
    </svg>
);

export const CheckCircleIcon = (props) => (
    <svg {...base} {...props}>
        <circle cx="12" cy="12" r="9" />
        <path d="m8.5 12.5 2.3 2.3 4.7-4.8" />
    </svg>
);

export const XCircleIcon = (props) => (
    <svg {...base} {...props}>
        <circle cx="12" cy="12" r="9" />
        <path d="m9 9 6 6m0-6-6 6" />
    </svg>
);

export const ClockIcon = (props) => (
    <svg {...base} {...props}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
    </svg>
);

export const RestoreIcon = (props) => (
    <svg {...base} {...props}>
        <path d="M3 12a9 9 0 1 0 3-6.7" />
        <path d="M3 4v4h4" />
    </svg>
);
