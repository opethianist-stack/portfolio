import type { Project } from '@/lib/types';

interface FeaturedProjectsProps {
  projects: Project[];
}

// 핵심 6개 프로젝트 — 첫 번째가 Hero, 나머지 5개가 그리드 (옵션 B: 임팩트 순)
const FEATURED_IDS = [
  'keris-2025-ai-leading-teacher',   // ⭐ Hero
  'busan-2025-three-projects',        // 그리드 ① — 부산 19.7억 (신규)
  'keris-2026-leading-teacher',       // 그리드 ② — 6자 컨소시엄
  'kosac-2025-school-consulting',     // 그리드 ③ — 찾아가는 학교 컨설팅
  'kosac-2026-aidonghaeng',           // 그리드 ④ — AI동행
  'asia-platek-smartschool',          // 그리드 ⑤ — 평택시
  'kice-2026-ai-assistant',           // 그리드 ⑥ — KICE (신규)
];

// 그리드 카드 메타 라벨 (상단 pills)
const CARD_PILLS: Record<string, string[]> = {
  'busan-2025-three-projects': ['부산광역시 · 시도교육청', '2024.12 — 2025.02', '운영 PL · 50~70% 주관'],
  'keris-2026-leading-teacher': ['거버넌스 설계', 'KERIS · 교육부', '2026.04 제안'],
  'kosac-2025-school-consulting': ['KOSAC · 과기정통부', '2025.04 — 2026.03', 'PL · 45% 주관'],
  'kosac-2026-aidonghaeng': ['KOSAC · 과기정통부', '2026.04 — 12', '총괄 PM · 80% 주관'],
  'asia-platek-smartschool': ['평택시 · 기초자치단체', '2021 — 2023', '사업 PM · 주관'],
  'kice-2026-ai-assistant': ['제안 PL — 수주 완료', 'KICE · 교육부', '2026.03 — 08'],
};

// 그리드 카드 stats (하단 3개 박스)
// 텍스트가 길어 작게 표시되어야 할 경우 small: true
type StatItem = { label: string; value: string; small?: boolean; sub?: string };

const CARD_STATS: Record<string, StatItem[]> = {
  'busan-2025-three-projects': [
    { label: '누적 규모', value: '19.7 억' },
    { label: '동시 진행', value: '3 개 사업' },
    { label: '주관 지분', value: '50~70 %' },
  ],
  'keris-2026-leading-teacher': [
    { label: '사업 규모', value: '15.94 억' },
    { label: 'R&R', value: '거버넌스 설계', small: true },
    { label: '결과', value: '우선협상', small: true, sub: '(호남권)' },
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
  'kice-2026-ai-assistant': [
    { label: '사업 규모', value: '2.46 억' },
    { label: 'R&R', value: '제안 PL', small: true },
    { label: '결과', value: '수주 완료', small: true },
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

// ============== Hero Card (2025 AI 디지털 — 옵션 A) ==============
function FeaturedHero({ project }: { project: Project }) {
  return (
    <article className="mb-6 bg-navy-deep p-7 text-white md:p-10">
      <div className="mb-4 flex flex-wrap items-center gap-2.5">
        <Pill variant="status">운영 완료 · 만족도 4.71</Pill>
        <Pill variant="dark">2025.05 — 10</Pill>
        <Pill variant="outline-dark">KERIS · 교육부</Pill>
        <Pill variant="outline-dark">9.09 억 원</Pill>
      </div>

      <h3 className="mb-3.5 text-[22px] font-bold leading-[1.3] tracking-tight-3 text-white md:text-[28px]">
        {project.title}
      </h3>

      <p className="mb-6 max-w-3xl text-[15px] leading-[1.6] text-white/85">
        9억 원 규모 3자 컨소시엄 50% 주관 사업의 PM. 부산·울산·경남 4권역 초중등 교원 1,216명을 대상으로
        원격·집합연수를 운영하여 만족도 4.71 달성. 사업 제안 및 발표, 운영 기획 및 실무, 강사 관리 및
        정산까지 전 과정 총괄 수행.
      </p>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.3fr_1fr]">
        <div>
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/50">
            주요 성과 (PM 운영 정점)
          </div>
          <ul className="list-none">
            {HERO_ACHIEVEMENTS.map((a, idx) => (
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

          <div className="mb-3 mt-6 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/50">
            컨소시엄 구성 (3자)
          </div>
          <div className="flex flex-wrap gap-1.5">
            {HERO_CONSORTIUM.map((member) => {
              const isSelf = member.includes('엘리스');
              return (
                <span
                  key={member}
                  className={`rounded-full border px-2.5 py-1 text-[11px] ${
                    isSelf
                      ? 'border-accent bg-accent font-semibold text-white'
                      : 'border-white/15 bg-white/[0.08] font-medium text-white/85'
                  }`}
                >
                  {member}
                </span>
              );
            })}
          </div>
        </div>

        <div>
          <div
            className="grid grid-cols-2"
            style={{ borderTop: '1px solid rgba(255,255,255,0.15)', borderBottom: '1px solid rgba(255,255,255,0.15)' }}
          >
            <DarkStatCell label="사업 규모" value="9.09 억" rightBorder />
            <DarkStatCell label="수강자" value="1,216 명" />
            <DarkStatCell label="만족도" value="4.71 / 5.0" rightBorder />
            <DarkStatCell label="권역" value="4 권역" />
          </div>
        </div>
      </div>
    </article>
  );
}

// Hero 카드 콘텐츠 (CSV로 빼기엔 컴포넌트 종속도가 높아서 컴포넌트 안에 유지)
const HERO_ACHIEVEMENTS = [
  '부산·울산·경남 4권역 초중등 교원 1,216명 대상 원격·집합연수 운영',
  'AI 디지털 협업 도구 활용 수업 설계 + 학생 사회정서성장 교육 결합 모델',
  '사업 제안·발표부터 운영 기획·실무, 강사 관리·정산까지 전 과정 총괄',
  '사후 만족도 4.71 / 5.0 달성 — 직전 사업 4.40 대비 0.31점 상승',
];

const HERO_CONSORTIUM = ['엘리스그룹 (주관 50%)', 'KT CS', '한국표준협회'];

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
  stats: StatItem[];
}) {
  // 카드별 특수 처리
  const isConsortium = project.id === 'keris-2026-leading-teacher';
  const isKice = project.id === 'kice-2026-ai-assistant';
  // 첫 pill을 status-line(파란 외곽) 변형으로 표시할 카드
  const useStatusFirstPill = isConsortium || isKice;
  // 6자 컨소시엄은 CSV 제목("2026 인공지능 활용 선도교사 연수")에 "양성" 추가
  const displayTitle = isConsortium
    ? '2026 인공지능 활용 선도교사 양성 연수'
    : project.title;

  return (
    <article className="flex flex-col border border-gray-4 bg-bg-card p-7">
      <div className="mb-3.5 flex flex-wrap items-center gap-2">
        {pills.map((p, idx) => (
          <Pill
            key={p}
            variant={useStatusFirstPill && idx === 0 ? 'status-line' : 'outline'}
          >
            {p}
          </Pill>
        ))}
      </div>

      <div className="mb-3 text-[18px] font-bold leading-[1.35] tracking-tight-2 text-navy-deep">
        {displayTitle}
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
              <div
                className={`num mt-1 font-bold tracking-tight-2 text-navy-deep ${
                  s.small ? 'text-[13px]' : 'text-base'
                }`}
              >
                {s.value}
                {s.sub && (
                  <div className="mt-0.5 text-[11px] font-medium tracking-normal text-gray-1">
                    {s.sub}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
}

// 카드 highlight 텍스트 확장 (시안의 카피라이팅)
function expandedHighlight(project: Project): string {
  const overrides: Record<string, string> = {
    'busan-2025-three-projects':
      'AIDT 도입 대비 부산광역시 초등·고등·특수 교원 대상 거점형 연수. 해운대·북부교육지원청 초등 / 고등·특수(초등) 3개 사업 동시 진행. 사업 제안서 작성·발표·기술협상부터 컨소시엄 구성, 온라인 플랫폼 운영, 예산 조정까지 PM 수준으로 운영.',
    'keris-2026-leading-teacher':
      '주관기관으로 서울권 사범대학과의 컨소시엄 구축 및 연수 경험이 풍부한 5개 기관의 R&R과 지분을 조율한 거버넌스 초안 마련. 호남권 우선협상대상자 선정 완료. 예산산출내역서, 공모 신청서 초안, 권역 분할 전략 설계.',
    'kosac-2025-school-consulting':
      '전국 3개 권역 130개교 디지털 전환 종합 컨설팅의 PL. 모집 목표 130개교 → 실적 134개교(103%) 초과 달성. 학교 대상 컨설팅 교원 섭외와 리더 교원 주도 커리큘럼 제안까지 일괄 설계.',
    'kosac-2026-aidonghaeng':
      'Agent AI를 키워드로 한 정부 발주 사업의 80% 주관 총괄 PM. 전국 학생 대상 교육 프로그램 + 해커톤·데모데이 운영. 프로그램 기획·강사 네트워크·운영 체계 설계까지 단독 수행. 가장 최신 사업.',
    'asia-platek-smartschool':
      '지역아동센터 기반 취약계층 아동 300명 대상 멘토링 사업. 첫 해 1억 → 2년차 2,200만 → 3년차 2.5억으로 신뢰 누적 모델. 첫 해 만족도 데이터가 다음 해 추가 발주의 근거가 된 사이클의 원형.',
    'kice-2026-ai-assistant':
      '교육행정 혁신을 위한 ISMP 기반 AI보조교사 서비스 모델 개발 사업의 제안 PL. 제안서 작성·발표·기술협상까지 수주 단계 전 과정 수행. 교육부 산하 KICE 발주.',
  };
  return overrides[project.id] ?? project.highlight;
}

// ============== Pill component ==============
type PillVariant = 'outline' | 'dark' | 'status' | 'outline-dark' | 'status-line';

function Pill({ children, variant = 'outline' }: { children: React.ReactNode; variant?: PillVariant }) {
  const styles: Record<PillVariant, string> = {
    outline: 'border-gray-4 bg-transparent text-navy-mid',
    dark: 'border-white/20 bg-white/[0.12] text-white',
    status: 'border-accent bg-accent text-white',
    'outline-dark': 'border-white/20 bg-transparent text-gray-2',
    'status-line': 'border-accent bg-transparent text-accent',
  };
  return (
    <span
      className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] ${styles[variant]}`}
    >
      {children}
    </span>
  );
}
