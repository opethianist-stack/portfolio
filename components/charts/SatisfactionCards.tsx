import type { SatisfactionPoint } from '@/lib/types';

interface SatisfactionCardsProps {
  data: SatisfactionPoint[];
}

export default function SatisfactionCards({ data }: SatisfactionCardsProps) {
  // 요약 통계 계산
  const count = data.length;
  const avgScore =
    count > 0
      ? (data.reduce((sum, d) => sum + d.score, 0) / count).toFixed(2)
      : '0';

  // 누적 수강자: trainees_label에 "개교"가 들어간 건은 별도 집계
  let totalTrainees = 0;
  let totalSchools = 0;
  for (const d of data) {
    if (d.trainees_label && d.trainees_label.includes('개교')) {
      totalSchools += d.trainees;
    } else {
      totalTrainees += d.trainees;
    }
  }
  // 100명 단위 반올림으로 "약 N+" 표기
  const trainees100 = Math.floor(totalTrainees / 100) * 100;

  return (
    <div className="col-span-full border border-gray-4 bg-bg-card p-7">
      <div className="text-[15px] font-bold tracking-tight-2 text-navy-deep">
        운영 사업 만족도
      </div>

      {/* 요약 한 줄 */}
      <div className="mt-6 border-b border-gray-5 pb-3.5 text-[13px] text-gray-1">
        운영 완료 {count}건의 평균 만족도{' '}
        <span className="num font-bold text-navy-deep">{avgScore}</span> / 5.0
        <span className="mx-2 text-gray-3">·</span>
        누적 수강자{' '}
        <span className="num font-bold text-navy-deep">
          {trainees100.toLocaleString()}+
        </span>
        명
        {totalSchools > 0 && (
          <>
            <span className="mx-1.5 text-gray-3">·</span>
            참여학교{' '}
            <span className="num font-bold text-navy-deep">{totalSchools}</span>
            개교
          </>
        )}
      </div>

      {/* 카드 그리드 */}
      <div
        className="mt-6 grid grid-cols-1 gap-px border bg-gray-5 sm:grid-cols-2 lg:grid-cols-3"
        style={{ borderColor: '#d4d8e1' }}
      >
        {data.map((d, idx) => (
          <SatCard key={idx} point={d} />
        ))}
      </div>
    </div>
  );
}

function SatCard({ point }: { point: SatisfactionPoint }) {
  // 사업명 표시 (긴 사업명은 carry word break)
  const isSchoolType =
    point.trainees_label && point.trainees_label.includes('개교');
  const statLabel = isSchoolType ? '참여 학교' : '수강자';
  const statValue = isSchoolType
    ? `${point.trainees}`
    : `${point.trainees.toLocaleString()}`;
  const statUnit = isSchoolType ? '개교' : '명';

  // 부산 3종은 평균이라 약 800명 형태로 표시
  const isApprox = point.trainees_label && point.trainees_label.includes('약');
  const displayValue = isApprox ? '약 800' : statValue;

  return (
    <div className="flex flex-col bg-bg-card px-6 py-6">
      <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-2">
        {point.year} · {point.client}
      </div>
      <div className="mb-4 min-h-[40px] text-sm font-bold leading-[1.4] tracking-tight-2 text-navy-deep">
        {point.project}
      </div>

      {/* 만족도 메인 */}
      <div>
        <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-2">
          만족도
        </div>
        <div className="num text-[38px] font-extrabold leading-none tracking-tight-4 text-navy-deep">
          {point.score.toFixed(2)}
          <span className="text-sm font-medium tracking-normal text-gray-2">
            {' / '}5.0
          </span>
        </div>
      </div>

      {/* 사업 규모 + 수강자 */}
      <div
        className="mt-4.5 grid grid-cols-2 gap-0 pt-3.5"
        style={{ borderTop: '1px dashed #d4d8e1' }}
      >
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.08em] text-gray-2">
            사업 규모
          </div>
          <div className="num mt-1 text-sm font-bold tracking-tight-2 text-navy">
            {point.amount_billion}
            <span className="ml-0.5 text-[11px] font-medium text-gray-1">
              {' '}억
            </span>
          </div>
        </div>
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.08em] text-gray-2">
            {statLabel}
          </div>
          <div className="num mt-1 text-sm font-bold tracking-tight-2 text-navy">
            {displayValue}
            <span className="ml-0.5 text-[11px] font-medium text-gray-1">
              {' '}{statUnit}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
