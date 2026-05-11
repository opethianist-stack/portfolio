import SectionHeader from './SectionHeader';
import type { Competency } from '@/lib/types';

interface CompetenciesProps {
  items: Competency[];
}

export default function Competencies({ items }: CompetenciesProps) {
  return (
    <section id="competencies" className="border-b border-gray-5 py-24">
      <div className="container-page">
        <SectionHeader
          num="05 / Competencies"
          title="직무 역량"
          desc="B2G/B2B 교육사업 개발에 필요한 6개 카테고리 역량. 각 카테고리는 사업 기획에서 결과 환류까지의 한 사이클을 구성합니다."
        />

        <div
          className="grid grid-cols-1 gap-px border bg-gray-4 sm:grid-cols-2 lg:grid-cols-3"
          style={{ borderColor: '#d4d8e1' }}
        >
          {items.map((comp) => (
            <CompetencyCell key={comp.category} comp={comp} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CompetencyCell({ comp }: { comp: Competency }) {
  return (
    <div className="bg-bg-card px-6 py-7">
      <div className="mb-4.5 flex items-center justify-between">
        <div className="text-[15px] font-bold tracking-tight-2 text-navy-deep">
          {comp.category}
        </div>
        <div className="flex gap-[3px]">
          {Array.from({ length: 5 }).map((_, idx) => (
            <span
              key={idx}
              className={`h-1.5 w-1.5 ${idx < comp.level ? 'bg-navy-deep' : 'bg-gray-4'}`}
              aria-hidden
            />
          ))}
          <span className="sr-only">레벨 {comp.level} / 5</span>
        </div>
      </div>
      <ul>
        {comp.items.map((item, idx) => (
          <li
            key={idx}
            className="relative border-b border-gray-5 py-1.5 pl-3.5 text-[13px] leading-[1.5] text-navy-mid last:border-b-0"
          >
            <span
              className="absolute left-0 top-3 h-px w-1.5 bg-gray-3"
              aria-hidden
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
