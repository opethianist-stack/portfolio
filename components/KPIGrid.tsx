interface KPICell {
  labelTop: string;
  value: string;
  unit: string;
  desc: string;
  note?: string;
}

interface KPIGridProps {
  items: KPICell[];
}

export default function KPIGrid({ items }: KPIGridProps) {
  return (
    <div className="border-y border-gray-4">
      <div className="grid grid-cols-2 md:grid-cols-4">
        {items.map((kpi, idx) => (
          <KPICell key={idx} kpi={kpi} idx={idx} total={items.length} />
        ))}
      </div>
    </div>
  );
}

function KPICell({ kpi, idx, total }: { kpi: KPICell; idx: number; total: number }) {
  // 4셀 데스크탑: 마지막 셀만 우측 보더 제거
  // 모바일 (2열): 짝수 인덱스만 우측 보더 제거, 상단 행은 하단 보더 추가
  const isLast = idx === total - 1;
  const isMobileRightEdge = idx % 2 === 1;
  const isMobileTopRow = idx < 2;

  return (
    <div
      className={`px-7 py-7 md:first:pl-0 md:last:pr-0 ${
        isLast ? 'md:border-r-0' : 'md:border-r md:border-r-gray-5'
      } ${
        isMobileRightEdge ? 'border-r-0' : 'border-r border-r-gray-5'
      } ${isMobileTopRow ? 'border-b border-b-gray-5 md:border-b-0' : ''}`}
    >
      <div className="mb-3.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-gray-2">
        {kpi.labelTop}
      </div>
      <div className="num flex items-baseline gap-1.5 font-extrabold tracking-tight-4 text-navy-deep">
        <span className="text-[34px] leading-none md:text-[38px] lg:text-[46px]">{kpi.value}</span>
        <span className="text-sm font-medium tracking-normal text-gray-1">{kpi.unit}</span>
      </div>
      <div className="mt-2 text-[13px] leading-[1.5] text-gray-1">{kpi.desc}</div>
      {kpi.note && <div className="mt-1 text-[11px] text-gray-3">{kpi.note}</div>}
    </div>
  );
}
