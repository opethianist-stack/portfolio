import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '송무석 포트폴리오 | B2G/B2B 교육사업 제안 및 운영 전문가',
  description:
    'KERIS·KOSAC·KICE·KPF·시도교육청 등 정부 산하기관 발주 사업에서 단독 PM·PL·주관기관 역할로 누적 80억 원 이상의 사업을 제안·수주·운영해 온 B2G/B2B 교육사업 제안 및 운영 전문가 송무석의 포트폴리오.',
  authors: [{ name: 'Song Museok' }],
  openGraph: {
    title: '송무석 포트폴리오',
    description: '공교육·고등교육의 AI·디지털 전환을 잇는 교육사업 제안 및 운영 전문가',
    type: 'profile',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="font-sans">{children}</body>
    </html>
  );
}
