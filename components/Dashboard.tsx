import SectionHeader from './SectionHeader';
import BarChart from './charts/BarChart';
import DonutChart from './charts/DonutChart';
import LineChart from './charts/LineChart';
import type { ClientItem, RoleSlice, SatisfactionPoint } from '@/lib/types';

interface DashboardProps {
  clients: ClientItem[];
  roles: RoleSlice[];
  satisfaction: SatisfactionPoint[];
}

export default function Dashboard({ clients, roles, satisfaction }: DashboardProps) {
  return (
    <section id="dashboard" className="border-b border-gray-5 py-24">
      <div className="container-page">
        <SectionHeader
          num="01 / Overview"
          title="운영 사업 이력"
          desc="발주처별 사업 총액, 역할 구성, 만족도 추이를 정리했습니다."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <BarChart data={clients} />
          <DonutChart data={roles} />
          <LineChart data={satisfaction} />
        </div>
      </div>
    </section>
  );
}
