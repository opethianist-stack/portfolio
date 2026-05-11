import SectionHeader from './SectionHeader';
import type { ClientItem } from '@/lib/types';

interface ClientMatrixProps {
  items: ClientItem[];
}

// 발주처 명칭 분리 (영문 약어 + 한글)
const splitClient = (client: string): { kor: string; abbr: string } => {
  const match = client.match(/^(.+?)\s*\(([A-Z]+)\)$/);
  if (match) return { kor: match[1].trim(), abbr: match[2] };
  return { kor: client, abbr: '' };
};

export default function ClientMatrix({ items }: ClientMatrixProps) {
  return (
    <section id="clients" className="border-b border-gray-5 py-24">
      <div className="container-page">
        <SectionHeader
          num="03 / Clients"
          title="발주처 포트폴리오"
          desc="교육부·과기부·문체부 산하 6개 기관 유형. 동일 발주처 2~3년 연속 수주 패턴이 일관되게 나타납니다. KPF 2년 연속(5천만 → 2억으로 4배 확대), 평택시 3년 연속 수주가 대표적입니다."
        />

        <div
          className="grid grid-cols-1 gap-px border bg-gray-5 sm:grid-cols-2 lg:grid-cols-3"
          style={{ borderColor: '#d4d8e1' }}
        >
          {items.map((c) => {
            const { kor, abbr } = splitClient(c.client);
            return (
              <div key={c.client} className="bg-bg-card px-6 py-6">
                <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-2">
                  {c.ministry}
                </div>
                <div className="mt-1.5 text-base font-bold leading-snug tracking-tight-2 text-navy-deep">
                  {kor}
                  {abbr && (
                    <>
                      <br />
                      {abbr}
                    </>
                  )}
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4 border-t border-gray-5 pt-4">
                  <div>
                    <div className="text-[11px] font-medium tracking-[0.04em] text-gray-2">
                      사업 건수
                    </div>
                    <div className="num mt-0.5 text-lg font-bold tracking-tight-2 text-navy-deep">
                      {c.projects_count}
                      <span className="text-xs font-medium text-gray-1"> 건</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] font-medium tracking-[0.04em] text-gray-2">총액</div>
                    <div className="num mt-0.5 text-lg font-bold tracking-tight-2 text-navy-deep">
                      {c.total_amount_billion < 1
                        ? c.total_amount_billion.toFixed(2)
                        : c.total_amount_billion.toFixed(1)}
                      <span className="text-xs font-medium text-gray-1"> 억</span>
                    </div>
                  </div>
                </div>

                <div
                  className="mt-3.5 border-t pt-3 text-xs leading-[1.5] text-navy-mid"
                  style={{ borderTopStyle: 'dashed', borderTopColor: '#d4d8e1' }}
                >
                  <span className="font-semibold text-navy-deep">주요 R&R</span> · {c.key_role}
                </div>
                {c.details && (
                  <div className="mt-1.5 text-[11px] leading-[1.5] text-gray-2">{c.details}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
