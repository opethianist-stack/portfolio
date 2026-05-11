const NAV_ITEMS = [
  { href: '#dashboard', label: '사업 개요' },
  { href: '#career', label: '경력' },
  { href: '#clients', label: '발주처' },
  { href: '#projects', label: '프로젝트' },
  { href: '#competencies', label: '역량' },
  { href: '#contact', label: '연락' },
];

export default function Nav() {
  return (
    <nav
      className="sticky top-0 z-50 border-b border-gray-5"
      style={{
        background: 'rgba(250, 251, 252, 0.88)',
        backdropFilter: 'saturate(180%) blur(10px)',
        WebkitBackdropFilter: 'saturate(180%) blur(10px)',
      }}
      aria-label="섹션 네비게이션"
    >
      <div className="mx-auto flex max-w-container items-center justify-between px-6 py-3.5">
        <div className="text-[15px] font-bold tracking-tight-2 text-navy-deep">
          송무석
          <span className="mx-2 font-normal text-gray-3">·</span>
          <span className="text-[13px] font-medium text-gray-2">
            B2G/B2B 교육사업 제안 및 운영 전문가
          </span>
        </div>
        <ul className="hidden gap-7 md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-[13px] font-medium tracking-[-0.005em] text-navy-mid transition-colors hover:text-navy-deep"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
