import type { ClientItem } from '@/lib/types';

interface BarChartProps {
  data: ClientItem[];
}

export default function BarChart({ data }: BarChartProps) {
  // 사업 총액 내림차순 정렬
  const sorted = [...data].sort((a, b) => b.total_amount_billion - a.total_amount_billion);
  const max = sorted[0]?.total_amount_billion ?? 1;

  // 발주처 표시명 단축 매핑
  const shortName = (client: string) => {
    if (client.includes('한국교육학술정보원')) return 'KERIS';
    if (client.includes('한국과학창의재단')) return 'KOSAC';
    if (client.includes('한국언론진흥재단')) return 'KPF';
    if (client.includes('한국교육과정평가원')) return 'KICE';
    return client;
  };

  return (
    <div className="border border-gray-4 bg-bg-card p-7">
      <div className="text-[15px] font-bold tracking-tight-2 text-navy-deep">
        발주처별 사업 총액
      </div>
      <div className="mt-1 text-xs leading-[1.5] text-gray-2">
        직접 리딩 80억+ 외 협력사 참여분을 포함한 발주처별 사업 누적 합계
      </div>

      <div className="mt-6">
        {sorted.map((row, idx) => {
          const widthPct = (row.total_amount_billion / max) * 100;
          // 상위 3개는 진한 톤, 나머지는 중간 톤
          const isTop = idx < 3;
          return (
            <div
              key={row.client}
              className="grid grid-cols-[110px_1fr_70px] items-center gap-2 border-b border-gray-5 py-2.5 last:border-b-0 sm:grid-cols-[140px_1fr_90px] sm:gap-3"
            >
              <div className="text-xs font-medium leading-tight text-navy sm:text-[13px]">
                {shortName(row.client)}
              </div>
              <div className="relative h-2.5 bg-gray-6">
                <div
                  className={`absolute inset-y-0 left-0 ${isTop ? 'bg-navy' : 'bg-navy-soft'}`}
                  style={{ width: `${widthPct}%` }}
                />
              </div>
              <div className="num text-right text-[13px] font-semibold text-navy-deep">
                {row.total_amount_billion.toFixed(row.total_amount_billion < 1 ? 2 : 1)}
                <span className="ml-0.5 text-[11px] font-medium text-gray-2">억</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
