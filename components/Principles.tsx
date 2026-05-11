import SectionHeader from './SectionHeader';
import type { Principle } from '@/lib/types';

interface PrinciplesProps {
  items: Principle[];
}

export default function Principles({ items }: PrinciplesProps) {
  return (
    <section id="principles" className="border-b border-gray-5 py-24">
      <div className="container-page">
        <SectionHeader
          num="07 / Principles"
          title="일하는 원칙"
          desc="4년 이상의 사업 운영에서 일관되게 지켜온 네 가지 원칙. 같은 발주처 2~3년 연속 수주, 만족도의 추세 상승 같은 결과는 모두 이 원칙에서 나왔습니다."
        />

        <div style={{ borderTop: '1px solid #1a1f30' }}>
          {items.map((p, idx) => (
            <div
              key={idx}
              className="grid grid-cols-[50px_1fr] items-start gap-4 border-b border-gray-5 py-7 last:border-b-0 sm:grid-cols-[60px_1fr] sm:gap-6 sm:py-8"
            >
              <div className="num text-[32px] font-extrabold leading-none tracking-[-0.04em] text-gray-3">
                {String(idx + 1).padStart(2, '0')}
              </div>
              <div>
                <div className="text-[19px] font-bold leading-[1.4] tracking-tight-2 text-navy-deep">
                  {p.title}
                </div>
                <p className="mt-2.5 max-w-3xl text-sm leading-[1.7] text-gray-1">
                  {p.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
