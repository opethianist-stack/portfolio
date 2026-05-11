import type { Project } from '@/lib/types';

interface FeaturedProjectsProps {
  projects: Project[];
}

// 핵심 5개 프로젝트의 ID와 표시 순서
const FEATURED_IDS = [
  'keris-2026-leading-teacher', // Hero
  'keris-2025-ai-leading-teacher',
  'kosac-2025-school-consulting',
  'kosac-2026-aidonghaeng',
  'asia-platek-smartschool',
];

// 카드 메타 라벨 (data.json에 명시되지 않은 부가 카피)
const CARD_PILLS: Record<string, string[]> = {
  'keris-2025-ai-leading-teacher': ['KERIS · 교육부', '2025.05 — 10', 'PM · 50% 주관'],
  'kosac-2025-school-consulting': ['KOSAC · 과기정통부', '2025.04 — 2026.03', 'PL · 45% 주관'],
  'kosac-2026-aidonghaeng': ['KOSAC · 과기정통부', '2026.04 — 12', '총괄 PM · 80% 주관'],
  'asia-platek-smartschool': ['평택시 · 기초자치단체', '2021 — 2023', '사업 PM · 주관'],
};

// 카드 스탯 매핑 (시안과 동일)
const CARD_STATS: Record<
  string,
  { label: string; value: string }[]
> = {
  'keris-2025-ai-leading-teacher': [
    { label: '규모', value: '9.09 억' },
    { label: '수강자', value: '1,216 명' },
    { label: '만족도', value: '4.65' },
  ],
  'kosac-2025-school-consulting': [
    { label: '규모', value: '18 억' },
    { label: '참여교', value: '134 개교' },
    { label: '만족도', value: '4.67' },
  ],
  'kosac-2026-aidonghaeng': [
    { label: '규모', value: '4.8 억' },
    { label: '분과', value: 'Agent AI' },
    { label: '상태', value: '수주' },
  ],
  'asia-platek-smartschool': [
    { label: '3개년 누적', value: '3.72 억' },
    { label: '대상', value: '300 명' },
    { label: '연속 수주', value: '3 년' },
  ],
};

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const map = new Map(projects.map((p) => [p.id, p]));
  const heroProject = map.get(FEATURED_IDS[0]);
  const gridProjects = FEATURED_IDS.slice(1)
    .map((id) => map.get(id))
    .filter((p): p is Project => p !== undefined);

  if (!heroProject) return null;

  return (
    <>
      <FeaturedHero project={heroProject} />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {gridProjects.map((p) => (
          <FeaturedCard
            key={p.id}
            project={p}
            pills={CARD_PILLS[p.id] ?? []}
            stats={CARD_STATS[p.id] ?? []}
          />
        ))}
      </div>
    </>
  );
}

// ============== Hero Card (6자 컨소시엄) ==============
function FeaturedHero({ project }: { project: Project }) {
  return (
    <article className="mb-6 bg-navy-deep p-7 text-white md:p-10">
      <div className="mb-4 flex flex-wrap items-center gap-2.5">
        <Pill variant="status">{project.status}</Pill>
        <Pill variant="dark">2026.04 · 제안</Pill>
        <Pill variant="outline-dark">KERIS · 교육부</Pill>
        <Pill variant="outline-dark">15.94 억 원</Pill>
      </div>

      <h3 className="mb-3.5 text-[22px] font-bold leading-[1.3] tracking-tight-3 text-white md:text-[28px]">
        {project.title} — 6자 컨소시엄 거버넌스 설계
      </h3>

      <p className="mb-6 max-w-3xl text-[15px] leading-[1.6] text-white/85">
        {project.highlight}. 예산 비목 산출(중위수 기준 1,594백만 원 모델), 4권역 → 6권역 전환 대응,
        공모 신청서 양식 초안까지 단독 설계.
      </p>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.3fr_1fr]">
        <div>
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/50">
            컨소시엄 구성 (6자)
          </div>
          <div className="flex flex-wrap gap-1.5">
            {project.consortium?.map((member) => {
              const isLead = member.includes('주관');
              const isSelf = member.includes('엘리스');
              return (
                <span
                  key={member}
                  className={`rounded-full border px-2.5 py-1 text-[11px] ${
                    isLead
                      ? 'border-white bg-white font-bold text-navy-deep'
                      : isSelf
                      ? 'border-accent bg-accent font-semibold text-white'
                      : 'border-white/15 bg-white/[0.08] font-medium text-white/85'
                  }`}
                >
                  {member}
                </span>
              );
            })}
          </div>

          <div className="mb-3 mt-6 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/50">
            주요 산출물 (R&R 설계 정점)
          </div>
          <ul className="list-none">
            {project.achievements.map((a, idx) => (
              <li
                key={idx}
                className="relative py-2 pl-5 text-sm leading-[1.55] text-white/82"
              >
                <span
                  className="absolute left-0 top-4 h-px w-2"
                  style={{ background: '#8fa6c9' }}
                  aria-hidden
                />
                {a}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div
            className="grid grid-cols-2"
            style={{ borderTop: '1px solid rgba(255,255,255,0.15)', borderBottom: '1px solid rgba(255,255,255,0.15)' }}
          >
            <DarkStatCell label="사업 규모" value="15.94 억" rightBorder />
            <DarkStatCell label="참여 지분" value="17 %" />
            <DarkStatCell label="컨소시엄 규모" value="6 자" rightBorder />
            <DarkStatCell label="본인 R&R" value="거버넌스 설계" small />
          </div>
        </div>
      </div>
    </article>
  );
}

function DarkStatCell({
  label,
  value,
  rightBorder = false,
  small = false,
}: {
  label: string;
  value: string;
  rightBorder?: boolean;
  small?: boolean;
}) {
  return (
    <div
      className={`py-4 ${rightBorder ? 'pr-5' : 'pl-5'}`}
      style={rightBorder ? { borderRight: '1px solid rgba(255,255,255,0.15)' } : undefined}
    >
      <div className="text-[11px] font-medium tracking-[0.06em] text-white/55">{label}</div>
      <div
        className={`num mt-1 font-bold tracking-tight-2 text-white ${
          small ? 'text-sm' : 'text-[22px]'
        }`}
      >
        {value}
      </div>
    </div>
  );
}

// ============== Standard Featured Card ==============
function FeaturedCard({
  project,
  pills,
  stats,
}: {
  project: Project;
  pills: string[];
  stats: { label: string; value: string }[];
}) {
  return (
    <article className="flex flex-col border border-gray-4 bg-bg-card p-7">
      <div className="mb-3.5 flex flex-wrap items-center gap-2">
        {pills.map((p) => (
          <Pill key={p} variant="outline">
            {p}
          </Pill>
        ))}
      </div>

      <div className="mb-3 text-[18px] font-bold leading-[1.35] tracking-tight-2 text-navy-deep">
        {project.title}
      </div>

      <p className="mb-5 text-sm leading-[1.6] text-navy-mid">
        {expandedHighlight(project)}
      </p>

      <div className="mt-auto grid grid-cols-3 border-t border-gray-5 pt-4.5">
        {stats.map((s, idx) => {
          const isLast = idx === stats.length - 1;
          return (
            <div
              key={s.label}
              className={`${idx === 0 ? 'pr-3' : isLast ? 'pl-3' : 'px-3'} ${
                isLast ? '' : 'border-r border-gray-5'
              }`}
            >
              <div className="text-[10px] font-semibold uppercase tracking-[0.08em] text-gray-2">
                {s.label}
              </div>
              <div className="num mt-1 text-base font-bold tracking-tight-2 text-navy-deep">
                {s.value}
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
}

// 카드 highlight 텍스트 확장 (시안의 카피라이팅 그대로 유지)
function expandedHighlight(project: Project): string {
  const overrides: Record<string, string> = {
    'keris-2025-ai-leading-teacher':
      '9억 규모 50% 주관 사업의 PM. 부산·울산·경남 4권역 초중등 교원 1,216명 대상 원격·집합연수. AI 디지털 협업 도구 활용 수업 설계 + 학생 사회정서성장 교육 결합 모델.',
    'kosac-2025-school-consulting':
      '전국 3개 권역 130개교 디지털 전환 종합 컨설팅의 PL. 모집 목표 130개교 → 실적 134개교(103%) 초과 달성. 학교 대상 컨설팅 교원 섭외와 리더 교원 주도 커리큘럼 제안까지 일괄 설계.',
    'kosac-2026-aidonghaeng':
      'Agent AI를 키워드로 한 정부 발주 사업의 80% 주관 총괄 PM. 전국 학생 대상 교육 프로그램 + 해커톤·데모데이 운영. 프로그램 기획·강사 네트워크·운영 체계 설계까지 단독 수행. 가장 최신 사업.',
    'asia-platek-smartschool':
      '지역아동센터 기반 취약계층 아동 300명 대상 멘토링 사업. 첫 해 1억 → 2년차 2,200만 → 3년차 2.5억으로 신뢰 누적 모델. 첫 해 만족도 데이터가 다음 해 추가 발주의 근거가 된 사이클의 원형.',
  };
  return overrides[project.id] ?? project.highlight;
}

// ============== Pill component ==============
type PillVariant = 'outline' | 'dark' | 'status' | 'outline-dark';

function Pill({ children, variant = 'outline' }: { children: React.ReactNode; variant?: PillVariant }) {
  const styles: Record<PillVariant, string> = {
    outline: 'border-gray-4 bg-transparent text-navy-mid',
    dark: 'border-white/20 bg-white/[0.12] text-white',
    status: 'border-accent bg-accent text-white',
    'outline-dark': 'border-white/20 bg-transparent text-gray-2',
  };
  return (
    <span
      className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] ${styles[variant]}`}
    >
      {children}
    </span>
  );
}
