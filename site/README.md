# KDIS Alumni Policy Network — 웹사이트

정적 사이트입니다. 서버도 프레임워크도 없고, `site/` 폴더를 그대로 올리면 동작합니다.

```
site/
├── index.html            ① Competition — 첫 페이지
├── conference.html       ② Conference — 강연 13개 아카이브
├── build.mjs             두 HTML을 생성하는 스크립트 (배포에는 포함되지 않음)
├── vercel.json           캐시·보안 헤더, cleanUrls
├── favicon.svg  robots.txt  sitemap.xml
├── assets/
│   ├── style.css         디자인 시스템 전체
│   ├── app.js            헤더·스크롤바·모바일 메뉴·포커스 관리
│   ├── waves.js          히어로 배경의 움직이는 등고선 (캔버스)
│   ├── motion.js         GSAP 스크롤 연출
│   ├── conference.js     세션 필터 + 영상 모달
│   └── vendor/           gsap, ScrollTrigger, lenis (로컬 사본)
└── media/
    └── thumbs/*.jpg      강연 썸네일 13개
                          (발표자료 PDF는 구글 드라이브에 있습니다 — 아래 참조)
```

## 고치는 방법

**문구·데이터를 바꿀 때는 `build.mjs`만 고칩니다.** 강연 목록, 상금, 일정, 심사기준이 모두 그 안에 한 번씩만 들어 있고, 두 페이지가 거기서 생성됩니다. HTML을 직접 고치면 다음 빌드에 덮어써집니다.

```bash
node build.mjs        # index.html, conference.html, robots.txt, sitemap.xml 재생성
```

`style.css`와 `assets/*.js`는 빌드 대상이 아니라 직접 고치는 파일입니다.

## 출시 전에 채워야 할 것

| 위치 | 내용 |
|---|---|
| `build.mjs` → `SITE_URL` | 실제 도메인. canonical·sitemap·robots에 쓰입니다 |
| 히어로 배경 | 지금은 벡터 등고선. 행사 사진으로 교체 가능 |

## Vercel 배포

프레임워크 감지 없이 정적으로 올라갑니다.

```bash
npm i -g vercel
cd site
vercel            # 첫 배포 (미리보기)
vercel --prod     # 운영 배포
```

Git 연동 시 **Root Directory를 `site`로**, Framework Preset은 **Other**, Build Command는 **비워두면** 됩니다. HTML이 이미 커밋되어 있어 빌드 단계가 필요 없습니다. `.vercelignore`가 `build.mjs`를 배포에서 제외합니다.

`vercel.json`이 하는 일:

- `cleanUrls` — `/conference.html` 대신 `/conference`
- 발표자료·썸네일·벤더 스크립트에 각각 다른 캐시 수명
- CSP, `X-Content-Type-Options`, `Referrer-Policy` 등 보안 헤더
  - CSP는 `youtube-nocookie.com`(영상)과 `fonts.googleapis.com`(폰트)만 외부로 허용합니다. **외부 스크립트를 추가하면 CSP도 같이 고쳐야** 로드됩니다.

### 배포 용량

약 **1MB**입니다. 발표자료 PDF(73MB)를 구글 드라이브로 옮기면서 저장소와 배포본 양쪽에서 빠졌습니다.

## 동작 방식에서 알아둘 것

**JS가 없어도 페이지는 완전합니다.** 강연 13개가 HTML에 정적으로 박혀 있어 검색엔진에도 그대로 잡히고, 스크립트가 실패해도 내용이 사라지지 않습니다. 애니메이션은 `motion.js`가 GSAP 로드를 확인한 뒤에만 `has-motion` 클래스를 붙이고, 스타일시트는 그 클래스가 있을 때만 요소를 숨깁니다.

**`prefers-reduced-motion: reduce`** 를 켠 사용자에게는 모든 애니메이션이 꺼집니다. 물결 배경은 한 프레임만 그리고 멈추고, GSAP은 아예 시작하지 않으며, 필터 전환도 즉시 바뀝니다.

**성능** — 물결 캔버스는 화면 밖으로 나가거나 탭이 비활성화되면 렌더링을 멈춥니다. 카드 transform은 GSAP이 단독으로 씁니다(CSS transition과 나눠 가지면 필터 전환이 튑니다).

**영상**은 `youtube-nocookie.com`으로 임베드하고, 모달을 닫을 때 iframe을 제거해 재생을 확실히 중단시킵니다.

영상 자리에는 해당 강연의 **스틸이 배경으로 깔려** 있고 아래에 "Watch it on YouTube" 링크가 항상 있습니다. 임베드가 느리거나 확장 프로그램에 막히거나 거부돼도 검은 공백 대신 그림과 대안이 남습니다.

⚠️ **HTML 파일을 더블클릭해서 (`file://`) 열면 영상이 재생되지 않습니다.** 출처(origin)가 `null`이 되어 YouTube가 임베드를 거부합니다. 로컬 확인은 반드시 서버를 띄워서 하세요:

```bash
cd site && python3 -m http.server 8000    # http://localhost:8000
```

## 알아둘 동작 (2026-08-29 추가)

**강연별 공유 링크** — 영상을 열면 주소가 `/conference#talk/<유튜브ID>`로 바뀝니다. 그 주소를 그대로 보내면 상대방에게 해당 영상 모달이 열린 채로 뜹니다. 뒤로가기로 닫히고, 공유 링크로 바로 들어온 경우에는 자동재생하지 않습니다(직접 클릭했을 때만 재생됩니다).

**마감 카운트다운** — 히어로의 카운트다운은 항상 **제출 마감일**(`build.mjs`의 `DEADLINE_AT`, 한국시간 기준 그날 끝까지)을 향합니다. 마감이 지나면 자동으로 "Submissions are closed"로 바뀌고 타이머가 멈춥니다. 날짜를 바꿀 때는 `DATES[1]`(화면 문구)과 `DEADLINE_AT`(기계 판독용) **둘 다** 고쳐야 합니다.

**영상 대체 링크** — 모달 하단에 항상 "Watch it on YouTube"가 있습니다. 영상이 내려가거나 비공개로 바뀌거나 임베드가 막혀도 사용자가 빠져나갈 길이 남습니다.

**발표자료** — 13개 PDF는 저장소에 없고 **구글 드라이브**에 있습니다. `build.mjs`의 `DRIVE` 표가 영상 ID ↔ 드라이브 파일 ID를 잇고, `slidesUrl()`이 `uc?export=download` 형태로 만듭니다. 이 형태는 드라이브 미리보기 페이지가 아니라 **파일을 첨부(content-disposition)로 내려주므로** 버튼 문구 그대로 다운로드가 됩니다.

파일을 교체하면 `DRIVE`의 해당 ID만 바꾸면 됩니다. 페이지 수·용량은 `design/slides/manifest.json`에서 오므로, 파일 내용이 바뀌면 그쪽도 갱신해야 표시가 맞습니다.

⚠️ **드라이브 공유 설정이 "링크가 있는 모든 사용자"여야 합니다.** 제한이 걸리면 다운로드가 조용히 로그인 화면으로 넘어갑니다. 2026-08-29 기준 13개 전부 공개 확인했습니다.

**제출 버튼** — 6곳 모두 `SUBMIT_URL`(구글 폼) 하나에서 나옵니다. `submitLink()` 헬퍼가 `target="_blank" rel="noopener"` 와 스크린리더용 "(opens in a new tab)" 안내를 함께 붙이므로, 주소를 바꿀 때는 상수 한 줄만 고치면 됩니다. 외부 링크 이동은 CSP `form-action`의 적용 대상이 아니라서 헤더는 손댈 필요가 없습니다.

**푸터 로고** — `media/kdis-logo.png`(560×141, 투명 PNG)를 **크림 판 위에** 얹었습니다. 로고의 짙은 초록이 푸터 배경(`#0E4E4A`)과 대비 **1.46:1**로 사실상 보이지 않기 때문입니다(크림 위에서는 6.30:1). KDIS에서 **흰색 녹아웃 버전**을 받으면 판 없이 배경에 바로 얹을 수 있습니다.

**명암비** — `--gray`는 `#696963`입니다. 이전 `#929289`는 크림 배경에서 3.03:1로 WCAG AA(4.5:1)에 미달했습니다. 이 색을 더 밝게 되돌리면 연사 소속·직위 텍스트가 기준 미달이 되니 주의하세요.
