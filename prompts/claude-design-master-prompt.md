# Claude Design — Master Prompt
**KDIS Alumni Policy Network (2026 KDIS–ADB Policy Innovation Case Competition)**

> 사용법: 아래 `=== PROMPT START ===` 부터 `=== PROMPT END ===` 까지 전체를 복사해 Claude Design에 붙여넣으세요.
> 수정이 필요한 곳은 설계 문서(`docs/superpowers/specs/2026-08-28-kdis-alumni-policy-network-design.md`)의 "프롬프트 수정 가이드" 절을 참고하세요.

---

=== PROMPT START ===

# ROLE

You are designing a two-page event website for **KDI School of Public Policy and Management (KDIS)**. Produce a single design canvas containing **seven artboards** — high-fidelity, production-ready visual mockups with real content (no lorem ipsum, no placeholder text).

The site is the **Alumni Policy Network**. Its emotional job is not "video archive" but **"this is where a professional network begins."**

Two pages, in this order:

- **Page ① Competition** — the site's front door and the artboard the canvas opens on. The call to enter the 2026 KDIS Policy Innovation Case Competition.
- **Page ② Conference** — the permanent archive of the KDI School–ADB Joint Conference for Global Alumni: 13 talks with their slide decks.

Competition leads because the site exists to open the competition; the conference archive is the material a participant draws on.

**All visible text on the site must be in English.** Every word of copy you need is supplied verbatim in APPENDIX A and APPENDIX B — use it exactly as written.

---

# ARTBOARDS (7)

Lay these out left-to-right on one canvas, labeled:

**An artboard frame cannot exceed 8000px** — anything taller is silently clipped to it. Page ① on mobile runs about 9,700px, so it is split across two artboards, cut between who may enter and how to enter. Desktop Page ① (7,948px) and mobile Page ② (7,895px) sit just under the ceiling; if you add copy to either, re-check that the footer still renders.

| # | Label | Frame | Content |
|---|---|---|---|
| 1 | `Desktop — Competition (first page)` | 1440 wide, full scroll height | Page ①, complete top-to-bottom |
| 2 | `Desktop — Conference` | 1440 wide, full scroll height | Page ②, complete top-to-bottom |
| 3 | `Desktop — Conference / Player Modal` | 1440 × 900 | Page ② with the video modal open over a dimmed grid — open **card #12**, the longest title in the set, including its `DOWNLOAD SLIDES` button |
| 4 | `Mobile — Competition (1/2)` | 390 wide | Page ① responsive, hero through "Who can participate" |
| 5 | `Mobile — Competition (2/2)` | 390 wide | Page ① responsive, "What to submit" through the footer |
| 6 | `Mobile — Conference` | 390 wide, full scroll height | Page ② responsive |
| 7 | `Mobile — Menu open` | 390 × 844 | The mobile navigation sheet, opened from Page ① |

---

# DESIGN SYSTEM

## Palette — use these exact values

| Token | Hex | Role |
|---|---|---|
| `cream` | `#FDFBF5` | Default page background |
| `cream-deep` | `#F7F5E8` | Alternating section background |
| `sand` | `#EBEBE0` | Card surface, thumbnail placeholder fill |
| `sand-mid` | `#C0C0B8` | Muted borders, disabled states |
| `gray` | `#929289` | Meta text (affiliation, dates, captions) |
| `gray-deep` | `#5E5E58` | Secondary body text |
| `ink` | `#211F15` | Primary text, headlines |
| `teal-deep` | `#0B7677` | Primary accent — CTAs, active filter chip, links, progress bar |
| `teal-forest` | `#0E4E4A` | Dark surfaces — keynote banner, footer, modal scrim base |
| `teal-mid` | `#74ABA1` | Secondary accent, hover states, cursor glow |
| `teal-light` | `#AFC7B8` | Soft fills, session tags, quiet dividers |

Rules: hairlines are `rgba(33,31,21,.16)`, soft dividers `rgba(33,31,21,.09)`. The palette is warm-neutral with a single teal family — **do not introduce any other hue.** In particular, never use YouTube red; play badges are cream or teal.

## Typography

Load from Google Fonts: **Anton**, **Roboto Condensed**, **Roboto**.

Four tiers, and each one has to be visibly a step from the next. The reference
site gets its hierarchy from **weight**, not from setting everything in the
display face — it uses Anton 18 times but weight 900 twenty-one times.

| Tier | Role | Font | Treatment |
|---|---|---|---|
| 1 | Hero, closing panel, marquee, numerals (stats, prizes, countdown, list numbers) | **Anton** | UPPERCASE, tracking `-0.02em`, line-height `0.92` |
| 2 | Section titles, block heads | **Anton** | UPPERCASE, tracking `-0.03em` |
| 3 | Content headings — theme names, award rows, key dates | **Roboto 900** | Sentence case, tracking `-0.01em` |
| 3 | Longer headings — card titles, modal title | **Roboto 700** | 900 turns oppressive once a heading runs to three or more lines |
| 3 | One-line meta — speaker names, format lines | **Roboto Condensed** 700 | Sentence case |
| 4 | Labels, eyebrows, chips, table headers, nav | **Roboto Condensed** 700 | UPPERCASE. Tracking widens as size drops: `+0.16em` at 11–12px, `+0.14em` on eyebrows, `+0.12em` on buttons and the wordmark |
| — | Body copy | **Roboto** 400 | line-height `1.65`, max measure 68ch |

Load `Roboto:wght@400;500;700;900` — 700 and 900 must be real weights, not the
browser's synthesised bold.

**Emphasis.** `<strong>` is Roboto **700 in `ink`**, one rule for the whole site,
always darker than the copy around it (cream on dark panels). Never set an
emphasis below 700: an earlier build used weight 600 in two places, which is
lighter than the browser's own bold, so the emphasis read as de-emphasis.

Desktop scale: hero display `clamp(42px, 9vw, 136px)` · section title `56px` · card title `19px` · body `17px` · meta `13px`.
Mobile scale: hero display `42px` (the floor — above it "TO SMART AGRICULTURE" overflows a 350px column) · section title `32px` · card title `17px` · body `16px` · meta `12px`.

**Never set body paragraphs in Anton.** Anton is for display only. Long-form competition copy is Roboto — it must be genuinely readable.

## Layout

12-column grid, max content width `1280px`, gutter `24px`, side margin `80px` desktop / `20px` mobile.
Spacing scale: `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128`. Section vertical rhythm: `128px` desktop, `72px` mobile.

Visual character: **flat editorial**. Hairline rules, generous whitespace, large type, full-bleed color panels for emphasis. No heavy drop shadows, no glassmorphism, no gradient-on-gradient. Corner radius: `4px` on chips and buttons, `8px` on cards, `0` on full-bleed panels.

## Components

**Session card** — 16:9 thumbnail (`sand` fill with a centered cream play badge, ⌀56px). Two chips overlay the thumbnail, balanced against each other: the session tag top-left (solid `teal-forest` at 92%, cream text) and a **slides mark top-right** (cream at 94%, `teal-deep` text, a small stroke download icon before the word `PDF`). Then: talk title (Roboto Condensed 600), speaker name (ink, 15px), role + affiliation (gray, 13px). Card surface `cream`, 1px hairline border, `8px` radius.

Let the title and affiliation wrap freely — **do not line-clamp either**. Cards in a row stretch to the tallest; push the speaker block to the card's bottom edge with `margin-top:auto` so the blocks align across a row. This is what lets card #12's 20-word title and card #11's 96-character affiliation render in full.

The slides mark carries the word `PDF` and nothing else — page count and file size belong in the modal, where the decision to download is made, not repeated on all thirteen cards. The keynote feature banner's thumbnail carries the same mark.

**Filter chip** — pill, height 40px, 20px horizontal padding. Inactive: transparent with hairline border, ink text. Active: `teal-deep` fill, `cream` text. Hover: `teal-light` fill.

**Keynote feature banner** — full-bleed `teal-forest` panel. Left 55%: large 16:9 thumbnail. Right 45%: `KEYNOTE` eyebrow in `teal-light`, talk title in Anton at 44px in cream, speaker block, and a cream outline "Watch keynote" button. Cream text throughout.

**Primary button** — `teal-deep` fill, cream label, Roboto Condensed 700 uppercase, 14px, tracking +0.1em, 52px tall.
**Secondary button** — transparent, 1px ink border, ink label. On dark panels: 1px cream border, cream label.

**Section header pattern** — small uppercase eyebrow in `teal-deep` above an Anton section title, with a hairline rule spanning the content width below.

**Header + primary nav** — 88px tall (64px mobile), `cream`, bottom hairline, with a 3px `teal-deep` scroll-progress bar pinned to the top edge. Left: wordmark `KDIS ALUMNI POLICY NETWORK` in Roboto Condensed 700 uppercase with `KDIS` in `teal-deep` — a real logo replaces this later, so mark it as a slot. Right, the primary nav reads as **tabs seated on the header's bottom rule**: `COMPETITION` then `CONFERENCE`, in that order, each a full-height item in Roboto Condensed 700 at **15px** with `+0.12em` tracking. The active item is `ink` over a 3px `teal-deep` bar flush with the rule; the inactive one is `gray-deep` — dark enough to read as clickable, never a washed-out gray. After the nav, a 26px vertical hairline, then the primary button `SUBMIT A CASE`. This is the site's main menu and should carry that weight — not a row of small utility links. On mobile it collapses to a hamburger.

**Mobile menu sheet** (artboard 7) — the hamburger opens a full-screen `teal-forest` sheet, the same dark-overlay language as the player modal. Top bar at 64px: the cream wordmark with `KDIS` in `teal-light`, and a close `X`; a hairline in `rgba(253,251,245,.18)` under it, and between every row. The two destinations then **share the height between that bar and the CTA equally** — give each row `flex:1` and centre its contents, so the sheet reads as a composed screen rather than a short list with a hole beneath it. Each row: a 3px left bar (only on the current page, in `teal-mid`, running the row's full height), then an index label `01 · CURRENT` / `02` in Roboto Condensed 700 at 12px, the destination in **Anton at 52px** in cream, and one line of real detail in `teal-light` at 14px — `Submissions open mid-September 2026` and `13 talks · 5 sessions · slide decks`. Anchored at the bottom, within thumb reach: a full-width cream `SUBMIT A CASE` button, a hairline, then `KDI School of Public Policy and Management` and the conference attribution line in muted cream.

Write one line of detail per destination and no more — the emptiness in a two-item menu is the composition, not a gap to fill.

**Player modal** — 900px panel centred on a `teal-forest` scrim at 88%. Top: the talk's 16:9 still, full-bleed inside the panel, with a large play badge and a round close control top-right. Below, padded 32/40: session tag chip beside the track name, the talk title in Roboto Condensed 600 at 26px, a hairline, then a baseline-aligned row with the speaker block on the left and a **`DOWNLOAD SLIDES`** button on the right — secondary style, a stroke download icon before the label, and beneath it a meta line reading `PDF · <n> pages · <size>` taken from APPENDIX C for that talk. Every one of the 13 talks has a deck, so this button is part of the modal, not an option on some of them.

## Motion specification

The artboards are static, so **render the resting state** — but include a compact motion legend as an annotation block beside artboard 1 so this spec survives into implementation.

1. **Hero reveal** — display lines in overflow-hidden rows, each sliding up from 100%, `0.9s cubic-bezier(.2,.7,.2,1)`, 80ms stagger.
2. **Scroll reveal** — every section: opacity `0→1` + translateY `18px→0`, `0.55s ease`, IntersectionObserver at threshold `0.15`, fires once.
3. **Filter transition** — FLIP layout animation, `0.45s cubic-bezier(.2,.7,.3,1)`. Exiting cards fade + `scale(.96)`; entering cards fade in + `scale(1)`; surviving cards glide to their new position.
4. **Card hover** — thumbnail `scale(1.06)` over `0.6s`, `teal-deep` overlay `0→0.18` opacity, play badge `scale(1.12)`, title gains a left-to-right underline sweep in `teal-deep`.
5. **Modal** — scrim `teal-forest` at 88% opacity fading in `0.3s`; panel `scale(.94)→1` and `translateY(16px)→0` over `0.4s`. `Esc` and scrim click close it.
6. **Sticky header** — past 80px scroll, header height `88px→64px`, background gains a backdrop blur and a bottom hairline.
7. **Cursor glow** — desktop only, a soft `teal-mid` radial follows the pointer at low opacity with `mix-blend-mode: multiply`.
8. **Counters** — the hero stat row counts up from 0 when revealed.
9. **Scroll progress** — 3px `teal-deep` bar pinned to the top of the viewport.
10. **`prefers-reduced-motion: reduce`** — disable every transition and animation above; all elements render in their final state immediately. This is required, not optional.

---

# PAGE ① — COMPETITION

Structure the page so a reader who reads only the first screen and the award table still understands what to do.

## 1. Sticky header
The header component, with `COMPETITION` active.

## 2. Hero
- Eyebrow: `OPEN TO KDIS ALUMNI AND GRADUATING STUDENTS`
- Display headline, three stacked Anton rows — **no `ADB` in this title**:
  `2026 KDIS` / `POLICY INNOVATION` / `CASE COMPETITION`
- Pull line, Anton at 40px in `teal-deep`: `ONE COMPETITION. A NETWORK THAT LASTS.`
- Subhead: `Share your policy case and connect with the global KDIS community shaping the future of agriculture and forestry.`
- Primary button `SUBMIT A CASE`, secondary button `WATCH THE CONFERENCE`.

## 3. Hook box — the highest-priority element on the page
A single elevated card straddling the hero and the body, `cream` on a `cream-deep` band, with a 2px `teal-deep` top border. Inside, three equal columns divided by hairlines:

| WHO | HOW | WHAT YOU GAIN |
|---|---|---|
| KDIS alumni and graduating students working in or seeking to enter relevant fields: Agriculture and Forestry. | Submit a policy innovation case individually or in a team of up to three | KRW 2.2 million Prize, expert feedback, global visibility, professional connections, and opportunities for future collaboration |

Each column gets a small `teal-deep` numeral — `01`, `02`, `03` — above the label. Below the three columns, centered and full width, a closing line in Anton at 32px: `SHARE A CASE. FIND YOUR PEERS. BUILD WHAT COMES NEXT.`

On mobile the three columns stack.

## 4. From Manila to a lasting network
Two-column editorial layout: left is a sticky section title `FROM THE MANILA CONFERENCE TO A LASTING PROFESSIONAL NETWORK`; right is the body copy (APPENDIX B §2). Pull out the conference theme as an indented quote block with a 3px `teal-mid` left rule.

## 5. Competition theme
Eyebrow `COMPETITION THEME`, Anton title `SUSTAINABLE AGRICULTURE AND FORESTRY`, one-line lead-in, then the six areas as a 3×2 card grid. Each card: a large `teal-light` numeral `01`–`06`, the area name in Roboto Condensed 600, and a hairline border. No invented descriptions — the six names from APPENDIX B §3 are the entire content.

## 6. Watch, learn, and connect
`cream-deep` band. Left: eyebrow `WATCH, LEARN, AND CONNECT`, Anton title `DRAW ON THE CONFERENCE`, then these two paragraphs — **the page's own wording, which supersedes APPENDIX B §4**:

> Keynote presentations and session videos from the April KDIS-ADB conference are available NOW.
>
> Participants are encouraged to revisit these sessions and draw inspiration from the experiences and insights shared by international experts.

Right: a compact 2×2 preview of four session thumbnails with a `VIEW ALL 13 TALKS` link to Page ②.

## 7. Who can participate
Section title `WHO CAN PARTICIPATE?`, lead-in, then the four eligibility conditions as a vertical list with `teal-deep` check marks. Close with the two-sentence note about team size and the "prior experience not required" reassurance, set apart in a `sand`-filled note strip.

## 8. Two things to submit
Section title `TWO THINGS TO SUBMIT`, then the lead: `Both are required: a summary report and one piece of visual material.`

**Both parts are mandatory.** The only choice is the *format* of the second one. An earlier version put a `REQUIRED` badge on one block and `CHOOSE ONE` on the other, which read as "pick one of these two blocks" — do not repeat that. Instead:

- Two **equal** bordered blocks, same width, same border. Neither is a subordinate of the other.
- Each block's head row: a `1 OF 2` / `2 OF 2` step chip (hairline border, gray-deep), the block title in Anton, and a `REQUIRED` badge in `teal-deep` pushed to the right. **Both badges say `REQUIRED`.**
- **Block 1 — `SUMMARY REPORT`.** Format line `2–5 pages · English · A4`, then the five required parts as a numbered list from APPENDIX B §6.
- **Between the blocks**, a connector: a hairline rule running to a filled `teal-deep` circle holding `+`, with the label `BOTH ARE REQUIRED`. This deliberately mirrors the `OR` sitting inside block 2 — the reader compares the two connectors and sees AND versus OR.
- **Block 2 — `VISUAL MATERIAL`.** Format line `Pick one format`, then two options side by side — `VIDEO` (up to five minutes, YouTube link or video file) and `INFOGRAPHIC` (one-page visual summary, PNG or PDF) — with **no boxes of their own**, divided by a vertical hairline carrying `OR` (horizontal rules on mobile). The box belongs to the required item; the halves inside it are the choice.

## 9. Responsible use of AI
A distinct advisory strip — `sand` background, 3px `teal-deep` left rule, no icon clutter. Title `RESPONSIBLE USE OF AI`, body from APPENDIX B §7. Set the phrase `may result in point deductions` in Roboto Condensed 600 so it is not missed.

## 10. Evaluation
Lead-in about the review panel, then three criteria as equal cards: `INNOVATION`, `DIFFUSABILITY`, `INSTITUTIONALIZATION POTENTIAL`, each with its question from APPENDIX B §8. Below, a full-width reassurance line on `teal-light` at low opacity: `Every shortlisted case will receive expert feedback — regardless of whether it receives an award.`

## 11. Awards
Anton section title `AWARDS`. A clean editorial table, hairline rules only, no zebra striping:

| AWARD | RECIPIENTS | PRIZE |
|---|---|---|
| Most Innovative Case | 2 teams | KRW 500,000 |
| Most Diffusable Case | 2 teams | KRW 300,000 |
| Best Institutionalization Potential | 2 teams | KRW 300,000 |
| Participation Award | All participants | Commemorative gift |

Prize amounts in Anton at 28px, `teal-deep`, right-aligned. Below the table, two notes at body size: the winners' feature/newsletter/social-media/interview line, and the KOICA alumni line from APPENDIX B §9.

## 12. Key dates
Horizontal 4-step timeline on desktop, vertical on mobile. A `teal-light` connector line runs through four `teal-deep` nodes:

`SUBMISSIONS OPEN` → 31 August 2026 · `SUBMISSION DEADLINE` → 11 October 2026 · `EXPERT REVIEW` → 31 October 2026 · `RESULTS AND AWARDS` → 31 October 2026

## 13. Closing letter
`teal-forest` full-bleed panel, cream text, centered, max width 720px. Anton title `YOUR EXPERIENCE CAN STRENGTHEN THE NETWORK`, the two closing paragraphs and the "If you work in this field" line from APPENDIX B §10, then the sign-off `Warm regards,` / `KDI School of Public Policy and Management`. Close with a cream-filled `SUBMIT A CASE` button.

## 14. Footer
Identical to Page ①.

---

# PAGE ② — CONFERENCE

## 1. Sticky header
The header component, with `CONFERENCE` active.

## 2. Hero
- Eyebrow: `KDI SCHOOL – ADB JOINT CONFERENCE FOR GLOBAL ALUMNI · ADB HEADQUARTERS, MANILA · APRIL 22–23, 2026`
- Display headline (Anton, 3–4 stacked rows, filling the width):
  `FROM FOOD SECURITY TO SMART AGRICULTURE AND SUSTAINABLE FORESTS`
- Subhead (Roboto, 22px, gray-deep): `Korea's Development Pathways and Lessons for Asia and the Pacific`
- Stat row, three items separated by hairlines: **1** KEYNOTE · **5** SESSIONS · **13** TALKS
  *(Terminology, used consistently across both pages: a **session** is a thematic track — there are five. A **talk** is one recorded presentation — there are thirteen, one of which is the keynote.)*
- Background: `cream` with a large, very low-contrast geometric motif in `teal-light` at ~12% opacity — abstract contour/field lines suggesting terraced farmland and forest canopy. **Vector geometry only, no photography.** Annotate this area as the future home of a conference photograph.

## 3. Keynote feature banner
Use the keynote banner component. Content from APPENDIX A, row K.

## 4. Filter + grid
- Section header: eyebrow `THE ARCHIVE`, title `WATCH THE CONFERENCE`, and a one-line intro in Roboto: `Keynote presentations and session videos from the April conference — revisit the experiences and insights shared by international experts.`
- Filter chips, left-aligned in one row: `ALL` · `SESSION 1` · `SESSION 2` · `SESSION 3` · `SESSION 4` · `SESSION 5`. `ALL` is active. On mobile the row scrolls horizontally with the edge fading out.
- Beside the chips, right-aligned: a count that updates with the filter. In the `ALL` state it reads `SHOWING 12 OF 13 TALKS` — the keynote sits in the banner above, not in the grid.
- Grid: 3 columns desktop (32px gap), 2 columns tablet, 1 column mobile. **All 12 non-keynote videos from APPENDIX A in the order given.**
- In the `ALL` view, no group headers are inserted between cards — grouping is conveyed by the tag chip alone.

## 5. CTA band
Full-bleed `teal-forest`. Anton headline in cream: `ONE COMPETITION. A NETWORK THAT LASTS.` Body in `teal-light`: `Share your policy case and connect with the global KDIS community shaping the future of agriculture and forestry.` Two buttons: cream-filled `VIEW THE COMPETITION` and cream-outline `SUBMIT A CASE`.

## 6. Footer
`teal-forest` background, cream text. Three columns: (1) wordmark + `KDI School of Public Policy and Management`; (2) nav — Competition, Conference, Submit a Case; (3) the KDI School logo. The mark is dark green on transparent and scores 1.46:1 against the teal-forest footer — invisible. Set it on a **cream plate** (6px radius, 14/18px padding), 280px wide on desktop and 240px on mobile. A white knockout version, if KDIS supplies one, could sit on the panel directly and the plate would come off. Bottom hairline rule, then `© 2026 KDI School of Public Policy and Management. All rights reserved.`

---

# APPENDIX A — SESSION VIDEO DATA (13 items, verbatim)

Thumbnail for every card: `https://i.ytimg.com/vi/{VIDEO_ID}/maxresdefault.jpg`
Modal embed: `https://www.youtube-nocookie.com/embed/{VIDEO_ID}`

**Session track names** (used in tag chips and filters):
- Session 1 — Smart Farming: Policy Pathways and Implementation Strategies
- Session 2 — Bridging Technology and Research for Sustainable Agriculture
- Session 3 — Private Innovators in Smart Farming
- Session 4 — The Role of Communities and Social Trust in Successful Reforestation
- Session 5 — Carbon Finance and Regional Investment: Integrating REDD+ and NbS

**K — KEYNOTE (feature banner, not in the grid)**
| Field | Value |
|---|---|
| Talk | A Deep Dive into Korea's Reforestation |
| Speaker | Kyung Joon Lee |
| Role | Professor Emeritus |
| Affiliation | Department of Forest Sciences, Seoul National University |
| Video ID | `Msy7ocHWwqM` |

**Grid cards, in this exact order:**

| # | Tag | Talk title | Speaker | Role | Affiliation | Video ID |
|---|---|---|---|---|---|---|
| 1 | SESSION 1 | Korea's Green Revolution | Il Jeong Jeong | Former Director General for International Cooperation Bureau | Ministry of Agriculture, Food and Rural Affairs, Republic of Korea | `MIEJi_GWYv4` |
| 2 | SESSION 1 | Smart Greenhouse Horticulture and Vertical Farming in Korea | Jung Eek Son | Chairman / Director · Professor Emeritus | Korea Smart Farm R&D Foundation · Dept. of Agriculture, Forestry & Bioresources, Seoul National University | `2O3aMFhveeg` |
| 3 | SESSION 1 | Smart Agriculture in Japan: Policies for Data-Driven Greenhouse Horticulture | Tadahisa Higashide | Director, Institute of Vegetable and Floriculture Science | National Agriculture and Food Research Organization (NARO) | `kVo5HeDcOPM` |
| 4 | SESSION 1 | Smart Agriculture in Asia and the Pacific | Monica Petri | Senior Natural Resources and Agriculture Specialist | Asian Development Bank (ADB) | `4jzEQClk93U` |
| 5 | SESSION 2 | Strategic Frameworks for Research-to-Impact in Rice Science | Yvonne Pinto | Director General | International Rice Research Institute (IRRI) | `lIMRQQaWidQ` |
| 6 | SESSION 2 | AI-Enabled Earth Observation for Monitoring and Predicting the Hydrological Cycle: Focus on Droughts and Floods | Hyunglok Kim | Professor | Gwangju Institute of Science and Technology (GIST) | `UrwG47ZjtRs` |
| 7 | SESSION 3 | Sustainable Vertical Farming | Jong Myung Lee | Task Leader | LG CNS | `dPDsiZTQiJ8` |
| 8 | SESSION 3 | Harnessing Technology. Revolutionizing Global Food & Agriculture. | Aditya Shah | Global Director | Cropin | `U7EuQw3oZG4` |
| 9 | SESSION 4 | Institutional Innovations in South Korean Reforestation and Implications for REDD+ | Taejong Kim | Professor | KDI School of Public Policy and Management | `itiXq6iGK0Q` |
| 10 | SESSION 5 | Forests, Finance, and Climate Action: Lessons from the World Bank's Experience in Forest Carbon | Stephanie Tam | Senior Climate Finance Specialist | World Bank | `pxh7iUYVAaE` |
| 11 | SESSION 5 | Carbon Finance and Regional Investment: Integrating REDD+ and Nature-Based Solutions (NbS) | Virender Kumar Duggal | Principal Climate Change Specialist | Climate Change and Sustainable Development Department, Asian Development Bank (ADB) | `hVWcLhA-Fwo` |
| 12 | SESSION 5 | Towards REDD+ Implementation: Deforestation and Forest Degradation Drivers, REDD+ Financing, and Readiness Activities in Participant Countries | Yohan Lee | Professor | Department of Forest Sciences, Seoul National University | `IqDGMGDdjxA` |

Note the extremes this grid must survive: card #7 has a 3-word title, card #12 has a 20-word title, and card #11 has a 96-character affiliation. **The card component must look correct at both ends** — design for the longest, not the average.

---

# APPENDIX B — COMPETITION COPY (verbatim)

**§1 Salutation**
Dear KDIS Alumni and Graduating Students,
KDI School of Public Policy and Management is pleased to invite you to participate in the 2026 KDIS–ADB Policy Innovation Case Competition.

**§2 From the Manila Conference to a Lasting Professional Network**
This competition is a follow-up initiative to the KDI School–ADB Joint Conference for Global Alumni, held on April 22–23, 2026, at the Asian Development Bank Headquarters in Manila, the Philippines.
Under the theme *"From Food Security to Smart Agriculture and Sustainable Forests: Korea's Development Pathways and Lessons for Asia and the Pacific,"* the conference brought together experts and practitioners from ADB, the World Bank, governments, academia, the private sector, and the KDIS alumni community to exchange policy experiences and new ideas.
Building on those discussions, KDI School seeks to develop a lasting professional network through which alumni, graduating students, and sector experts can continue to exchange knowledge, learn from one another, and explore future collaboration. This competition is the first step in expanding that network.

**§3 Competition Theme — Sustainable Agriculture and Forestry**
We welcome policy and program cases covering areas such as:
1. Food security and rural development
2. Smart agriculture and agricultural technology
3. Sustainable forest management
4. Climate adaptation and resilience
5. Green transition and natural resource management
6. Institutional and governance innovation in agriculture and forestry and so on...

**§4 Watch, Learn, and Connect** — ⚠️ **superseded on the page; kept here as the organiser's original.** The site is now live, the case-sharing feature was cancelled, and the placeholder link is gone. Build PAGE ① §6 from the wording given there, not from this section.
Keynote presentations and session videos from the April conference are available on the newly launched Alumni Policy Network webpage.
Participants are encouraged to revisit these sessions and draw inspiration from the experiences and insights shared by international experts. The webpage will also allow you to explore cases submitted by fellow KDIS community members and exchange comments and feedback.
Beyond the competition, it will serve as a platform for continued knowledge sharing among professionals and emerging talent across countries and institutions.
*(Webpage link to be inserted)*

**§5 Who Can Participate?**
The competition is open to KDIS alumni and graduating students who:
- Currently work in agriculture, forestry, or a related field;
- Are involved in food security, rural development, climate action, or green transition;
- Have a strong interest in these areas and hope to pursue a related career; or
- Wish to deepen their professional knowledge and connections in these fields.

You may participate individually or in a team of up to three members. Prior professional experience in the sector is not required; those preparing to enter the field are equally encouraged to apply.

**§6 What to Submit**
*1. Summary Report — Required.* Submit a 2–5-page report in English, using A4 page format and covering the following:
- **Title** — A concise and informative title
- **Executive Summary** — The case's main findings, outcomes, and policy implications
- **Policy Challenge** — The public problem identified and addressed
- **Policy Intervention** — The program or project implemented, including its process and outcomes
- **Limitations and Future Plans** — Remaining challenges, possible improvements, and next steps

*2. Visual Material — Choose One.*
- **Video** — A video of up to five minutes, submitted as a YouTube link or video file; or
- **Infographic** — A one-page visual summary in PNG or PDF format

**§7 Responsible Use of AI**
All Summary Reports will be reviewed for the use of AI. AI tools may be used for supporting tasks such as translation and proofreading; however, excessive reliance on generative AI may result in point deductions. The core analysis and writing must be the participant's own work.

**§8 Evaluation**
Submissions will be reviewed by a panel comprising ADB specialists, external sector experts, and KDIS faculty. Cases will be assessed according to three criteria:
- **Innovation** — Does the case offer a distinctive or creative approach?
- **Diffusability** — Can the approach be adapted or applied in other countries, regions, or institutions?
- **Institutionalization Potential** — Can the initiative develop into a sustainable policy, program, or institution?

Every shortlisted case will receive expert feedback. Participants will therefore have an opportunity to strengthen their cases and gain insights from specialists, regardless of whether they receive an award.

**§9 Awards** *(table content is in PAGE ② §11)*
Winning cases will be featured on the Alumni Policy Network webpage and promoted through KDIS newsletters and social media channels, including interviews with the winning teams.
Additional prizes may be available for KOICA alumni participants.

**§10 Closing — Your Experience Can Strengthen the Network**
For professionals already working in these fields, the competition offers an opportunity to share your achievements internationally and meet potential collaborators. For graduating students and those preparing to enter the sector, it provides a valuable chance to learn from real-world policy cases and connect with experienced practitioners.
If you work in this field—or hope to do so in the future—this network is for you.
We look forward to your participation and to seeing the ideas, experiences, and new connections that emerge from across the KDIS community.
Warm regards,
KDI School of Public Policy and Management

---

# APPENDIX C — SLIDE DECKS (13 items)

Every talk has a deck. Files are prepared as `slides/{VIDEO_ID}.pdf`, keyed exactly like the thumbnails. Use these real figures in each modal's meta line — do not round them or invent others.

| Video ID | Speaker | Pages | Size |
|---|---|---|---|
| `Msy7ocHWwqM` | Kyung Joon Lee (keynote) | 59 | 7.7 MB |
| `MIEJi_GWYv4` | Il Jeong Jeong | 102 | 13.2 MB |
| `2O3aMFhveeg` | Jung Eek Son | 40 | 7.1 MB |
| `kVo5HeDcOPM` | Tadahisa Higashide | 23 | 5.5 MB |
| `4jzEQClk93U` | Monica Petri | 37 | 4.5 MB |
| `lIMRQQaWidQ` | Yvonne Pinto | 24 | 8.9 MB |
| `UrwG47ZjtRs` | Hyunglok Kim | 30 | 8.3 MB |
| `dPDsiZTQiJ8` | Jong Myung Lee | 14 | 1.0 MB |
| `U7EuQw3oZG4` | Aditya Shah | 12 | 4.7 MB |
| `itiXq6iGK0Q` | Taejong Kim | 20 | 2.0 MB |
| `pxh7iUYVAaE` | Stephanie Tam | 10 | 0.7 MB |
| `hVWcLhA-Fwo` | Virender Kumar Duggal | 14 | 1.6 MB |
| `IqDGMGDdjxA` | Yohan Lee | 41 | 7.0 MB |

426 pages, 72 MB in total. **The PDFs are not carried inside the design** — they are far too large to embed and a mockup cannot serve a file. Draw the button; the deployed site points it at the hosted deck.

---

# CONSTRAINTS

**Do not:**
- Write any Korean text into the design. The site is English-only.
- Invent facts. No speaker photographs, no view counts, no video durations, no session times, no venue names, no quotes, no statistics beyond those given here.
- Draw imitation KDIS or ADB logos. Use labeled placeholder slots — official files arrive later.
- Use YouTube red, or any hue outside the eleven palette tokens.
- Set body paragraphs in Anton, or set display headlines in Roboto.
- Alter prize amounts, dates, eligibility rules, or the AI policy. This copy is official.
- Add stock photography, 3D renders, or AI-generated imagery. Where an image belongs, use a labeled placeholder with the intended subject written in it.
- Reach for heavy shadows, glass blur, or neon glows. The reference language is flat editorial print.

**Do:**
- Treat the longest strings in Appendix A as the design constraint for the card component.
- Keep both pages recognizably one system — same header, same footer, same rhythm, same button language.
- Mark the hero photograph as a to-be-filled item. `SUBMIT A CASE` now points at the live Google Form and opens in a new tab.

---

# ACCEPTANCE CHECKLIST

Before you finish, verify each of these on the canvas:

- [ ] Seven artboards, correctly labeled and sized, none over 8000px tall
- [ ] Page ②: all 13 videos present — 1 in the keynote banner + 12 in the grid
- [ ] Every grid card carries tag, talk title, speaker, role, and affiliation
- [ ] All 13 thumbnails — 12 cards plus the keynote banner — carry the `PDF` slides mark top-right, clear of the session tag
- [ ] Six filter chips (`ALL` + Sessions 1–5), `ALL` active
- [ ] Card #12's 20-word title and card #11's long affiliation both render without overflow or awkward truncation
- [ ] Artboard 2 shows card #12's modal open with a dimmed grid behind it
- [ ] The modal carries a `DOWNLOAD SLIDES` button with card #12's real figures — `PDF · 41 pages · 7.0 MB`
- [ ] Page ①: hook box, six theme areas, five report parts, two visual-material options, three criteria, four award rows, four timeline milestones
- [ ] Both submission blocks carry a `REQUIRED` badge and a step chip, with the `+ BOTH ARE REQUIRED` connector between them — nothing anywhere implies choosing between the two blocks
- [ ] Award amounts read exactly KRW 500,000 / 300,000 / 300,000 / Commemorative gift
- [ ] Mobile artboards: filter chips scroll horizontally, hook box columns stack, timeline is vertical
- [ ] Motion legend annotated beside artboard 1, including the `prefers-reduced-motion` rule
- [ ] The Competition artboard is FIRST on the canvas and is the entry artboard
- [ ] Nav reads `COMPETITION` · `CONFERENCE` as weighted tabs, correct one active per page
- [ ] No Case Gallery section anywhere — it was removed
- [ ] The Competition headline reads `2026 KDIS POLICY INNOVATION CASE COMPETITION` — no `ADB`
- [ ] Artboard 7 shows the mobile menu open: two rows dividing the height equally, the current page barred in `teal-mid`, CTA anchored at the bottom
- [ ] No Korean text anywhere on the artboards

=== PROMPT END ===
