import type { Project } from '@/lib/types';

interface ProjectListProps {
  projects: Project[];
  excludeIds: string[]; // 핵심 5건 ID
}

// 발주처 표시명 단축
const shortClient = (project: Project): string => {
  const c = project.client;
  if (c.includes('한국교육학술정보원')) return 'KERIS';
  if (c.includes('한국과학창의재단')) return 'KOSAC';
  if (c.includes('한국언론진흥재단')) return 'KPF';
  if (c.includes('한국교육과정평가원')) return 'KICE';
  return c;
};

// 시기 표시 가공
const periodShort = (period: string): string => {
  // "2025.05 ~ 2025.10" → "2025.05 — 10"
  const m = period.match(/^(\d{4})\.(\d{2})\s*~\s*(\d{4})\.(\d{2})$/);
  if (m) {
    if (m[1] === m[3]) return `${m[1]}.${m[2]} — ${m[4]}`;
    return `${m[1]}.${m[2]} — ${m[3]}.${m[4]}`;
  }
  return period;
};

// 금액 표시 (억 단위)
const amountShort = (project: Project): string | null => {
  if (!project.amount_billion) return null;
  const v = project.amount_billion;
  if (v < 1) return v.toFixed(2);
  if (v < 10) return v.toFixed(2);
  return v.toFixed(1);
};

export default function ProjectList({ projects, excludeIds }: ProjectListProps) {
  const remaining = projects.filter((p) => !excludeIds.includes(p.id));
  const elise = remaining.filter((p) => p.company === '엘리스그룹');
  const asia = remaining.filter((p) => p.company === '아시아교육협회');

  return (
    <div className="mt-16">
      <div
        className="mb-4.5 flex items-baseline gap-3 pb-3"
        style={{ borderBottom: '1px solid #1a1f30' }}
      >
        <h3 className="text-base font-bold tracking-tight-2 text-navy-deep">그 외 사업 14건</h3>
        <span className="text-[13px] font-medium text-gray-1">
          엘리스그룹 {elise.length}건 + 아시아교육협회 {asia.length}건 · 연도 역순
        </span>
      </div>

      {elise.map((p) => (
        <ProjectRow key={p.id} project={p} />
      ))}

      {/* Section divider for 아시아교육협회 */}
      <div className="-mx-4 my-4 grid grid-cols-[60px_1fr] gap-4 bg-gray-6 p-4 sm:grid-cols-[100px_1fr]">
        <div className="text-xs font-bold uppercase tracking-[0.08em] text-accent">— ASIA</div>
        <div className="text-xs font-medium text-gray-1">
          아시아교육협회 (2021~2024) · K-12 교육격차 해소 사업 + 회원대학 채널 관리
        </div>
      </div>

      {asia.map((p) => (
        <ProjectRow key={p.id} project={p} />
      ))}
    </div>
  );
}

function ProjectRow({ project }: { project: Project }) {
  const amount = amountShort(project);
  const isMultiYear = project.amount.includes('2개년') || project.amount.includes('연속');

  return (
    <div className="grid grid-cols-[60px_1fr] gap-4 border-b border-gray-5 py-4 last:border-b-0 lg:grid-cols-[100px_1fr_200px_140px_80px] lg:items-center lg:gap-4">
      {/* Year */}
      <div className="num text-xs font-semibold tracking-[0.04em] text-gray-2">
        {periodShort(project.period)}
      </div>

      {/* Title block (always visible) */}
      <div className="lg:contents">
        <div>
          <div className="text-sm font-semibold leading-[1.4] tracking-[-0.005em] text-navy-deep">
            {project.title}
          </div>
          {/* mobile-only meta */}
          <div className="mt-1.5 flex flex-wrap gap-3 text-xs text-gray-1 lg:hidden">
            {amount && <span className="font-semibold text-navy-mid">{amount} 억</span>}
            {!amount && isMultiYear && (
              <span className="font-semibold text-navy-mid">2개년 사업</span>
            )}
            <span className="font-semibold text-navy-mid">{project.role}</span>
          </div>
        </div>

        {/* Client (lg+) */}
        <div className="hidden text-xs leading-[1.4] text-gray-1 lg:block">
          {shortClient(project)} · {project.ministry}
          <br />
          <span className="text-gray-2">
            {project.company} · {project.share}
          </span>
        </div>

        {/* Amount (lg+) */}
        <div className="hidden text-right lg:block">
          {amount ? (
            <div className="num text-[13px] font-semibold text-navy">
              {amount}
              <span className="ml-0.5 text-[11px] font-medium text-gray-2">억</span>
            </div>
          ) : (
            <div className="text-[11px] text-gray-1">{isMultiYear ? '2개년 사업' : '사무국 운영'}</div>
          )}
        </div>

        {/* Role (lg+) */}
        <div className="hidden text-right text-[11px] leading-[1.4] text-gray-1 lg:block">
          {project.role}
          <br />
          <span className="text-gray-2">{project.status}</span>
        </div>
      </div>
    </div>
  );
}
