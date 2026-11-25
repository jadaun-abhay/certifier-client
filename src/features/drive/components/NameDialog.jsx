import { useState } from "react";
import Modal from "@/shared/components/Modal";

export default function NameDialog({ title, initialValue = "", confirmLabel = "Save", onClose, onSubmit }) {
    const [value, setValue] = useState(initialValue);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!value.trim()) return;
        setSubmitting(true);
        try {
            await onSubmit(value.trim());
            onClose();
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal title={title} onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <input
                    autoFocus
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="w-full rounded-lg bg-[#3c364c] p-2 text-white focus:outline-none"
                />
                <div className="mt-4 flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg px-4 py-2 text-sm text-gray-300 hover:bg-white/10"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={submitting || !value.trim()}
                        className="rounded-lg bg-[#6d54b5] px-4 py-2 text-sm hover:bg-[#a47ce5] transition disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        {submitting ? "Saving..." : confirmLabel}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
