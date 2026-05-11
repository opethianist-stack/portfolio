import SectionHeader from './SectionHeader';
import type { CareerItem } from '@/lib/types';

interface CareerTimelineProps {
  items: CareerItem[];
}

export default function CareerTimeline({ items }: CareerTimelineProps) {
  return (
    <section id="career" className="border-b border-gray-5 py-24">
      <div className="container-page">
        <SectionHeader
          num="02 / Career"
          title="경력"
          desc="AI·디지털 교육 도메인에서 4년 4개월. 대학 학사운영팀의 교육과정 개편에서 시작해 교육격차 해소 사업을 거쳐, 공교육 AI·디지털 전환 B2G/B2B 사업의 PM으로 이어졌습니다."
        />

        <div className="relative pl-7">
          {/* vertical line */}
          <div className="absolute bottom-1.5 left-1.5 top-1.5 w-px bg-gray-4" aria-hidden />

          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            const isMuted = item.color === 'muted';
            const dotBorderColor = isMuted ? '#b8bfcc' : '#1a1f30';

            return (
              <div key={item.company} className={isLast ? '' : 'pb-10'}>
                {/* dot */}
                <div
                  className="absolute -ml-7 mt-2 h-3 w-3 rounded-full bg-bg"
                  style={{ left: 0, border: `2px solid ${dotBorderColor}` }}
                  aria-hidden
                />

                <div className="num text-xs font-semibold tracking-[0.04em] text-gray-1">
                  {item.period}{' '}
                  <span
                    className="ml-2 inline-block rounded-full border px-2 py-0.5 text-[11px] font-semibold"
                    style={{
                      borderColor: isMuted ? '#8491a7' : '#4a6ea3',
                      color: isMuted ? '#8491a7' : '#4a6ea3',
                    }}
                  >
                    {item.duration}
                  </span>
                </div>

                <div
                  className="mt-1.5 text-lg font-bold tracking-tight-2"
                  style={{ color: isMuted ? '#3a4156' : '#1a1f30' }}
                >
                  {item.company}
                </div>
                <div className="mt-0.5 text-sm text-navy-mid">{item.role}</div>
                <p className="mt-2.5 max-w-2xl text-sm text-gray-1">{item.summary}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
