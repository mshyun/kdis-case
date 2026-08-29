# KDIS Alumni Policy Network — 설계 결정 기록

- **작성일**: 2026-08-28
- **산출물**: `prompts/claude-design-master-prompt.md` (Claude Design에 붙여넣을 마스터 프롬프트)
- **단계**: 디자인 목업 (코드 구현 전)

---

## 1. 무엇을 만드는가

KDI School(KDIS)의 행사용 웹사이트 2페이지.

| 페이지 | 아트보드 파일 | 역할 |
|---|---|---|
| ① Competition | `Main.dc.html` | 공모전 안내. 사이트의 첫 페이지이자 진입 아트보드 |
| ② Conference | `Conference.dc.html` | 2026년 4월 KDIS–ADB 공동 컨퍼런스 강연 영상 13개 + 발표자료 아카이브 |

**핵심 통찰 — 이 사이트의 정체성**

공모전 본문에 다음 문장이 있다:

> Keynote presentations and session videos from the April conference are available on the newly launched **Alumni Policy Network webpage**.
> The webpage will also allow you to explore cases submitted by fellow KDIS community members and exchange comments and feedback.

즉 이 사이트는 "영상 아카이브 + 공모전 안내"가 아니라 **Alumni Policy Network 그 자체**다. 공모전은 이 네트워크를 여는 첫 단계이고, 영상은 참가자가 학습할 재료다. 이 해석이 사이트명(`KDIS Alumni Policy Network`)과 히어로 카피의 근거이며, **Competition을 첫 페이지로 둔 이유**(D10)이기도 하다.

초기에는 이 문장을 근거로 Conference 페이지에 *Case Gallery — Coming Soon* 티저를 두었으나, 2026-08-28 해당 기능이 취소되어 섹션을 제거했다(D5 철회).

---

## 2. 데이터 출처와 검증

| 자료 | 경로 | 확보한 것 |
|---|---|---|
| 영상 목록 엑셀 | `.orca/drops/최종 영상제작 리스트.xlsx` | 세션·연사·직위·소속·강연제목·URL 13행 |
| 유튜브 oEmbed API | `youtube.com/oembed?url=...` | 13개 영상의 실제 업로드 제목·채널 |
| 구글 사이트 | `sites.google.com/kdis.ac.kr/kdispolicy26` | 임베드된 유튜브 ID 13개 |
| 참고 디자인 | `solveconference.ai.kr` + `/assets/style.css`, `/assets/main.js` | CSS 변수 원본값, 폰트 스택, 모션 패턴 |
| 공모전 본문 | 사용자 제공 | 전문 (요약 박스 포함) |

**교차 검증**: 구글 사이트에서 추출한 유튜브 ID 13개 = 엑셀 H열 URL 13개 = oEmbed 응답 13개. 세 출처가 완전히 일치하므로 데이터 신뢰도는 높다.

엑셀에는 `Opening Remarks` 행(김동일·김준경·Qingfeng Zhang)이 있으나 B열이 `편집x`이고 영상 URL이 없다. 영상이 존재하지 않으므로 사이트에서 제외한다.

### 발견된 데이터 이슈 4건

프롬프트에는 모두 **수정본**을 넣었다. 원문 유지가 필요하면 Appendix A를 되돌리면 된다.

| # | 엑셀 원문 | 프롬프트 반영 | 판단 |
|---|---|---|---|
| 1 | `Monitorning` | Monitoring | 명백한 오타 |
| 2 | `Droughts and Foods` | Droughts and Floods | 문맥상 홍수. AI 기반 지구관측 강연에서 "가뭄과 음식"은 성립하지 않음 |
| 3 | `SustainableVertical Farming` | Sustainable Vertical Farming | 띄어쓰기 누락 |
| 4 | `Asia Development Bank (ADB)` | Asian Development Bank (ADB) | 기관 정식 명칭. ADB가 파트너 기관이므로 정확도가 중요 |

### 그룹 구조 — "5개 카테고리"가 아니라 6개

최초 요청은 "5개 카테고리 13개 영상"이었으나, 실제 데이터는 **Keynote + Session 1~5 = 6개 그룹**이다.

| 그룹 | 영상 수 |
|---|---|
| Keynote | 1 |
| Session 1 — Smart Farming: Policy Pathways and Implementation Strategies | 4 |
| Session 2 — Bridging Technology and Research for Sustainable Agriculture | 2 |
| Session 3 — Private Innovators in Smart Farming | 2 |
| Session 4 — The Role of Communities and Social Trust in Successful Reforestation | 1 |
| Session 5 — Carbon Finance and Regional Investment: Integrating REDD+ and NbS | 3 |

엑셀 순서상 Keynote는 9번(Session 3과 4 사이)에 있다. 이는 행사 당일 진행 순서로 보이며, 웹사이트에서는 **콘텐츠 위계**를 따라 최상단으로 올린다.

---

## 3. 확정된 결정과 근거

| # | 결정 | 근거 |
|---|---|---|
| D1 | **영어 단독** | 영상 제목·연사 소속·공모전 본문이 전부 영어. 대상이 KDIS 국제 동문. 한국어를 섞으면 번역 부채만 생긴다 |
| D2 | **참고 사이트 팔레트 계승 + 모션 강화** | solveconference와 같은 KDIS 계열 행사이므로 시각적 일관성이 자산. 다만 참고 사이트는 "팬시"보다 절제된 에디토리얼에 가까워, 요청하신 인터랙티브함은 **모션 레이어**에서 확보한다 |
| D3 | **필터 그리드 + 모달 재생** | 13개는 한 화면에 조망 가능한 규모. 세션별 가로 레인은 영상 1개짜리 세션(S4)이 허전해지고, 시네마틱 스티키는 모바일 대응 비용이 크다 |
| D4 | **Keynote는 히어로로 승격** | Keynote는 Session 1~5와 같은 층위가 아니다 — 세션 트랙이 아니라 행사 전체를 여는 기조연설이다. 필터 칩으로 내려놓으면 이 위계가 사라지고 "클릭했더니 카드 1장"이 된다. 대형 피처 배너로 올리면 위계가 살아나고 필터는 동일 층위(세션 트랙)만 남는다. S4도 영상이 1개지만 세션 트랙이므로 필터에 그대로 둔다 |
| ~~D5~~ | ~~**Case Gallery는 Coming Soon 티저**~~ | **철회(2026-08-28)** — 기능이 취소되어 Conference 페이지에서 섹션을 제거했고, 이어서 주최측이 Competition 페이지의 "explore cases submitted by fellow KDIS community members…" 문장도 직접 삭제했다. 이제 사이트 어디에도 이 기능을 암시하는 문구가 없다. 프롬프트 APPENDIX B §4에는 주최측 원문이 보존돼 있으나 "페이지가 대체함" 경고를 달아 두었다 |
| D6 | **로고·사진은 라벨링된 플레이스홀더** | 자산이 추후 도착. 가짜 로고를 그리면 나중에 교체를 잊는다. 프롬프트에서 "슬롯으로 명시하라"고 강제 |
| D7 | **본문 폰트만 Roboto로 분리** | 참고 사이트는 `Roboto Condensed`가 본문. 그러나 페이지②는 장문 텍스트가 많아 condensed로는 가독성이 떨어진다. Display=Anton, Label/Subhead=Roboto Condensed, Body=Roboto로 3단 분리 |
| D8 | **발표자료 다운로드는 모달 안에** | 2026-08-28 추가 요청. 13개 talk 전부 PDF 발표자료가 있다. 카드에 두면 그리드가 시끄러워지고, 모달은 이미 "이 강연 한 건"의 상세 뷰이므로 다운로드의 제자리다. 버튼 아래 `PDF · n pages · n.n MB` 실측값을 함께 노출해 클릭 전에 무게를 알 수 있게 했다 |
| D9 | **PDF 파일 자체는 캔버스에 넣지 않음** | 13개 합계 72MB. 아티팩트 상한은 16MB이고, 아트보드는 샌드박스 iframe이라 파일을 서빙할 수 없다. 목업에는 버튼과 실측 메타데이터만 넣고, 실제 파일 전달은 배포 단계 몫으로 남긴다 |
| D10 | **Competition이 첫 페이지** | 2026-08-28 변경. 이 사이트가 존재하는 이유가 공모전 개시이고, 컨퍼런스 아카이브는 참가자가 참고할 재료다. 캔버스에서도 Competition을 맨 왼쪽에 두고 `Main.dc.html`(진입 아트보드)에 배치했다 |
| D11 | **"Sessions" → "Conference"** | 2026-08-28 변경. 페이지가 다루는 것은 4월 행사 전체이지 특정 세션이 아니다. 다만 **세션 트랙 표기는 그대로 둔다** — 통계행의 `5 SESSIONS`, 필터 칩 `SESSION 1~5`, 카드 태그는 5개 주제 트랙을 가리키는 정확한 용어다. 바뀐 것은 페이지 이름(내비게이션·섹션 제목)뿐이다 |
| D12 | **메인 메뉴를 탭 형태로 승격** | 2026-08-28 변경. 기존 13px 회색 링크는 유틸리티 링크처럼 읽혔다. 헤더 높이 전체를 차지하는 15px 탭으로 바꾸고, 활성 항목에 헤더 하단 罫선과 맞물리는 3px 틸 바를 붙였다. 비활성도 `gray`가 아닌 `gray-deep`으로 올려 "누를 수 있는 것"으로 보이게 했다 |
| D13 | **Competition 제목에서 ADB 제거** | 2026-08-28 변경. 히어로 표제는 `2026 KDIS POLICY INNOVATION CASE COMPETITION`. **공모전 공식 명칭은 여전히 "2026 KDIS–ADB Policy Innovation Case Competition"**이므로, 표제 외의 곳(설계 문서 제목, 공모전 원문 인용, 컨퍼런스명 `KDI School–ADB Joint Conference`)에서는 ADB를 유지한다 |
| D14 | **모바일 메뉴는 전체 화면 다크 시트** | 2026-08-28 추가. 목적지가 둘뿐이라 작은 드롭다운도 가능했지만, 사이트가 이미 오버레이=teal-forest 어법(플레이어 모달)을 쓰고 있어 그 언어를 재사용했다. 두 항목이 헤더와 CTA 사이 공간을 균등 분할(`flex:1`)하도록 해서, 항목만 위에 몰리고 아래에 300px 구멍이 남는 구성을 피했다. 항목마다 실제 정보 한 줄씩(접수 시기 / 강연·세션·자료 수)을 붙였다 — 채우기용 문구가 아니라 메뉴에서 판단에 쓰이는 사실이다 |
| D15 | **아트보드 프레임 상한 8000px** | 2026-08-28 발견. 시딩 헬퍼가 `w/h`를 120~8000으로 **조용히 클램프**한다(`seed-canvas.mjs` 주석에 명시). 모르고 8340·10100·8220을 넣었고 경고 없이 잘려 저장돼 왔다. 특히 모바일 Competition(9,701px)은 하단 약 1,700px — 클로징 레터와 푸터가 캔버스에서 보이지 않았다. **내용은 파일에 온전하고 프레임만 잘린다.** 대응: 모바일 Competition을 (1/2)·(2/2) 두 아트보드로 분할. 디자인을 줄여 도구 한계에 맞추는 방식은 택하지 않았다 |
| D16 | **GUI 편집을 빌드 스크립트로 역반영** | 2026-08-28. 캔버스에서 직접 편집된 내용이 데스크톱 아트보드에만 적용돼 모바일과 갈라졌다(아트보드끼리 런타임을 공유하지 않는다). 편집 내용을 `build-artboards.mjs`에 옮겨 두 뷰포트가 다시 한 소스에서 나오게 했다. 모바일 메뉴의 접수 시작일도 하드코딩을 걷어내고 `DATES[0]`에서 끌어오도록 바꿔 같은 종류의 표류를 막았다 |
| D17 | **제출물 "둘 다 필수"를 구조로 못박음** | 2026-08-29. `REQUIRED` 배지 옆에 `CHOOSE ONE` 배지가 나란히 놓여 "두 블록 중 하나 고르기"로 읽혔다. 게다가 페이지에서 눈에 띄는 접속어가 형식 사이의 `OR` 하나뿐이라 OR 해석이 계속 강화됐다. 대응: ①배지를 둘 다 `REQUIRED`로 통일하고 "choose one"은 형식 선택 자리(`Pick one format`)로 내림 ②`1 OF 2`·`2 OF 2` 단계 칩 ③블록 사이에 **`＋ BOTH ARE REQUIRED` 연결자** — 안쪽 `OR`와 같은 자리·크기로 놓아 AND/OR가 대비되게 ④두 블록을 같은 폭·같은 테두리로 맞추고, 대신 안쪽 옵션 카드의 테두리를 제거해 "박스 하나 = 필수 항목 하나, 그 안에서 형식 선택"이라는 위계를 만듦. 섹션 제목도 `What to submit` → **`Two things to submit`**으로 바꿔 개수를 제목에서 밝혔다 |
| D18 | **타이포 위계를 참고 사이트 체계로 재정렬** | 2026-08-29. 참고 사이트 CSS를 다시 분석한 결과 **굵기 900을 21회** 쓰는데 우리는 700이 최대였고, 라벨 자간 23곳 중 16곳이 `.10em`으로 단조로웠다(참고는 `.06~.16em`을 크기별로 씀). 무엇보다 `<strong>`이 4가지로 제각각이었고 **그중 둘이 굵기 600 — 브라우저 기본 굵게(700)보다 얇아 강조가 오히려 약화**되고 있었다. 대응: ①`Roboto 700·900` 로드(그전엔 400·500만 있어 굵은 표현이 불가) ②콘텐츠 제목층(테마명·상금 행·일정)을 Condensed 600 → **Roboto 900**, 여러 줄로 흐르는 제목(카드·모달)은 **Roboto 700**(900은 장문에서 답답함) ③라벨 자간을 크기 역순으로 `.12/.14/.16em` ④`strong`을 **Roboto 700 + ink** 한 규칙으로 통일. Anton은 히어로·섹션 제목·숫자에만 남겨 "전부 Anton이라 아무것도 강조되지 않는" 상태를 해소했다 |
| D19 | **히어로를 Anton 유지 + 크기 상향** | 2026-08-29. "더 굵은 폰트" 요청을 받고 확인하니 **h1은 이미 `font-weight:400`이고 Anton은 굵기가 400 하나뿐**이라 굵기로는 손댈 수 없었다. 실측 결과 원인은 굵기가 아니라 크기였다 — Anton은 극도로 좁아서 **104px에서 1280px 칼럼의 54%밖에 못 채웠다**. Inter 900(83%)·Archivo Black(91%)과 비교본을 만들어 검토했고, Inter는 중립적·범용적이라 solveconference 계보가 지워지는 데다 폭 여유가 없어 채택하지 않았다. **Anton 유지 + `clamp(2.625rem, 9vw, 8.5rem)`**(42→136px). 데스크톱 78~89% 충전, 모바일 최솟값 42px는 유지 — 그 위로 올리면 `TO SMART AGRICULTURE`가 350px 칼럼을 넘친다 |
| D20 | **발표자료를 구글 드라이브로 이관** | 2026-08-29. 푸시 직전 결정. 저장소에 73MB PDF가 들어가면 클론이 무겁고 Vercel Hobby 상한(100MB)의 74%를 잡아먹었다. 주최측이 드라이브 링크 13개를 제공. **`/view`(미리보기)가 아니라 `uc?export=download&id=` 형태를 택했다** — 후자가 `content-disposition: attachment`로 파일을 직접 내려주므로 "Download slides"라는 버튼 문구와 동작이 일치한다. 13개 모두 공개 여부와 **파일 크기가 로컬 원본과 바이트 단위로 일치**함을 확인해 연사↔파일 매핑을 검증했다. `download` 속성은 교차 출처에서 무시되므로 제거하고, 드라이브가 안내 페이지를 띄우는 예외 상황에 사이트를 벗어나지 않도록 `target="_blank"`로 열게 했다. 결과: 배포본 74MB → **1MB** |

### 채택하지 않은 대안

- **세션별 가로 스크롤 레인(넷플릭스형)** — 그룹 구조는 가장 명확하나 영상 1개짜리 세션이 둘이라 레인이 비어 보인다
- **시네마틱 스티키 전환** — 가장 화려하지만 모바일 대응이 까다롭고, 13개를 훑어보기 어렵다
- **주제 2대 분류(스마트팜 / 산림·탄소)** — 구조는 잘 읽히나 필터가 2단이 되어 복잡도가 올라간다. 13개 규모엔 과하다
- **데이터 분리형 프롬프트(JSON 첨부)** — 목업 단계에선 이점이 없다. 코드 구현 단계에서 채택 예정(§6 참조)

---

## 4. 디자인 시스템 — 추출 근거

참고 사이트의 `assets/style.css`에서 **추정이 아닌 실제 값**을 읽어냈다.

```
--cream:#FDFBF5      --teal-deep:#0B7677
--cream-deep:#F7F5E8 --teal-forest:#0E4E4A
--sand:#EBEBE0       --teal-mid:#74ABA1
--sand-mid:#C0C0B8   --teal-light:#AFC7B8
--gray:#929289       --line:rgba(33,31,21,.16)
--gray-deep:#5E5E58  --line-soft:rgba(33,31,21,.09)
--ink:#211F15
--display:'Anton','Roboto Condensed','Noto Sans KR'
```

**모션 패턴** — `main.js`에서 확인된 것: `IntersectionObserver` 2개소, `pointermove` 리스너, `scrollY` 기반 헤더 변형, `requestAnimationFrame` 5개소. `style.css`에는 `transition:none` / `animation:none` 선언이 14건 있는데, 이는 `prefers-reduced-motion` 대응으로 보인다. **참고 사이트가 이미 지키고 있는 접근성 기준이므로 우리도 반드시 지킨다** — 프롬프트 모션 명세 10번 항목.

라이브러리는 하나도 쓰지 않았다(GSAP·Three·Framer 등 미검출). 순수 HTML/CSS/JS. 구현 단계에서도 이 방침을 따르면 배포가 단순해진다.

**모션 강화 지점** — 참고 사이트에 없거나 약한 것을 추가했다: 히어로 마스크 슬라이드업, 필터 FLIP 재배치, 카드 호버 줌+틸 오버레이, 스크롤 진행 바, 숫자 카운트업, 커서 추종 글로우.

---

## 5. 프롬프트 수정 가이드

`prompts/claude-design-master-prompt.md`에서 자주 손댈 곳:

| 바꾸고 싶은 것 | 수정 위치 |
|---|---|
| 색을 더 어둡게 / 밝게 | `DESIGN SYSTEM > Palette` 표의 hex 값 |
| 폰트 교체 | `DESIGN SYSTEM > Typography` 표 + Google Fonts 로드 줄 |
| 모션 강도 조절 | `DESIGN SYSTEM > Motion specification` 1~10번 (숫자를 지우면 해당 효과가 빠진다) |
| 아트보드 추가/삭제 | `ARTBOARDS` 표 |
| 섹션 순서 변경 | `PAGE ①` / `PAGE ②`의 번호 순서 |
| 영상 데이터 교체 | `APPENDIX A` 표 (Video ID만 바꾸면 썸네일·임베드가 따라간다) |
| 공모전 문구 수정 | `APPENDIX B` 해당 § |
| 금지 사항 추가 | `CONSTRAINTS > Do not` |

**주의** — `ACCEPTANCE CHECKLIST`는 프롬프트의 자기 검증 장치다. 위쪽 명세를 바꿨다면 체크리스트도 함께 고쳐야 검증이 성립한다.

---

## 5-1. 발표자료(PDF) 13건

원본은 `.orca/drops/`에 파일명 규칙이 제각각으로 들어왔다(`Day 1_Session 1_Presentation 1. …`, `IRRI_Yvonne Pinto_…`). 공백·마침표가 섞여 URL로 쓰기 나쁘고, 영상과의 연결 고리도 없었다. 그래서 **썸네일과 동일하게 영상 ID를 키로 정규화**해 `design/slides/{videoId}.pdf`로 복사했다. 이제 한 강연의 썸네일·임베드·발표자료가 같은 키를 공유한다.

`design/slides/manifest.json`이 원본 파일명·페이지 수·바이트를 들고 있고, 빌드 스크립트가 이를 읽어 버튼 메타데이터를 찍는다. 수치를 손으로 옮겨 적지 않는다.

| 영상 ID | 연사 | 페이지 | 용량 | 원본 파일명 |
|---|---|---|---|---|
| `Msy7ocHWwqM` | Kyung Joon Lee (keynote) | 59 | 7.7 MB | Day 2_Keynote_Presentation_Kyung Joon Lee.pdf |
| `MIEJi_GWYv4` | Il Jeong Jeong | 102 | 13.2 MB | Day 1_**Opening**_Presentation_Jeong Il Jeong.pdf |
| `2O3aMFhveeg` | Jung Eek Son | 40 | 7.1 MB | Day 1_Session 1_Presentation 1. Jung Eek Son.pdf |
| `kVo5HeDcOPM` | Tadahisa Higashide | 23 | 5.5 MB | Day 1_Session 1_Presentation 2. Tadahisa Higashide.pdf |
| `4jzEQClk93U` | Monica Petri | 37 | 4.5 MB | Day 1_Session 1_Presentation 3_Monica Petri.pdf |
| `lIMRQQaWidQ` | Yvonne Pinto | 24 | 8.9 MB | IRRI_Yvonne Pinto_Strategic Frameworks…pdf |
| `UrwG47ZjtRs` | Hyunglok Kim | 30 | 8.3 MB | Day 1_Session 2_Presentation 2_Hyunglok Kim.pdf |
| `dPDsiZTQiJ8` | Jong Myung Lee | 14 | 1.0 MB | Day 1_Session 3_Presentation 1. Jong Myung Lee.pdf |
| `U7EuQw3oZG4` | Aditya Shah | 12 | 4.7 MB | Day 1_Session 3_Presentation 2. Aditya Shah.pdf |
| `itiXq6iGK0Q` | Taejong Kim | 20 | 2.0 MB | Day 2_Session 4_Presentation_Taejong Kim.pdf |
| `pxh7iUYVAaE` | Stephanie Tam | 10 | 0.7 MB | Day 2_Session 5_Presentation 1. Stephanie Tam.pdf |
| `hVWcLhA-Fwo` | Virender Kumar Duggal | 14 | 1.6 MB | Day 2_Session 5_Presentation 2. Virender Kumar Duggal.pdf |
| `IqDGMGDdjxA` | Yohan Lee | 41 | 7.0 MB | Day 2_Session 5_Presentation 3. Yohan Lee.pdf |

합계 426페이지 / 72MB.

**매핑에서 주의한 곳 두 군데**

1. `Day 1_Opening_Presentation_Jeong Il Jeong.pdf`는 파일명이 "Opening"이지만 Opening Remarks(김동일·김준경·Qingfeng Zhang, 영상 없음)가 아니다. 표지를 열어 *"Korea's Experience on Green Revolution and Implications for International Development Cooperation — Il Jeong JEONG"*를 확인했다. Session 1의 첫 강연이 맞다.
2. 같은 발표의 `.docx` 사본이 하나 더 있다(2.4MB). 웹에서는 PDF만 링크하고 docx는 쓰지 않는다.

**아직 정해지지 않은 것**: 72MB를 어디에 호스팅할지. 정적 호스팅에 함께 올리든, 구글 드라이브 등 외부에 두고 링크하든 결정이 필요하다. 페이지가 큰 순으로 Il Jeong Jeong(102p/13.2MB)이 가장 무거우므로, 모바일 사용자를 위해 버튼에 용량을 함께 표시하는 현재 방식을 유지하는 것이 좋다.

---

## 5-2. 2026-08-28 캔버스 직접 편집 반영 내역

주최측이 캔버스에서 직접 손본 내용을 빌드 스크립트로 되돌려 넣었다. 이제 데스크톱·모바일이 같은 소스에서 나온다.

| 위치 | 변경 |
|---|---|
| 훅 박스 WHO | 끝에 ": Agriculture and Forestry." 추가 |
| 훅 박스 WHAT YOU GAIN | 앞에 "KRW 2.2 million Prize," 추가 — 상금 표 합계(500,000×2 + 300,000×2 + 300,000×2 = 2,200,000)와 일치 확인함 |
| 테마 06 | 끝에 "and so on..." 추가 |
| Watch 섹션 | "…available on the newly launched Alumni Policy Network webpage." → "…from the April KDIS-ADB conference are available NOW." |
| Watch 섹션 | 케이스 공유·코멘트 문장 삭제, `(Webpage link to be inserted)` 자리표시자 삭제 |
| 참가 안내 | 두 문장을 문단 둘로 분리 |
| 제출물 | "A presentation of up to five minutes" → "A video of…" |
| 심사기준 | Replicability → **Diffusability** (원 편집은 "DEFFUSABLE"이었으나 영어에 없는 단어이고, 나머지 두 기준이 명사형이라 맞춤) |
| 시상 | Most Replicable Case → Most Diffusable Case |
| 일정 | 4건 모두 확정 날짜로. `SUBMISSION PERIOD` 라벨은 값이 단일 날짜가 되어 **`SUBMISSION DEADLINE`으로 변경**. 표기도 "31, August, 2026" → "31 August 2026" |
| 푸터 | ADB 로고 슬롯 삭제 (KDI School 슬롯만 남음) |
| Conference 히어로 | eyebrow와 부제를 각각 두 줄로 분리 |

**남은 확인 사항**: 타임라인에서 `EXPERT REVIEW`와 `RESULTS AND AWARDS`가 둘 다 **31 October 2026**으로 같다. 의도한 것일 수 있으나 타임라인에서 두 마일스톤이 한 날짜에 겹치면 어색하게 읽힌다.

**APPENDIX B와의 관계**: 프롬프트의 APPENDIX B는 주최측 원문이므로 §4를 원문 그대로 보존하되 "페이지가 이를 대체함" 경고를 달았다. 페이지 문구는 `PAGE ① §6`에 직접 적었다. 프롬프트를 다시 돌려도 옛 문구로 되돌아가지 않는다.

---

## 5-3. 목업과 실제 사이트의 관계

2026-08-29부터 **실제 사이트(`site/`)가 목업보다 앞섭니다.** 카운트다운, 강연별 공유 링크, 명암비 수정, 제출물 섹션 재구성은 사이트에만 있고 캔버스 목업에는 반영하지 않았습니다. 목업은 디자인 합의를 위한 산출물이었고 그 역할을 마쳤습니다.

**앞으로 문구·구조를 바꿀 때는 `site/build.mjs`가 기준입니다.** `prompts/claude-design-master-prompt.md`는 계속 갱신해 두 문서가 어긋나지 않게 유지하되, 캔버스 목업을 다시 만들 일이 생기면 그때 프롬프트를 돌리면 됩니다.

---

## 6. 미결 사항 / 후속 단계

**아직 없는 것**

1. ~~KDIS·ADB 공식 로고 파일~~ — **KDI School 로고 수령·적용(2026-08-29)**. 푸터에 크림 판을 깔고 얹었다: 로고의 짙은 초록이 푸터 배경 `#0E4E4A`와 대비 1.46:1이라 그냥 얹으면 보이지 않는다(크림 위 6.30:1). 흰색 녹아웃 버전을 받으면 판을 없앨 수 있다. 헤더는 여전히 텍스트 워드마크
2. **행사 현장 사진** — 히어로 배경은 벡터 지오메트리로 대체. 사진 자리는 프롬프트에서 주석 처리하도록 지시
3. ~~제출 폼 URL~~ — **연결 완료(2026-08-29)**: `https://forms.gle/f1AeBRNezv9K6Mjq9`, 6곳 모두 새 탭으로 열림.
   **다만 확인이 필요합니다** — 이 링크를 익명으로 열면 구글 로그인 페이지로 리다이렉트됩니다. 폼이 로그인 필수이거나 특정 도메인(@kdis.ac.kr 등)으로 제한돼 있다는 뜻입니다. 대상이 각국 동문(ADB·World Bank·IRRI·Cropin 등 개인/직장 메일 사용)이므로, 도메인 제한이 걸려 있으면 상당수가 제출 자체를 못 합니다
4. **Alumni Policy Network 웹페이지 URL** — 공모전 본문의 `(Webpage link to be inserted)`. 이 사이트가 배포되면 그 주소가 들어갈 자리다
5. **공모전 본문 §4의 케이스 공유 문구** — "explore cases submitted by fellow KDIS community members and exchange comments and feedback"가 Competition 페이지에 남아 있다. 기능이 취소된 만큼 문구를 수정할지 주최측 확인이 필요하다

**후속 단계**

- 목업 확정 → 코드 구현. 이때 영상 13개를 `data/sessions.json`으로 분리하면 콘텐츠 교체가 쉬워진다(목업 단계에서는 불필요한 중복이라 만들지 않았다)
- 배포는 정적 호스팅으로 충분. 참고 사이트도 라이브러리 없는 정적 사이트다
- 발표자료 72MB의 호스팅 위치 결정 — 사이트와 같은 정적 호스팅에 함께 올릴지, 외부에 두고 링크할지

---

## 부록 — 세션 영상 13개 원본 데이터

썸네일: `https://i.ytimg.com/vi/{ID}/maxresdefault.jpg` · 임베드: `https://www.youtube-nocookie.com/embed/{ID}`

| 순서 | 그룹 | 연사 | 소속 | 강연 제목 | Video ID |
|---|---|---|---|---|---|
| 9 | Keynote | Kyung Joon Lee | Department of Forest Sciences, SNU | A Deep Dive into Korea's Reforestation | `Msy7ocHWwqM` |
| 1 | Session 1 | Il Jeong Jeong | Ministry of Agriculture, Food and Rural Affairs, ROK | Korea's Green Revolution | `MIEJi_GWYv4` |
| 2 | Session 1 | Jung Eek Son | Korea Smart Farm R&D Foundation · SNU | Smart Greenhouse Horticulture and Vertical Farming in Korea | `2O3aMFhveeg` |
| 3 | Session 1 | Tadahisa Higashide | NARO | Smart Agriculture in Japan | `kVo5HeDcOPM` |
| 4 | Session 1 | Monica Petri | ADB | Smart Agriculture in Asia and the Pacific | `4jzEQClk93U` |
| 5 | Session 2 | Yvonne Pinto | IRRI | Strategic Frameworks for Research-to-Impact in Rice Science | `lIMRQQaWidQ` |
| 6 | Session 2 | Hyunglok Kim | GIST | AI-Enabled Earth Observation… | `UrwG47ZjtRs` |
| 7 | Session 3 | Jong Myung Lee | LG CNS | Sustainable Vertical Farming | `dPDsiZTQiJ8` |
| 8 | Session 3 | Aditya Shah | Cropin | Harnessing Technology. Revolutionizing Global Food & Agriculture. | `U7EuQw3oZG4` |
| 10 | Session 4 | Taejong Kim | KDI School | Institutional Innovations in South Korean Reforestation and Implications for REDD+ | `itiXq6iGK0Q` |
| 11 | Session 5 | Stephanie Tam | World Bank | Forests, Finance, and Climate Action | `pxh7iUYVAaE` |
| 12 | Session 5 | Virender Kumar Duggal | ADB (CCSD) | Carbon Finance and Regional Investment: Integrating REDD+ and NbS | `hVWcLhA-Fwo` |
| 13 | Session 5 | Yohan Lee | Department of Forest Sciences, SNU | Towards REDD+ Implementation… | `IqDGMGDdjxA` |

*순서 열은 엑셀 B열(행사 당일 진행 순서). 웹사이트 배치 순서는 Keynote를 최상단으로 올린 뒤 1→13이다.*
