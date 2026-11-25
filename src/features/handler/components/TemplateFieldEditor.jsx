import { useEffect, useRef, useState } from "react";

const MIN_BOX_SIZE = 8;

export default function TemplateFieldEditor({ imageUrl, fields, onAddField, onRemoveField }) {
    const imgRef = useRef(null);
    const containerRef = useRef(null);
    const [drag, setDrag] = useState(null);
    const [metrics, setMetrics] = useState(null);

    useEffect(() => {
        const img = imgRef.current;
        if (!img) return;

        const updateMetrics = () => {
            if (!img.naturalWidth) return;
            setMetrics({
                naturalWidth: img.naturalWidth,
                naturalHeight: img.naturalHeight,
                clientWidth: img.clientWidth,
                clientHeight: img.clientHeight,
            });
        };

        if (img.complete) updateMetrics();
        img.addEventListener("load", updateMetrics);
        const observer = new ResizeObserver(updateMetrics);
        observer.observe(img);

        return () => {
            img.removeEventListener("load", updateMetrics);
            observer.disconnect();
        };
    }, [imageUrl]);

    const getPoint = (e) => {
        const rect = containerRef.current.getBoundingClientRect();
        return {
            x: Math.min(Math.max(e.clientX - rect.left, 0), rect.width),
            y: Math.min(Math.max(e.clientY - rect.top, 0), rect.height),
        };
    };

    const handleMouseDown = (e) => {
        const point = getPoint(e);
        setDrag({ startX: point.x, startY: point.y, curX: point.x, curY: point.y });
    };

    const handleMouseMove = (e) => {
        if (!drag) return;
        const point = getPoint(e);
        setDrag((prev) => ({ ...prev, curX: point.x, curY: point.y }));
    };

    const handleMouseUp = () => {
        if (!drag || !metrics) {
            setDrag(null);
            return;
        }
        const scaleX = metrics.naturalWidth / metrics.clientWidth;
        const scaleY = metrics.naturalHeight / metrics.clientHeight;
        const x1 = Math.round(Math.min(drag.startX, drag.curX) * scaleX);
        const y1 = Math.round(Math.min(drag.startY, drag.curY) * scaleY);
        const x2 = Math.round(Math.max(drag.startX, drag.curX) * scaleX);
        const y2 = Math.round(Math.max(drag.startY, drag.curY) * scaleY);
        setDrag(null);
        if (x2 - x1 < MIN_BOX_SIZE || y2 - y1 < MIN_BOX_SIZE) return;
        onAddField({
            top_left_x: x1,
            top_left_y: y1,
            bottom_right_x: x2,
            bottom_right_y: y2,
        });
    };

    const toDisplayBox = (field) => {
        if (!metrics) return null;
        const scaleX = metrics.clientWidth / metrics.naturalWidth;
        const scaleY = metrics.clientHeight / metrics.naturalHeight;
        return {
            left: field.top_left_x * scaleX,
            top: field.top_left_y * scaleY,
            width: (field.bottom_right_x - field.top_left_x) * scaleX,
            height: (field.bottom_right_y - field.top_left_y) * scaleY,
        };
    };

    return (
        <div>
            <p className="mb-2 text-sm text-gray-400">
                Click and drag on the image to mark where each piece of text should be drawn.
            </p>
            <div
                ref={containerRef}
                className="relative inline-block cursor-crosshair select-none"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={() => setDrag(null)}
            >
                <img
                    ref={imgRef}
                    src={imageUrl}
                    alt="Certificate template background"
                    className="block max-w-full rounded-lg"
                    draggable={false}
                />
                {fields.map((field, index) => {
                    const box = toDisplayBox(field);
                    if (!box) return null;
                    return (
                        <div
                            key={index}
                            style={{
                                left: box.left,
                                top: box.top,
                                width: box.width,
                                height: box.height,
                            }}
                            className="absolute border-2 border-[#a47ce5] bg-[#a47ce5]/20"
                        >
                            <span className="absolute -top-5 left-0 whitespace-nowrap rounded bg-[#2c2638] px-1 text-xs text-[#a47ce5]">
                                {field.field_name || `Field ${index + 1}`}
                            </span>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onRemoveField(index);
                                }}
                                className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs leading-none text-white"
                                aria-label="Remove field"
                            >
                                ×
                            </button>
                        </div>
                    );
                })}
                {drag && (
                    <div
                        style={{
                            left: Math.min(drag.startX, drag.curX),
                            top: Math.min(drag.startY, drag.curY),
                            width: Math.abs(drag.curX - drag.startX),
                            height: Math.abs(drag.curY - drag.startY),
                        }}
                        className="pointer-events-none absolute border-2 border-dashed border-white/80"
                    />
                )}
            </div>
        </div>
    );
}
