import { CloseIcon } from "./icons";

export default function Modal({ title, onClose, children }) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="w-full max-w-md rounded-xl bg-[#2c2638] p-5 text-white shadow-xl">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-1 text-gray-400 hover:bg-white/10 hover:text-white"
                        aria-label="Close"
                    >
                        <CloseIcon width={18} height={18} />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}
