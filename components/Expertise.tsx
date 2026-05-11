import SectionHeader from './SectionHeader';
import type { DomainExpertise } from '@/lib/types';

interface ExpertiseProps {
  expertise: DomainExpertise;
}

export default function Expertise({ expertise }: ExpertiseProps) {
  return (
    <section id="expertise" className="border-b border-gray-5 py-24">
      <div className="container-page">
        <SectionHeader
          num="06 / Expertise"
          title="AI·디지털 교육 도메인 전문성"
          desc="정책·발주처 구조와 현장 운영을 동시에 이해하는 6개 도메인 영역. 각 영역에서 단편적 경험이 아니라 제안·수주·운영의 한 사이클을 직접 수행했습니다."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {expertise.items.map((item, idx) => (
            <article
              key={item.label}
              className="border border-gray-4 bg-bg-card p-7"
            >
              <div className="num text-xs font-bold uppercase tracking-[0.08em] text-accent">
                D · {String(idx + 1).padStart(2, '0')}
              </div>
              <div className="mt-2 text-[17px] font-bold leading-[1.35] tracking-tight-2 text-navy-deep">
                {item.label}
              </div>
              <p className="mt-3.5 text-sm leading-[1.65] text-gray-1">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
