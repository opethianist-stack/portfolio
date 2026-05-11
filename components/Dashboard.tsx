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
          title="사업 개요"
          desc="누적 사업 규모, 역할 구성, 그리고 만족도의 시간적 추이를 한 화면에 정리했습니다. 2024년 첫 KERIS 사업의 만족도 4.4점에서 2025년 4.67점까지 추세가 일관되게 상승했습니다."
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
