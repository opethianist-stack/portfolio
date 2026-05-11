import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Dashboard from '@/components/Dashboard';
import CareerTimeline from '@/components/CareerTimeline';
import ClientMatrix from '@/components/ClientMatrix';
import Projects from '@/components/Projects';
import Competencies from '@/components/Competencies';
import Expertise from '@/components/Expertise';
import Principles from '@/components/Principles';
import Footer from '@/components/Footer';
import portfolioData from '@/data/portfolio.json';
import type { PortfolioData } from '@/lib/types';

const data = portfolioData as PortfolioData;

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Dashboard
          clients={data.client_portfolio}
          roles={data.role_distribution}
          satisfaction={data.satisfaction_trend}
        />
        <CareerTimeline items={data.career_timeline} />
        <ClientMatrix items={data.client_portfolio} />
        <Projects projects={data.projects} />
        <Competencies items={data.competencies} />
        <Expertise expertise={data.domain_expertise} />
        <Principles items={data.working_principles} />
      </main>
      <Footer profile={data.profile} />
    </>
  );
}
