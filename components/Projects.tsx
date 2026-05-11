import SectionHeader from './SectionHeader';
import FeaturedProjects from './FeaturedProjects';
import ProjectList from './ProjectList';
import type { Project } from '@/lib/types';

const FEATURED_IDS = [
  'keris-2026-leading-teacher',
  'keris-2025-ai-leading-teacher',
  'kosac-2025-school-consulting',
  'kosac-2026-aidonghaeng',
  'asia-platek-smartschool',
];

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  return (
    <section id="projects" className="border-b border-gray-5 py-24">
      <div className="container-page">
        <SectionHeader
          num="04 / Projects"
          title="핵심 프로젝트"
          desc="2024~2026년 주요 사업 19건 중 거버넌스·규모·만족도·신뢰 누적 측면에서 대표성 있는 5건을 선정했습니다. 이어 나머지 14건의 사업을 연도순으로 정리했습니다."
        />

        <FeaturedProjects projects={projects} />
        <ProjectList projects={projects} excludeIds={FEATURED_IDS} />
      </div>
    </section>
  );
}
