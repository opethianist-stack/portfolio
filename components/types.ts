// 포트폴리오 데이터 타입 정의 (data/portfolio.json에 대응)

export interface Profile {
  name: string;
  name_en: string;
  headline: string;
  subheadline: string;
  email: string;
  phone: string;
  location: string;
  links: {
    github: string;
    linkedin: string;
    remember: string;
  };
  education: string;
  languages: string[];
}

export interface KPI {
  value: number | string;
  unit: string;
  label: string;
  note?: string;
}

export interface KPIs {
  total_business_amount: KPI;
  total_projects: KPI;
  average_satisfaction: KPI;
  total_trainees: KPI;
  career_years: KPI;
}

export interface CareerItem {
  company: string;
  role: string;
  period: string;
  duration: string;
  summary: string;
  color: 'primary' | 'secondary' | 'muted';
  show_in_timeline?: boolean;
  show_in_projects?: boolean;
}

export interface ClientItem {
  client: string;
  ministry: string;
  projects_count: number;
  total_amount_billion: number;
  key_role: string;
  details?: string;
}

export interface SatisfactionPoint {
  year: string;
  project: string;
  score: number;
  scale: number;
  client: string;
  trainees: number;
  trainees_label?: string;
}

export interface RoleSlice {
  role: string;
  count: number;
  label: string;
}

export interface Project {
  id: string;
  title: string;
  client: string;
  ministry: string;
  company: string;
  period: string;
  amount: string;
  amount_billion?: number;
  share: string;
  role: string;
  status: string;
  trainees?: number;
  trainees_unit?: string;
  satisfaction?: number;
  consortium?: string[];
  achievements: string[];
  highlight: string;
  tags: string[];
}

export interface Competency {
  category: string;
  level: number;
  items: string[];
}

export interface DomainItem {
  label: string;
  description: string;
}

export interface DomainExpertise {
  title: string;
  items: DomainItem[];
}

export interface Principle {
  title: string;
  description: string;
}

export interface PortfolioData {
  profile: Profile;
  kpis: KPIs;
  career_timeline: CareerItem[];
  client_portfolio: ClientItem[];
  satisfaction_trend: SatisfactionPoint[];
  role_distribution: RoleSlice[];
  projects: Project[];
  competencies: Competency[];
  domain_expertise: DomainExpertise;
  working_principles: Principle[];
}
