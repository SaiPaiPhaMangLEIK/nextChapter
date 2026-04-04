interface RingStatProps {
  value: number | string;
  unit: string;
  label: string;
  /** 0–100 fill percentage of the arc */
  fillPercent: number;
}

const R = 38;
const CX = 50;
const CY = 50;
const CIRC = 2 * Math.PI * R;        // ≈ 238.76
const ARC = (270 / 360) * CIRC;      // ≈ 179.07  — 270° track
const GAP = CIRC - ARC;              // ≈  59.69  — 90° gap at bottom

export default function RingStat({ value, unit, label, fillPercent }: RingStatProps) {
  const fill = Math.min(Math.max(fillPercent, 0), 100);
  const progress = (fill / 100) * ARC;

  return (
    <div className="flex flex-col items-center gap-2.5">
      {/* Ring */}
      <div className="relative w-[88px] h-[88px]">
        {/* -rotate-[135deg] shifts the arc start from 3-o'clock → 7:30-o'clock */}
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-[135deg]">
          {/* Track */}
          <circle
            cx={CX} cy={CY} r={R}
            fill="none"
            stroke="#E2E3DC"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={`${ARC} ${GAP}`}
          />
          {/* Progress */}
          <circle
            cx={CX} cy={CY} r={R}
            fill="none"
            stroke="#186E28"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={`${progress} ${CIRC - progress}`}
          />
        </svg>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[20px] font-bold text-ink-700 leading-none">{value}</span>
          <span className="text-[9px] font-bold text-ink-400 uppercase tracking-wide mt-0.5">
            {unit}
          </span>
        </div>
      </div>

      {/* Bottom label */}
      <span className="text-[10px] font-bold text-ink-400 uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}
