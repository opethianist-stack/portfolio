import type { RoleSlice } from '@/lib/types';

interface DonutChartProps {
  data: RoleSlice[];
}

const COLORS = ['#1a1f30', '#3a4156', '#8fa6c9'];

export default function DonutChart({ data }: DonutChartProps) {
  const total = data.reduce((sum, d) => sum + d.count, 0);

  // SVG 도넛 — 반지름 75, stroke 26
  const radius = 75;
  const circumference = 2 * Math.PI * radius; // ≈ 471.24

  // 각 segment의 dasharray 계산
  let cumulativeOffset = 0;
  const segments = data.map((slice, idx) => {
    const fraction = slice.count / total;
    const length = circumference * fraction;
    const seg = {
      length,
      offset: -cumulativeOffset,
      color: COLORS[idx % COLORS.length],
      ...slice,
      pct: Math.round(fraction * 100),
    };
    cumulativeOffset += length;
    return seg;
  });

  return (
    <div className="border border-gray-4 bg-bg-card p-7">
      <div className="text-[15px] font-bold tracking-tight-2 text-navy-deep">사업 내 역할 구성</div>
      <div className="mt-1 text-xs leading-[1.5] text-gray-2">
        엘리스그룹 14건 기준 — 단독·주관·협력
      </div>

      <div className="mt-6 grid grid-cols-[140px_1fr] items-center gap-5 sm:grid-cols-[180px_1fr] sm:gap-7">
        <svg
          viewBox="0 0 200 200"
          className="h-auto w-full"
          aria-label="역할 분포 도넛 차트"
        >
          {/* background ring */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="#e9ecf1"
            strokeWidth="26"
          />
          {/* segments */}
          {segments.map((seg, idx) => (
            <circle
              key={idx}
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth="26"
              strokeDasharray={`${seg.length} ${circumference - seg.length}`}
              strokeDashoffset={seg.offset}
              transform="rotate(-90 100 100)"
            />
          ))}
          {/* center labels */}
          <text
            x="100"
            y="96"
            textAnchor="middle"
            fontSize="28"
            fontWeight="700"
            fill="#1a1f30"
            style={{ fontFamily: 'Pretendard, sans-serif', letterSpacing: '-0.02em' }}
          >
            {total}
          </text>
          <text
            x="100"
            y="118"
            textAnchor="middle"
            fontSize="11"
            fontWeight="500"
            fill="#8491a7"
            style={{ fontFamily: 'Pretendard, sans-serif', letterSpacing: '0.05em' }}
          >
            PROJECTS
          </text>
        </svg>

        <div className="flex flex-col gap-2.5">
          {segments.map((seg, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-[13px]">
              <div
                className="mt-1 h-3 w-3 flex-shrink-0"
                style={{ background: seg.color }}
                aria-hidden
              />
              <div>
                <div className="font-medium text-navy">{seg.role}</div>
                <div className="mt-0.5 text-xs text-gray-1">
                  {seg.count}건 · {seg.pct}% — {seg.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
