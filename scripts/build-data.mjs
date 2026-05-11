/**
 * scripts/build-data.mjs
 *
 * content/ 디렉토리의 CSV + YAML 파일들을 읽어
 * data/portfolio.json 으로 합쳐 출력합니다.
 *
 * 빌드 시점에 자동으로 실행됩니다 (package.json의 prebuild 훅 참고).
 * 사용자는 이 파일을 직접 만질 필요가 없습니다 — content/ 안의 CSV들만 수정하면 됩니다.
 */

import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import yaml from 'js-yaml';

const ROOT = path.resolve(process.cwd());
const CONTENT_DIR = path.join(ROOT, 'content');
const OUTPUT_PATH = path.join(ROOT, 'data', 'portfolio.json');

// ──────────────────────────────────────────────
// 유틸리티
// ──────────────────────────────────────────────

function readCsv(filename) {
  const filepath = path.join(CONTENT_DIR, filename);
  if (!fs.existsSync(filepath)) {
    throw new Error(`CSV 파일을 찾을 수 없습니다: ${filepath}`);
  }
  // utf-8 BOM 자동 처리
  const raw = fs.readFileSync(filepath, 'utf8').replace(/^\uFEFF/, '');
  const result = Papa.parse(raw, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: false, // 숫자 변환은 직접 처리 (예측 가능성)
  });
  if (result.errors.length > 0) {
    console.warn(`⚠️  ${filename} 파싱 경고:`, result.errors);
  }
  return result.data;
}

function readYaml(filename) {
  const filepath = path.join(CONTENT_DIR, filename);
  if (!fs.existsSync(filepath)) {
    throw new Error(`YAML 파일을 찾을 수 없습니다: ${filepath}`);
  }
  const raw = fs.readFileSync(filepath, 'utf8');
  return yaml.load(raw);
}

// 배열 셀: "A | B | C" → ["A", "B", "C"]
function splitArray(cell) {
  if (!cell || typeof cell !== 'string') return [];
  return cell
    .split('|')
    .map((s) => s.trim())
    .filter(Boolean);
}

function toNumber(v, fallback = null) {
  if (v === '' || v === null || v === undefined) return fallback;
  const n = typeof v === 'number' ? v : parseFloat(v);
  return Number.isNaN(n) ? fallback : n;
}

function toBool(v) {
  if (typeof v === 'boolean') return v;
  if (typeof v === 'string') return v.trim().toLowerCase() === 'true';
  return false;
}

function nonEmpty(v) {
  return v !== '' && v !== null && v !== undefined;
}

// ──────────────────────────────────────────────
// 변환 로직
// ──────────────────────────────────────────────

function buildProjects() {
  const rows = readCsv('projects.csv');
  return rows.map((r) => {
    const project = {
      id: r.id,
      title: r.title,
      client: r.client,
      ministry: r.ministry,
      company: r.company,
      period: r.period,
      amount: r.amount,
      amount_billion: toNumber(r.amount_billion),
      share: r.share,
      role: r.role,
      status: r.status,
      highlight: r.highlight,
      consortium: splitArray(r.consortium),
      achievements: splitArray(r.achievements),
      tags: splitArray(r.tags),
    };
    // 선택적 필드 (값이 있을 때만 추가)
    if (nonEmpty(r.trainees)) project.trainees = toNumber(r.trainees);
    if (nonEmpty(r.trainees_unit)) project.trainees_unit = r.trainees_unit;
    if (nonEmpty(r.satisfaction)) project.satisfaction = toNumber(r.satisfaction);
    if (nonEmpty(r.show_in_projects)) project.show_in_projects = toBool(r.show_in_projects);
    return project;
  });
}

function buildClients() {
  const rows = readCsv('clients.csv');
  return rows.map((r) => {
    const c = {
      client: r.client,
      ministry: r.ministry,
      projects_count: toNumber(r.projects_count, 0),
      total_amount_billion: toNumber(r.total_amount_billion, 0),
      key_role: r.key_role,
    };
    if (nonEmpty(r.details)) c.details = r.details;
    return c;
  });
}

function buildSatisfaction() {
  const rows = readCsv('satisfaction.csv');
  return rows.map((r) => {
    const point = {
      year: r.year,
      project: r.project,
      score: toNumber(r.score, 0),
      scale: toNumber(r.scale, 5),
      client: r.client,
      trainees: toNumber(r.trainees, 0),
    };
    if (nonEmpty(r.trainees_label)) point.trainees_label = r.trainees_label;
    return point;
  });
}

function buildCareer() {
  const rows = readCsv('career.csv');
  return rows.map((r) => {
    const c = {
      company: r.company,
      role: r.role,
      period: r.period,
      duration: r.duration,
      summary: r.summary,
      color: r.color || 'primary',
    };
    if (nonEmpty(r.show_in_timeline)) c.show_in_timeline = toBool(r.show_in_timeline);
    return c;
  });
}

function buildCompetencies() {
  const rows = readCsv('competencies.csv');
  return rows.map((r) => ({
    category: r.category,
    level: toNumber(r.level, 5),
    items: splitArray(r.items),
  }));
}

function buildRoles() {
  const rows = readCsv('roles.csv');
  return rows.map((r) => ({
    role: r.role,
    count: toNumber(r.count, 0),
    label: r.label,
  }));
}

function buildProfileBlocks() {
  const profileData = readYaml('profile.yaml');
  return {
    profile: profileData.profile,
    kpis: profileData.kpis,
    domain_expertise: {
      title: profileData.domain_expertise_title,
      items: profileData.domain_expertise,
    },
    working_principles: profileData.working_principles,
  };
}

// ──────────────────────────────────────────────
// 메인
// ──────────────────────────────────────────────

function main() {
  console.log('📂 content/ → data/portfolio.json 변환 시작...\n');

  const profileBlocks = buildProfileBlocks();
  const projects = buildProjects();
  const clients = buildClients();
  const satisfaction = buildSatisfaction();
  const career = buildCareer();
  const competencies = buildCompetencies();
  const roles = buildRoles();

  const merged = {
    profile: profileBlocks.profile,
    kpis: profileBlocks.kpis,
    career_timeline: career,
    client_portfolio: clients,
    satisfaction_trend: satisfaction,
    role_distribution: roles,
    projects: projects,
    competencies: competencies,
    domain_expertise: profileBlocks.domain_expertise,
    working_principles: profileBlocks.working_principles,
  };

  // 출력 디렉토리 보장
  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(merged, null, 2) + '\n', 'utf8');

  // 요약 출력
  console.log(`✓ projects:     ${projects.length}건`);
  console.log(`✓ clients:      ${clients.length}건`);
  console.log(`✓ satisfaction: ${satisfaction.length}건`);
  console.log(`✓ career:       ${career.length}건`);
  console.log(`✓ competencies: ${competencies.length}건`);
  console.log(`✓ roles:        ${roles.length}건`);
  console.log(`✓ profile, kpis, domain_expertise, working_principles (from profile.yaml)`);
  console.log(`\n📄 출력: ${path.relative(ROOT, OUTPUT_PATH)} (${fs.statSync(OUTPUT_PATH).size.toLocaleString()} bytes)`);
}

try {
  main();
} catch (e) {
  console.error('\n❌ 데이터 빌드 실패:', e.message);
  console.error(e.stack);
  process.exit(1);
}
