import KPIGrid from './KPIGrid';

const DOMAIN_TAGS = [
  'AI 디지털교과서 (AIDT)',
  'KERIS 원격교육연수원 인가',
  '교원 AI·디지털 역량체계',
  'Agent AI / 생성형 AI 교육',
  '컨소시엄 거버넌스',
];

const KPIS = [
  {
    labelTop: 'Cumulative',
    value: '80',
    unit: '억 원+',
    desc: '직접 리딩 누적 사업 규모',
    note: '단독 PM·PL·주관기관 역할 기준',
  },
  {
    labelTop: 'Projects',
    value: '14',
    unit: '건',
    desc: 'B2G/B2B 사업 제안·수주·운영',
    note: '엘리스 14건 + 아시아교육협회 5건 = 19건 중',
  },
  {
    labelTop: 'Satisfaction',
    value: '4.6',
    unit: '/ 5.0+',
    desc: '운영 사업 평균 만족도',
    note: '2024 → 2025 4.4 → 4.67로 추세 상승',
  },
  {
    labelTop: 'Trainees',
    value: '4,500',
    unit: '명+',
    desc: '누적 교원·학생·멘토 수강자',
    note: '엘리스 + 아시아교육협회 운영 사업 합산',
  },
];

export default function Hero() {
  return (
    <header className="border-b border-gray-5 pb-16 pt-24">
      <div className="container-page">
        {/* meta strip */}
        <div className="mb-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-gray-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
          <span>Portfolio · 2026</span>
        </div>

        {/* Headline */}
        <h1 className="text-[36px] font-extrabold leading-[1.25] tracking-tight-3 text-navy-deep md:text-[48px] lg:text-[56px]">
          공교육·고등교육의
          <br />
          AI·디지털 전환을 잇는
          <br />
          교육사업 제안 및 운영 전문가.
        </h1>

        <div className="mt-1.5 text-[13px] font-medium tracking-[0.08em] text-gray-2">
          Song Museok &nbsp;·&nbsp; B2G/B2B Education Business Developer
        </div>

        <p className="mt-6 max-w-3xl text-[20px] font-medium leading-[1.5] tracking-tight-2 text-navy-mid md:text-[22px] lg:text-[26px]">
          RFP 분석부터 컨소시엄 거버넌스, 제안·수주·운영까지
          <br />
          교육사업 개발의 전 과정을 직접 수행합니다.
        </p>

        <p className="mt-4 max-w-2xl text-base leading-[1.65] text-gray-1">
          KERIS·KICE·KPF·KOSAC·시도교육청 등 정부 산하기관 발주 사업에서 단독 PM·PL·주관기관 역할로
          누적 80억 원 이상의 사업을 제안·수주·운영해 왔습니다. 운영 사업의 평균 만족도는 4.6점
          이상입니다.
        </p>

        {/* Domain tags */}
        <div className="mt-10 flex flex-wrap gap-2">
          {DOMAIN_TAGS.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-gray-4 px-3 py-1.5 text-xs font-medium text-navy-mid"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* KPI grid */}
        <div className="mt-16">
          <KPIGrid items={KPIS} />
        </div>
      </div>
    </header>
  );
}
