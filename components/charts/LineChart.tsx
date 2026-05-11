import type { SatisfactionPoint } from '@/lib/types';

interface LineChartProps {
  data: SatisfactionPoint[];
}

// 차트 좌표 매핑
// viewBox: 0 0 600 215
// X 축 padding: 40 left, 580 right (range 540)
// Y 축 padding: 30 top, 170 bottom (range 140) — Y범위 4.0~5.0 (1.0)
const CHART = {
  xStart: 40,
  xEnd: 580,
  yTop: 30,
  yBottom: 170,
  yMin: 4.0,
  yMax: 5.0,
};

const xFor = (idx: number, total: number) =>
  CHART.xStart + ((CHART.xEnd - CHART.xStart) * idx) / (total - 1);

const yFor = (score: number) =>
  CHART.yTop + ((CHART.yMax - score) / (CHART.yMax - CHART.yMin)) * (CHART.yBottom - CHART.yTop);

// X축 라벨 — 사업명을 표시 가능 길이에 맞게 분할
const splitLabel = (project: string, year: string): string[] => {
  if (project.includes('AI 디지털 기반 교육혁신')) return [year, 'AI 디지털 선도교사', '양성연수'];
  if (project.includes('교실혁명')) return [year, '교실혁명'];
  if (project.includes('찾아가는')) return [year, '찾아가는 컨설팅'];
  if (project.includes('터치교사단')) return [year, '터치교사단'];
  return [year, project.slice(0, 10)];
};

export default function LineChart({ data }: LineChartProps) {
  const points = data.map((d, idx) => ({
    ...d,
    x: xFor(idx, data.length),
    y: yFor(d.score),
    labels: splitLabel(d.project, d.year),
  }));

  // polyline points string
  const linePoints = points.map((p) => `${p.x},${p.y}`).join(' ');
  // area fill path
  const areaPath = [
    `M ${points[0].x} ${points[0].y}`,
    ...points.slice(1).map((p) => `L ${p.x} ${p.y}`),
    `L ${points[points.length - 1].x} ${CHART.yBottom}`,
    `L ${points[0].x} ${CHART.yBottom}`,
    'Z',
  ].join(' ');

  return (
    <div className="col-span-full border border-gray-4 bg-bg-card p-7">
      <div className="text-[15px] font-bold tracking-tight-2 text-navy-deep">
        운영 사업 만족도 추이
      </div>
      <div className="mt-1 text-xs leading-[1.5] text-gray-2">
        사후 만족도 조사가 완료된 4건 시계열 — 누적 2,562명 응답
      </div>

      <div className="mt-6">
        <svg
          viewBox="0 0 600 215"
          preserveAspectRatio="none"
          className="block h-auto w-full"
          aria-label="만족도 시계열 라인 차트"
        >
          {/* Y axis gridlines */}
          <g stroke="#e9ecf1" strokeWidth="1">
            <line x1="40" y1="30" x2="580" y2="30" />
            <line x1="40" y1="65" x2="580" y2="65" />
            <line x1="40" y1="100" x2="580" y2="100" />
            <line x1="40" y1="135" x2="580" y2="135" />
            <line x1="40" y1="170" x2="580" y2="170" stroke="#b8bfcc" />
          </g>
          <g
            fontFamily="Pretendard, sans-serif"
            fontSize="10"
            fill="#8491a7"
            fontWeight="500"
            textAnchor="end"
          >
            <text x="34" y="33">5.0</text>
            <text x="34" y="68">4.75</text>
            <text x="34" y="103">4.5</text>
            <text x="34" y="138">4.25</text>
            <text x="34" y="173">4.0</text>
          </g>

          {/* area */}
          <path d={areaPath} fill="#4a6ea3" fillOpacity="0.06" />

          {/* line */}
          <polyline
            points={linePoints}
            fill="none"
            stroke="#1a1f30"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* data points */}
          {points.map((p, idx) => (
            <circle
              key={idx}
              cx={p.x}
              cy={p.y}
              r="6"
              fill="#fafbfc"
              stroke="#1a1f30"
              strokeWidth="2.5"
            />
          ))}

          {/* value labels */}
          <g
            fontFamily="Pretendard, sans-serif"
            fontSize="11"
            fill="#1a1f30"
            fontWeight="700"
            textAnchor="middle"
            style={{ fontFeatureSettings: "'tnum' 1" }}
          >
            {points.map((p, idx) => (
              <text key={idx} x={p.x} y={p.y - 14}>
                {p.score.toFixed(2)}
              </text>
            ))}
          </g>

          {/* X axis labels */}
          <g
            fontFamily="Pretendard, sans-serif"
            fontSize="10"
            fill="#8491a7"
            fontWeight="500"
            textAnchor="middle"
          >
            {points.map((p, idx) => {
              // 라벨이 3줄이면 184/196/208, 2줄이면 190/203
              const isThreeLine = p.labels.length === 3;
              return (
                <g key={idx}>
                  <text x={p.x} y={isThreeLine ? 184 : 190}>
                    {p.labels[0]}
                  </text>
                  <text x={p.x} y={isThreeLine ? 196 : 203}>
                    {p.labels[1]}
                  </text>
                  {isThreeLine && (
                    <text x={p.x} y={208}>
                      {p.labels[2]}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        </svg>

        {/* summary table below chart */}
        <div className="mt-5 grid grid-cols-2 border-t border-gray-5 sm:grid-cols-4">
          {points.map((p, idx) => {
            const isLast = idx === points.length - 1;
            const isMobileRightEdge = idx % 2 === 1;
            return (
              <div
                key={idx}
                className={`px-3 py-3.5 ${
                  isLast ? 'sm:border-r-0' : 'sm:border-r sm:border-r-gray-5'
                } ${isMobileRightEdge ? 'border-r-0' : 'border-r border-r-gray-5'} ${
                  idx < 2 ? 'border-b border-b-gray-5 sm:border-b-0' : ''
                }`}
              >
                <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-2">
                  {p.year} · {p.client}
                </div>
                <div className="num mt-1 text-[22px] font-bold tracking-tight-2 text-navy-deep">
                  {p.score.toFixed(2)}
                  <span className="text-xs font-normal tracking-normal text-gray-2"> / 5.0</span>
                </div>
                <div className="mt-1 text-[11px] leading-[1.4] text-gray-1">
                  {p.project}
                  <br />
                  수강자 {p.trainees.toLocaleString()}명
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
