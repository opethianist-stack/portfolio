import type { Profile } from '@/lib/types';

interface FooterProps {
  profile: Profile;
}

export default function Footer({ profile }: FooterProps) {
  return (
    <footer id="contact" className="bg-navy-deep pb-10 pt-24 text-white">
      <div className="container-page">
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-16 md:grid-cols-[1.2fr_1fr] md:gap-16">
          <div>
            <div className="mb-3.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/50">
              Contact
            </div>
            <h2 className="mb-4.5 text-[28px] font-bold leading-[1.25] tracking-tight-3 text-white md:text-[36px] lg:text-[40px]">
              공교육·고등교육의 다음 사업,
              <br />
              함께 설계해보고 싶습니다.
            </h2>
            <p className="max-w-md text-[15px] leading-[1.65] text-white/70">
              AI·디지털 교육사업 개발에 관심 있는 기관·기업의 연락을 환영합니다. B2G 제안·컨소시엄
              거버넌스·교원연수 운영 등 어느 단계에서든 협업할 수 있습니다.
            </p>
          </div>

          <div className="flex flex-col gap-4.5">
            <InfoRow label="Name" value={`${profile.name} · ${profile.name_en}`} />
            <InfoRow label="Email" value={profile.email} />
            <InfoRow label="Phone" value={profile.phone} />
            <InfoRow label="Location" value={profile.location} last />
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-2 pt-10 text-xs text-white/40 sm:flex-row sm:items-center">
          <div>© 2026 Song Museok. All rights reserved.</div>
          <div>Last updated · 2026.05.08</div>
        </div>
      </div>
    </footer>
  );
}

function InfoRow({ label, value, last = false }: { label: string; value: string; last?: boolean }) {
  return (
    <div className={last ? '' : 'border-b border-white/10 pb-3.5'}>
      <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/50">
        {label}
      </div>
      <div className="text-[15px] font-medium text-white">{value}</div>
    </div>
  );
}
