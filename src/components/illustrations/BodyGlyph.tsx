import { bodyByKey, CAB_PATH, WHEELS, WHEEL_Y, type BodyKey } from "@/lib/bodies";
import { cn } from "@/lib/cn";

/**
 * Static mini side-elevation of a truck with a given body.
 * Used for mega-menu items, cards and placeholders where no photo exists.
 * `custom` renders the dump outline with dashed "configurable" strokes.
 */
export function BodyGlyph({
  body,
  className,
  detailed = false,
  title,
}: {
  body: BodyKey | "custom";
  className?: string;
  detailed?: boolean;
  title?: string;
}) {
  const shape = bodyByKey[body === "custom" ? "landscape" : body];
  const custom = body === "custom";
  return (
    <svg
      viewBox="60 90 1060 400"
      className={cn("h-auto w-full", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <g fill="none" stroke="currentColor" strokeWidth={1.25} vectorEffect="non-scaling-stroke">
        <path d={CAB_PATH} vectorEffect="non-scaling-stroke" opacity={0.55} />
        <rect x={140} y={352} width={940} height={18} vectorEffect="non-scaling-stroke" opacity={0.55} />
        {WHEELS.map((cx) => (
          <g key={cx} opacity={0.55}>
            <circle cx={cx} cy={WHEEL_Y} r={50} vectorEffect="non-scaling-stroke" />
            {detailed && <circle cx={cx} cy={WHEEL_Y} r={30} vectorEffect="non-scaling-stroke" />}
          </g>
        ))}
      </g>
      <g
        fill={custom ? "none" : "rgb(255 91 20 / 0.1)"}
        stroke="var(--accent)"
        strokeWidth={1.5}
        strokeDasharray={custom ? "6 6" : undefined}
      >
        <path d={shape.outline} vectorEffect="non-scaling-stroke" />
        <path d={shape.ribs} fill="none" vectorEffect="non-scaling-stroke" opacity={0.7} />
        {detailed && <path d={shape.rail} fill="none" vectorEffect="non-scaling-stroke" opacity={0.7} />}
      </g>
    </svg>
  );
}
