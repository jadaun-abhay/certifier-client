import { TrashIcon } from "@/shared/components/icons";

export default function FieldSettingsList({ fields, fonts, onChange, onRemove }) {
    if (fields.length === 0) {
        return (
            <p className="text-sm text-gray-400">
                No fields yet - draw a box on the image for each piece of text (name, course,
                date, etc).
            </p>
        );
    }

    return (
        <div className="flex flex-col gap-2">
            {fields.map((field, index) => (
                <div
                    key={index}
                    className="flex flex-wrap items-center gap-3 rounded-lg bg-[#3c364c] px-3 py-2"
                >
                    <input
                        type="text"
                        value={field.field_name}
                        onChange={(e) => onChange(index, { field_name: e.target.value })}
                        placeholder="Field name (e.g. name)"
                        className="w-40 rounded-lg bg-[#2c2638] px-2 py-1.5 text-sm text-white focus:outline-none"
                    />
                    <select
                        value={field.alignment}
                        onChange={(e) => onChange(index, { alignment: e.target.value })}
                        className="rounded-lg bg-[#2c2638] px-2 py-1.5 text-sm text-white focus:outline-none"
                    >
                        <option value="left">Left</option>
                        <option value="center">Center</option>
                        <option value="right">Right</option>
                    </select>
                    <input
                        type="color"
                        value={field.text_color}
                        onChange={(e) => onChange(index, { text_color: e.target.value })}
                        className="h-8 w-10 cursor-pointer rounded bg-[#2c2638]"
                    />
                    <select
                        value={field.font ?? ""}
                        onChange={(e) =>
                            onChange(index, { font: e.target.value ? Number(e.target.value) : null })
                        }
                        className="rounded-lg bg-[#2c2638] px-2 py-1.5 text-sm text-white focus:outline-none"
                    >
                        <option value="">Default font</option>
                        {fonts.map((font) => (
                            <option key={font.id} value={font.id}>
                                {font.name}
                            </option>
                        ))}
                    </select>
                    <button
                        type="button"
                        onClick={() => onRemove(index)}
                        className="ml-auto rounded-lg p-1.5 text-red-400 hover:bg-white/10"
                        aria-label="Remove field"
                    >
                        <TrashIcon width={16} height={16} />
                    </button>
                </div>
            ))}
        </div>
    );
}
