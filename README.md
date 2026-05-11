# 송무석 포트폴리오 (Next.js 14)

공교육·고등교육의 AI·디지털 전환을 잇는 B2G/B2B 교육사업 제안 및 운영 전문가 송무석의 포트폴리오 사이트.

---

## 🎯 가장 자주 하실 작업: 데이터 수정

이 사이트의 모든 콘텐츠는 **`content/` 폴더 안의 CSV/YAML 파일**에 들어 있습니다. 프로젝트가 추가되거나 KPI를 갱신하고 싶으시면 GitHub 웹에서 그 파일들만 수정하시면 됩니다. 코드는 건드리실 일이 없습니다.

| 파일 | 무엇이 들어있나 | 형식 |
|---|---|---|
| `content/projects.csv` | 프로젝트 19건 (제목·발주처·금액·만족도·역할 등) | CSV → 엑셀로 열기 |
| `content/clients.csv` | 발주처 6개 (KERIS, KOSAC, ...) | CSV |
| `content/satisfaction.csv` | 만족도 시계열 4건 (라인 차트 데이터) | CSV |
| `content/career.csv` | 경력 3건 | CSV |
| `content/competencies.csv` | 직무 역량 6×4 | CSV |
| `content/roles.csv` | 역할 분포 (도넛 차트 데이터) | CSV |
| `content/profile.yaml` | 프로필·KPI·도메인 전문성·일하는 원칙 (긴 글) | YAML |

### 데이터 수정 → 사이트 반영 흐름

```
무석님이 GitHub 웹에서 content/projects.csv 수정
        ↓
"Commit changes" 클릭
        ↓
Vercel이 자동 감지 → 1~2분 후 사이트 자동 재배포 완료
```

이게 끝입니다. 직접 컴퓨터에서 빌드하거나 명령어를 실행할 필요가 없습니다.

### CSV 수정 팁

**엑셀로 열기**: GitHub에서 CSV 파일을 다운로드 → 엑셀로 열기 → 수정 → 저장 → GitHub에 업로드(덮어쓰기). 한글이 깨지지 않게 모든 CSV는 UTF-8 BOM으로 저장돼 있습니다.

**또는 GitHub 웹에서 직접**: 파일 클릭 → 우측 연필(✏️) 아이콘 → 텍스트로 직접 수정 → Commit.

**배열 셀 (consortium, achievements, tags 등)**: 한 셀 안에 여러 항목을 넣을 때는 ` | ` (파이프)로 구분합니다. 예: `건국대학교 (주관) | 비상교육 | 창비교육`

**CSV 문법 주의사항**:
- 셀 안에 콤마(,)가 들어가면 `"`로 감싸기 (엑셀이 자동 처리)
- 한 셀에 줄바꿈 넣지 말기
- 헤더 행은 절대 건드리지 말기

### YAML 수정 팁 (`profile.yaml`)

YAML은 들여쓰기가 문법입니다. 다음 두 가지만 지키시면 됩니다:
- **들여쓰기는 스페이스 2칸** (탭 사용 금지)
- **콜론 다음에는 한 칸 띄우기**: `name: 송무석` (✓), `name:송무석` (✗)

긴 문장(`description`)은 `|-` 다음 줄에 들여쓰기로 작성합니다 — 파일에 이미 예시가 있습니다.

---

## 🚀 처음 배포하기 (GitHub + Vercel)

이미 GitHub repo에 push해두셨다면 다음 단계만 하시면 됩니다:

1. [vercel.com](https://vercel.com)에 GitHub 계정으로 로그인
2. **Add New → Project → Import Git Repository**에서 이 레포지토리 선택
3. Framework: **Next.js** 자동 감지됨 — 그대로 **Deploy** 클릭
4. 1~2분 후 `https://<repo-name>.vercel.app`에서 사이트 확인 가능

이후 GitHub `main` 브랜치에 변경이 push될 때마다 Vercel이 자동 재배포합니다.

---

## 🛠 기술 스택 (참고)

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Pretendard** (한글 폰트, CDN)
- 차트는 외부 라이브러리 없이 inline SVG / CSS로 구현
- 데이터 변환: `papaparse` (CSV) + `js-yaml` (YAML) — 빌드 시점에만 사용

---

## 📁 디렉토리 구조

```
portfolio-nextjs/
├── content/                  ⭐️ 무석님이 수정하시는 곳
│   ├── projects.csv
│   ├── clients.csv
│   ├── satisfaction.csv
│   ├── career.csv
│   ├── competencies.csv
│   ├── roles.csv
│   └── profile.yaml
├── scripts/
│   └── build-data.mjs        # CSV/YAML → JSON 변환 (자동 실행, 손대지 않기)
├── data/
│   └── portfolio.json        # 자동 생성됨 (git 미추적)
├── app/                      # 페이지 라우팅
├── components/               # UI 컴포넌트
│   ├── Hero.tsx, Dashboard.tsx
│   ├── charts/{BarChart,DonutChart,LineChart}.tsx
│   ├── CareerTimeline.tsx, ClientMatrix.tsx
│   ├── FeaturedProjects.tsx, ProjectList.tsx, Projects.tsx
│   ├── Competencies.tsx, Expertise.tsx, Principles.tsx
│   └── Footer.tsx
├── lib/types.ts              # TypeScript 타입 정의
├── package.json
└── ...
```

---

## 💻 로컬에서 실행하기 (선택)

웹에서 작업하셔도 충분하지만, 로컬에서 미리보고 싶으실 때:

```bash
# 1. 의존성 설치 (최초 1회)
npm install

# 2. 개발 서버 실행 → http://localhost:3000
npm run dev

# 3. 정적 빌드 미리보기
npm run build && npm run start
```

> Node.js 18.17 이상 필요.

`npm run dev`나 `npm run build` 실행 시 자동으로 `content/` → `data/portfolio.json` 변환이 먼저 돌아갑니다 (`predev`/`prebuild` 훅).

---

## ❓ 문제 해결

| 증상 | 해결 |
|---|---|
| 빌드 실패: "CSV 파일을 찾을 수 없습니다" | `content/` 폴더와 그 안의 7개 파일이 모두 있는지 확인 |
| 한글이 깨져 보임 | CSV를 엑셀에서 저장할 때 "CSV UTF-8 (쉼표로 분리)" 형식으로 저장 |
| `profile.yaml` 수정 후 빌드 실패 | 들여쓰기(스페이스 2칸)와 콜론 뒤 띄어쓰기 확인. [yamlchecker.com](https://yamlchecker.com)에서 문법 검사 가능 |
| Vercel 배포 후 화면이 깨져 보임 | Pretendard CDN 로딩 지연일 수 있음. 새로고침으로 보통 해결 |
| 차트 데이터가 안 보임 | `satisfaction.csv` / `roles.csv` / `clients.csv`의 숫자 컬럼에 따옴표나 한글이 섞이지 않았는지 확인 |

---

## 📜 라이선스

개인 포트폴리오 — 무단 복제 금지.
