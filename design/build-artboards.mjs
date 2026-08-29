// Builds the five .dc.html artboards for the KDIS Alumni Policy Network canvas.
// Data lives here once; desktop and mobile render from the same component functions
// so the two viewports cannot drift apart.
//   run:  node design/build-artboards.mjs
import { writeFileSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = dirname(fileURLToPath(import.meta.url));
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Slide decks, keyed by video id the same way the thumbnails are.
// Written by the copy step; see design/slides/manifest.json.
const SLIDES = JSON.parse(readFileSync(join(OUT, 'slides', 'manifest.json'), 'utf8'));
const mb = (b) => `${(b / 1048576).toFixed(1)} MB`;

/* ---------------------------------------------------------------- tokens */

const C = {
  cream: '#FDFBF5', creamDeep: '#F7F5E8', sand: '#EBEBE0', sandMid: '#C0C0B8',
  gray: '#929289', grayDeep: '#5E5E58', ink: '#211F15',
  tealDeep: '#0B7677', tealForest: '#0E4E4A', tealMid: '#74ABA1', tealLight: '#AFC7B8',
  line: 'rgba(33,31,21,.16)', lineSoft: 'rgba(33,31,21,.09)',
};
const F = {
  display: "'Anton', 'Arial Narrow', Impact, sans-serif",
  cond: "'Roboto Condensed', 'Arial Narrow', Helvetica, sans-serif",
  body: "'Roboto', Helvetica, Arial, sans-serif",
};

/* ------------------------------------------------------------------ data */

const TRACKS = {
  1: 'Smart Farming: Policy Pathways and Implementation Strategies',
  2: 'Bridging Technology and Research for Sustainable Agriculture',
  3: 'Private Innovators in Smart Farming',
  4: 'The Role of Communities and Social Trust in Successful Reforestation',
  5: 'Carbon Finance and Regional Investment: Integrating REDD+ and NbS',
};

const KEYNOTE = {
  talk: "A Deep Dive into Korea's Reforestation",
  speaker: 'Kyung Joon Lee',
  role: 'Professor Emeritus',
  affil: 'Department of Forest Sciences, Seoul National University',
  id: 'Msy7ocHWwqM',
};

const TALKS = [
  { n: 1, s: 1, talk: "Korea's Green Revolution", speaker: 'Il Jeong Jeong', role: 'Former Director General for International Cooperation Bureau', affil: 'Ministry of Agriculture, Food and Rural Affairs, Republic of Korea', id: 'MIEJi_GWYv4' },
  { n: 2, s: 1, talk: 'Smart Greenhouse Horticulture and Vertical Farming in Korea', speaker: 'Jung Eek Son', role: 'Chairman / Director · Professor Emeritus', affil: 'Korea Smart Farm R&D Foundation · Dept. of Agriculture, Forestry & Bioresources, Seoul National University', id: '2O3aMFhveeg' },
  { n: 3, s: 1, talk: 'Smart Agriculture in Japan: Policies for Data-Driven Greenhouse Horticulture', speaker: 'Tadahisa Higashide', role: 'Director, Institute of Vegetable and Floriculture Science', affil: 'National Agriculture and Food Research Organization (NARO)', id: 'kVo5HeDcOPM' },
  { n: 4, s: 1, talk: 'Smart Agriculture in Asia and the Pacific', speaker: 'Monica Petri', role: 'Senior Natural Resources and Agriculture Specialist', affil: 'Asian Development Bank (ADB)', id: '4jzEQClk93U' },
  { n: 5, s: 2, talk: 'Strategic Frameworks for Research-to-Impact in Rice Science', speaker: 'Yvonne Pinto', role: 'Director General', affil: 'International Rice Research Institute (IRRI)', id: 'lIMRQQaWidQ' },
  { n: 6, s: 2, talk: 'AI-Enabled Earth Observation for Monitoring and Predicting the Hydrological Cycle: Focus on Droughts and Floods', speaker: 'Hyunglok Kim', role: 'Professor', affil: 'Gwangju Institute of Science and Technology (GIST)', id: 'UrwG47ZjtRs' },
  { n: 7, s: 3, talk: 'Sustainable Vertical Farming', speaker: 'Jong Myung Lee', role: 'Task Leader', affil: 'LG CNS', id: 'dPDsiZTQiJ8' },
  { n: 8, s: 3, talk: 'Harnessing Technology. Revolutionizing Global Food & Agriculture.', speaker: 'Aditya Shah', role: 'Global Director', affil: 'Cropin', id: 'U7EuQw3oZG4' },
  { n: 9, s: 4, talk: 'Institutional Innovations in South Korean Reforestation and Implications for REDD+', speaker: 'Taejong Kim', role: 'Professor', affil: 'KDI School of Public Policy and Management', id: 'itiXq6iGK0Q' },
  { n: 10, s: 5, talk: "Forests, Finance, and Climate Action: Lessons from the World Bank's Experience in Forest Carbon", speaker: 'Stephanie Tam', role: 'Senior Climate Finance Specialist', affil: 'World Bank', id: 'pxh7iUYVAaE' },
  { n: 11, s: 5, talk: 'Carbon Finance and Regional Investment: Integrating REDD+ and Nature-Based Solutions (NbS)', speaker: 'Virender Kumar Duggal', role: 'Principal Climate Change Specialist', affil: 'Climate Change and Sustainable Development Department, Asian Development Bank (ADB)', id: 'hVWcLhA-Fwo' },
  { n: 12, s: 5, talk: 'Towards REDD+ Implementation: Deforestation and Forest Degradation Drivers, REDD+ Financing, and Readiness Activities in Participant Countries', speaker: 'Yohan Lee', role: 'Professor', affil: 'Department of Forest Sciences, Seoul National University', id: 'IqDGMGDdjxA' },
];

const THEMES = [
  'Food security and rural development',
  'Smart agriculture and agricultural technology',
  'Sustainable forest management',
  'Climate adaptation and resilience',
  'Green transition and natural resource management',
  'Institutional and governance innovation in agriculture and forestry and so on...',
];

const REPORT_PARTS = [
  ['Title', 'A concise and informative title'],
  ['Executive Summary', "The case's main findings, outcomes, and policy implications"],
  ['Policy Challenge', 'The public problem identified and addressed'],
  ['Policy Intervention', 'The program or project implemented, including its process and outcomes'],
  ['Limitations and Future Plans', 'Remaining challenges, possible improvements, and next steps'],
];

const CRITERIA = [
  ['Innovation', 'Does the case offer a distinctive or creative approach?'],
  ['Diffusability', 'Can the approach be adapted or applied in other countries, regions, or institutions?'],
  ['Institutionalization Potential', 'Can the initiative develop into a sustainable policy, program, or institution?'],
];

const AWARDS = [
  ['Most Innovative Case', '2 teams', 'KRW 500,000'],
  ['Most Diffusable Case', '2 teams', 'KRW 300,000'],
  ['Best Institutionalization Potential', '2 teams', 'KRW 300,000'],
  ['Participation Award', 'All participants', 'Commemorative gift'],
];

const DATES = [
  ['Submissions Open', '31 August 2026'],
  ['Submission Deadline', '11 October 2026'],
  ['Expert Review', '31 October 2026'],
  ['Results and Awards', '31 October 2026'],
];

const ELIGIBILITY = [
  'Currently work in agriculture, forestry, or a related field;',
  'Are involved in food security, rural development, climate action, or green transition;',
  'Have a strong interest in these areas and hope to pursue a related career; or',
  'Wish to deepen their professional knowledge and connections in these fields.',
];

/* ------------------------------------------------------------- viewports */

const DESKTOP = {
  m: false, w: 1440, pad: 80, maxw: 1280, headerH: 88, rhythm: 128,
  hero: 104, compHero: 104, sect: 56, cardTitle: 20, body: 17, meta: 13, lead: 20,
  heroLines: ['FROM FOOD SECURITY TO', 'SMART AGRICULTURE AND', 'SUSTAINABLE FORESTS'],
  compLines: ['2026 KDIS', 'POLICY INNOVATION', 'CASE COMPETITION'],
  cols: 3, gap: 32,
};
const MOBILE = {
  m: true, w: 390, pad: 20, maxw: 350, headerH: 64, rhythm: 72,
  hero: 42, compHero: 40, sect: 32, cardTitle: 18, body: 16, meta: 12, lead: 17,
  heroLines: ['FROM FOOD SECURITY', 'TO SMART AGRICULTURE', 'AND SUSTAINABLE', 'FORESTS'],
  compLines: ['2026 KDIS', 'POLICY INNOVATION', 'CASE COMPETITION'],
  cols: 1, gap: 24,
};

/* ------------------------------------------------------------ primitives */

// max-width carries the padding (border-box), so the readable column is exactly
// v.maxw with v.pad margins either side.
const wrap = (v, inner, extra = '') =>
  `<div style="max-width:${v.maxw + v.pad * 2}px;margin:0 auto;padding:0 ${v.pad}px;${extra}">${inner}</div>`;

const eyebrow = (v, text, color = C.tealDeep) =>
  `<div style="font-family:${F.cond};font-weight:700;font-size:${v.m ? 11 : 12}px;letter-spacing:.10em;text-transform:uppercase;color:${color};">${esc(text)}</div>`;

const displayLines = (v, lines, size, color = C.ink, align = 'left') =>
  lines.map((l) => `<div style="font-family:${F.display};font-size:${size}px;line-height:.92;letter-spacing:-.02em;text-transform:uppercase;color:${color};text-align:${align};">${esc(l)}</div>`).join('');

const sectTitle = (v, text, color = C.ink, size) =>
  `<h2 style="font-family:${F.display};font-size:${size || v.sect}px;line-height:.94;letter-spacing:-.02em;text-transform:uppercase;color:${color};text-wrap:pretty;">${esc(text)}</h2>`;

const para = (v, text, color = C.grayDeep, size) =>
  `<p style="font-family:${F.body};font-size:${size || v.body}px;line-height:1.65;color:${color};max-width:68ch;text-wrap:pretty;">${esc(text)}</p>`;

const rule = (color = C.line) => `<div style="height:1px;background:${color};"></div>`;

const playBadge = (d) => `<div style="width:${d}px;height:${d}px;border-radius:999px;background:${C.cream};display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 1px rgba(33,31,21,.06);">
<svg width="${Math.round(d * 0.34)}" height="${Math.round(d * 0.34)}" viewBox="0 0 24 24" fill="none"><path d="M8 5.2v13.6L19 12 8 5.2Z" fill="${C.tealDeep}"/></svg></div>`;

const check = (s = 18) =>
  `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" style="flex:none;margin-top:3px;"><path d="M4.5 12.5 9.5 17.5 19.5 6.5" stroke="${C.tealDeep}" stroke-width="2.2" stroke-linecap="square"/></svg>`;

const downloadIcon = (s = 17, color = C.ink) =>
  `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" style="flex:none;"><path d="M12 3.5v11.5M7.2 10.6 12 15.4l4.8-4.8" stroke="${color}" stroke-width="2" stroke-linecap="square"/><path d="M4.5 19.5h15" stroke="${color}" stroke-width="2" stroke-linecap="square"/></svg>`;

// Every talk has a deck. The button is the pattern for all 13; the file itself
// is served by the real site, not carried in the mockup.
function slidesButton(v, id, onDark = false) {
  const s = SLIDES[id];
  const fg = onDark ? C.cream : C.ink;
  const border = onDark ? 'rgba(253,251,245,.55)' : C.line;
  return `<div style="display:flex;flex-direction:column;gap:8px;align-items:${v.m ? 'stretch' : 'flex-end'};">
<div style="display:inline-flex;align-items:center;justify-content:center;gap:10px;height:${v.m ? 48 : 52}px;padding:0 ${v.m ? 22 : 26}px;border-radius:4px;background:transparent;border:1px solid ${border};font-family:${F.cond};font-weight:700;font-size:14px;letter-spacing:.10em;text-transform:uppercase;color:${fg};white-space:nowrap;">${downloadIcon(17, fg)}Download slides</div>
<div style="font-family:${F.body};font-size:12px;color:${onDark ? C.tealLight : C.gray};">PDF · ${s.pages} pages · ${mb(s.bytes)}</div></div>`;
}

const arrow = (s = 16, color = C.tealDeep) =>
  `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" style="flex:none;"><path d="M4 12h15M13 6l6 6-6 6" stroke="${color}" stroke-width="2" stroke-linecap="square"/></svg>`;

function btn(v, label, kind) {
  const h = v.m ? 48 : 52;
  const base = `display:inline-flex;align-items:center;justify-content:center;height:${h}px;padding:0 ${v.m ? 22 : 28}px;border-radius:4px;font-family:${F.cond};font-weight:700;font-size:14px;letter-spacing:.10em;text-transform:uppercase;`;
  const kinds = {
    primary: `background:${C.tealDeep};color:${C.cream};border:1px solid ${C.tealDeep};`,
    secondary: `background:transparent;color:${C.ink};border:1px solid ${C.line};`,
    onDarkFill: `background:${C.cream};color:${C.tealForest};border:1px solid ${C.cream};`,
    onDarkGhost: `background:transparent;color:${C.cream};border:1px solid rgba(253,251,245,.55);`,
  };
  return `<div style="${base}${kinds[kind]}">${esc(label)}</div>`;
}

// Scan-time mark: "this talk has a deck". The page count and file size stay in
// the modal, where the decision to download is actually made.
function slidesChip() {
  return `<div style="position:absolute;top:12px;right:12px;display:inline-flex;align-items:center;gap:6px;height:26px;padding:0 10px;border-radius:4px;background:rgba(253,251,245,.94);font-family:${F.cond};font-weight:700;font-size:11px;letter-spacing:.10em;text-transform:uppercase;color:${C.tealDeep};">${downloadIcon(12, C.tealDeep)}PDF</div>`;
}

function tagChip(n) {
  return `<div style="position:absolute;top:12px;left:12px;display:inline-flex;align-items:center;height:26px;padding:0 10px;border-radius:4px;background:rgba(14,78,74,.92);font-family:${F.cond};font-weight:700;font-size:11px;letter-spacing:.10em;text-transform:uppercase;color:${C.cream};">Session ${n}</div>`;
}

/* ------------------------------------------------------------ hero motif */

function motif(w, h) {
  let paths = '';
  for (let i = 0; i < 9; i++) {
    const y = h * 0.40 + i * (h * 0.075);
    const a = 48 - i * 2.4;
    paths += `<path d="M -40 ${y.toFixed(1)} C ${(w * 0.18).toFixed(0)} ${(y - a).toFixed(1)}, ${(w * 0.34).toFixed(0)} ${(y + a * 1.3).toFixed(1)}, ${(w * 0.53).toFixed(0)} ${(y - a * 0.35).toFixed(1)} S ${(w * 0.85).toFixed(0)} ${(y + a * 0.95).toFixed(1)}, ${w + 40} ${(y - a * 0.55).toFixed(1)}"/>`;
  }
  let rows = '';
  for (let i = 0; i < 14; i++) {
    const x = w * 0.62 + i * (w * 0.031);
    rows += `<path d="M ${x.toFixed(0)} ${(h * 0.06).toFixed(0)} L ${(x + w * 0.055).toFixed(0)} ${(h * 0.33).toFixed(0)}"/>`;
  }
  return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;">
<g fill="none" stroke="${C.tealLight}" stroke-opacity=".55" stroke-width="1.25">${paths}</g>
<g fill="none" stroke="${C.tealLight}" stroke-opacity=".38" stroke-width="1">${rows}</g>
<circle cx="${(w * 0.80).toFixed(0)}" cy="${(h * 0.20).toFixed(0)}" r="${(h * 0.19).toFixed(0)}" fill="none" stroke="${C.tealLight}" stroke-opacity=".40" stroke-width="1.25"/>
</svg>`;
}

/* ------------------------------------------------------------ components */

// Primary nav reads as tabs seated on the header's bottom edge: full-height
// items, an active bar flush with the rule, and inactive items dark enough to
// look clickable rather than disabled.
function header(v, active) {
  const navItem = (label, on) =>
    `<div style="display:flex;align-items:center;height:${v.headerH}px;font-family:${F.cond};font-weight:700;font-size:15px;letter-spacing:.12em;text-transform:uppercase;color:${on ? C.ink : C.grayDeep};box-shadow:${on ? `inset 0 -3px 0 ${C.tealDeep}` : 'none'};">${esc(label)}</div>`;
  const mark = `<div style="font-family:${F.cond};font-weight:700;font-size:${v.m ? 13 : 15}px;letter-spacing:.10em;text-transform:uppercase;color:${C.ink};"><span style="color:${C.tealDeep};">KDIS</span> Alumni Policy Network</div>`;
  const right = v.m
    ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 6.5h18M3 12h18M3 17.5h18" stroke="${C.ink}" stroke-width="1.8" stroke-linecap="square"/></svg>`
    : `<div style="display:flex;align-items:stretch;gap:36px;">
${navItem('Competition', active === 'competition')}${navItem('Conference', active === 'conference')}
<div style="align-self:center;width:1px;height:26px;background:${C.line};"></div>
<div style="display:flex;align-items:center;">${btn(v, 'Submit a case', 'primary')}</div></div>`;
  return `<div style="position:relative;height:${v.headerH}px;background:${C.cream};border-bottom:1px solid ${C.line};">
${wrap(v, `<div style="display:flex;align-items:stretch;justify-content:space-between;height:${v.headerH}px;"><div style="display:flex;align-items:center;">${mark}</div>${right}</div>`)}
<div style="position:absolute;top:0;left:0;height:3px;width:38%;background:${C.tealDeep};"></div></div>`;
}

function sessionCard(v, t) {
  return `<div style="display:flex;flex-direction:column;background:${C.cream};border:1px solid ${C.line};border-radius:8px;overflow:hidden;">
<div style="position:relative;background:${C.sand};">
<img src="${t.id}.jpg" alt="" style="display:block;width:100%;aspect-ratio:16/9;object-fit:cover;"/>
${tagChip(t.s)}
${slidesChip()}
<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;">${playBadge(v.m ? 48 : 54)}</div>
</div>
<div style="display:flex;flex-direction:column;flex:1;gap:14px;padding:${v.m ? 20 : 24}px;">
<h3 style="font-family:${F.cond};font-weight:600;font-size:${v.cardTitle}px;line-height:1.34;color:${C.ink};text-wrap:pretty;">${esc(t.talk)}</h3>
<div style="margin-top:auto;display:flex;flex-direction:column;gap:5px;">
${rule(C.lineSoft)}
<div style="font-family:${F.cond};font-weight:600;font-size:15px;line-height:1.4;color:${C.ink};padding-top:12px;">${esc(t.speaker)}</div>
<div style="font-family:${F.body};font-size:${v.meta}px;line-height:1.5;color:${C.gray};">${esc(t.role)}</div>
<div style="font-family:${F.body};font-size:${v.meta}px;line-height:1.5;color:${C.gray};">${esc(t.affil)}</div>
</div></div></div>`;
}

function keynoteBanner(v) {
  const thumb = `<div style="position:relative;flex:${v.m ? 'none' : '0 0 55%'};background:${C.tealForest};border-radius:8px;overflow:hidden;">
<img src="${KEYNOTE.id}.jpg" alt="" style="display:block;width:100%;aspect-ratio:16/9;object-fit:cover;"/>
${slidesChip()}
<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;">${playBadge(v.m ? 54 : 72)}</div></div>`;
  const text = `<div style="display:flex;flex-direction:column;gap:${v.m ? 16 : 20}px;justify-content:center;flex:1;">
${eyebrow(v, 'Keynote', C.tealLight)}
<h2 style="font-family:${F.display};font-size:${v.m ? 30 : 44}px;line-height:.98;letter-spacing:-.02em;text-transform:uppercase;color:${C.cream};text-wrap:pretty;">${esc(KEYNOTE.talk)}</h2>
<div style="display:flex;flex-direction:column;gap:4px;">
<div style="font-family:${F.cond};font-weight:600;font-size:${v.m ? 16 : 18}px;color:${C.cream};">${esc(KEYNOTE.speaker)}</div>
<div style="font-family:${F.body};font-size:${v.meta + 1}px;line-height:1.55;color:${C.tealLight};">${esc(KEYNOTE.role)}</div>
<div style="font-family:${F.body};font-size:${v.meta + 1}px;line-height:1.55;color:${C.tealLight};">${esc(KEYNOTE.affil)}</div>
</div>
<div style="display:flex;">${btn(v, 'Watch keynote', 'onDarkGhost')}</div></div>`;
  return `<div style="background:${C.tealForest};padding:${v.m ? 48 : 72}px 0;">
${wrap(v, `<div style="display:flex;flex-direction:${v.m ? 'column' : 'row'};gap:${v.m ? 28 : 48}px;align-items:stretch;">${thumb}${text}</div>`)}</div>`;
}

function footer(v) {
  const slot = (label) =>
    `<div style="display:flex;align-items:center;justify-content:center;height:56px;padding:0 20px;border:1px dashed rgba(253,251,245,.42);border-radius:4px;font-family:${F.cond};font-weight:700;font-size:11px;letter-spacing:.10em;text-transform:uppercase;color:rgba(253,251,245,.62);">${esc(label)}</div>`;
  const col1 = `<div style="display:flex;flex-direction:column;gap:12px;flex:1;">
<div style="font-family:${F.cond};font-weight:700;font-size:15px;letter-spacing:.10em;text-transform:uppercase;color:${C.cream};"><span style="color:${C.tealLight};">KDIS</span> Alumni Policy Network</div>
<div style="font-family:${F.body};font-size:${v.meta + 1}px;line-height:1.6;color:${C.tealLight};max-width:34ch;">KDI School of Public Policy and Management</div></div>`;
  const col2 = `<div style="display:flex;flex-direction:column;gap:12px;flex:1;">
${eyebrow(v, 'Navigate', C.tealMid)}
${['Competition', 'Conference', 'Submit a Case'].map((x) => `<div style="font-family:${F.body};font-size:${v.body - 2}px;color:${C.cream};">${esc(x)}</div>`).join('')}</div>`;
  const col3 = `<div style="display:flex;flex-direction:column;gap:12px;flex:1;">
${eyebrow(v, 'Organised by', C.tealMid)}
<div style="display:flex;gap:12px;">${slot('KDI School')}</div>
<div style="font-family:${F.body};font-size:11px;line-height:1.5;color:rgba(253,251,245,.55);">Placeholder — official logo files to be supplied</div></div>`;
  return `<div style="background:${C.tealForest};padding:${v.m ? 56 : 72}px 0 ${v.m ? 40 : 48}px;">
${wrap(v, `<div style="display:flex;flex-direction:column;gap:${v.m ? 40 : 56}px;">
<div style="display:flex;flex-direction:${v.m ? 'column' : 'row'};gap:${v.m ? 36 : 48}px;">${col1}${col2}${col3}</div>
${rule('rgba(253,251,245,.20)')}
<div style="font-family:${F.body};font-size:${v.meta}px;color:rgba(253,251,245,.62);">© 2026 KDI School of Public Policy and Management. All rights reserved.</div></div>`)}</div>`;
}

function ctaBand(v) {
  return `<div style="background:${C.tealForest};padding:${v.m ? 72 : 96}px 0;">
${wrap(v, `<div style="display:flex;flex-direction:column;gap:${v.m ? 20 : 24}px;align-items:flex-start;">
${displayLines(v, v.m ? ['One competition.', 'A network', 'that lasts.'] : ['One competition. A network that lasts.'], v.m ? 32 : 56, C.cream)}
<p style="font-family:${F.body};font-size:${v.body}px;line-height:1.65;color:${C.tealLight};max-width:62ch;">Share your policy case and connect with the global KDIS community shaping the future of agriculture and forestry.</p>
<div style="display:flex;flex-direction:${v.m ? 'column' : 'row'};gap:12px;margin-top:${v.m ? 12 : 16}px;${v.m ? 'align-self:stretch;' : ''}">${btn(v, 'View the competition', 'onDarkFill')}${btn(v, 'Submit a case', 'onDarkGhost')}</div></div>`)}</div>`;
}

/* ----------------------------------------------------------- page: sessions */

function heroSessions(v) {
  const h = v.m ? 700 : 730;
  const stat = (num, label) => `<div style="display:flex;flex-direction:column;gap:6px;${v.m ? '' : 'flex:1;'}">
<div style="font-family:${F.display};font-size:${v.m ? 40 : 56}px;line-height:1;color:${C.tealDeep};">${esc(num)}</div>
${eyebrow(v, label, C.grayDeep)}</div>`;
  const stats = v.m
    ? `<div style="display:flex;flex-direction:column;gap:20px;">${stat('1', 'Keynote')}${rule()}${stat('5', 'Sessions')}${rule()}${stat('13', 'Talks')}</div>`
    : `<div style="display:flex;gap:48px;max-width:760px;">${stat('1', 'Keynote')}<div style="width:1px;background:${C.line};"></div>${stat('5', 'Sessions')}<div style="width:1px;background:${C.line};"></div>${stat('13', 'Talks')}</div>`;
  return `<div style="position:relative;background:${C.cream};overflow:hidden;padding:${v.m ? 56 : 96}px 0 ${v.m ? 64 : 96}px;">
${motif(v.w, h)}
${wrap(v, `<div style="position:relative;display:flex;flex-direction:column;gap:${v.m ? 20 : 30}px;">
<div style="display:flex;flex-direction:column;gap:4px;">
${eyebrow(v, 'KDI School – ADB Joint Conference for Global Alumni')}
${eyebrow(v, 'ADB Headquarters, Manila · April 22–23, 2026')}</div>
<div>${displayLines(v, v.heroLines, v.hero)}</div>
<div style="display:flex;flex-direction:column;font-family:${F.body};font-size:${v.m ? 17 : 22}px;line-height:1.55;color:${C.grayDeep};">
<div>Korea's Development Pathways</div><div>and Lessons for Asia and the Pacific</div></div>
<div style="margin-top:${v.m ? 12 : 22}px;">${stats}</div></div>`)}</div>`;
}

function archiveSection(v) {
  const chips = ['All', 'Session 1', 'Session 2', 'Session 3', 'Session 4', 'Session 5'].map((label, i) => {
    const on = i === 0;
    return `<div style="display:inline-flex;align-items:center;height:40px;padding:0 20px;border-radius:4px;white-space:nowrap;font-family:${F.cond};font-weight:700;font-size:12px;letter-spacing:.10em;text-transform:uppercase;${on ? `background:${C.tealDeep};color:${C.cream};border:1px solid ${C.tealDeep};` : `background:transparent;color:${C.ink};border:1px solid ${C.line};`}">${esc(label)}</div>`;
  }).join('');
  const chipRow = v.m
    ? `<div style="position:relative;margin:0 -${v.pad}px;padding:0 ${v.pad}px;overflow:hidden;"><div style="display:flex;gap:10px;">${chips}</div>
<div style="position:absolute;top:0;right:0;width:56px;height:40px;background:linear-gradient(90deg,rgba(253,251,245,0),${C.cream});"></div></div>
<div style="font-family:${F.cond};font-weight:700;font-size:11px;letter-spacing:.10em;text-transform:uppercase;color:${C.gray};margin-top:16px;">Showing 12 of 13 talks</div>`
    : `<div style="display:flex;align-items:center;justify-content:space-between;gap:24px;">
<div style="display:flex;gap:12px;flex-wrap:wrap;">${chips}</div>
<div style="font-family:${F.cond};font-weight:700;font-size:12px;letter-spacing:.10em;text-transform:uppercase;color:${C.gray};white-space:nowrap;">Showing 12 of 13 talks</div></div>`;
  const grid = `<div style="display:grid;grid-template-columns:repeat(${v.cols}, minmax(0, 1fr));gap:${v.gap}px;">${TALKS.map((t) => sessionCard(v, t)).join('')}</div>`;
  return `<div style="background:${C.cream};padding:${v.rhythm}px 0;">
${wrap(v, `<div style="display:flex;flex-direction:column;gap:${v.m ? 32 : 48}px;">
<div style="display:flex;flex-direction:column;gap:${v.m ? 14 : 18}px;">
${eyebrow(v, 'The archive')}
${sectTitle(v, 'Watch the conference')}
${para(v, 'Keynote presentations and session videos from the April conference — revisit the experiences and insights shared by international experts.')}
${rule()}</div>
${chipRow}
${grid}</div>`)}</div>`;
}

function conferencePage(v) {
  return [header(v, 'conference'), heroSessions(v), keynoteBanner(v), archiveSection(v), ctaBand(v), footer(v)].join('');
}

/* -------------------------------------------------------- page: competition */

function heroCompetition(v) {
  return `<div style="position:relative;background:${C.cream};overflow:hidden;padding:${v.m ? 56 : 96}px 0 ${v.m ? 72 : 120}px;">
${motif(v.w, v.m ? 620 : 660)}
${wrap(v, `<div style="position:relative;display:flex;flex-direction:column;gap:${v.m ? 20 : 28}px;">
${eyebrow(v, 'Open to KDIS alumni and graduating students')}
<div>${displayLines(v, v.compLines, v.compHero)}</div>
<div style="font-family:${F.display};font-size:${v.m ? 26 : 40}px;line-height:1.02;letter-spacing:-.02em;text-transform:uppercase;color:${C.tealDeep};">One competition. A network that lasts.</div>
<p style="font-family:${F.body};font-size:${v.m ? 17 : 20}px;line-height:1.6;color:${C.grayDeep};max-width:52ch;">Share your policy case and connect with the global KDIS community shaping the future of agriculture and forestry.</p>
<div style="display:flex;flex-direction:${v.m ? 'column' : 'row'};gap:12px;margin-top:${v.m ? 8 : 16}px;${v.m ? '' : 'align-items:center;'}">${btn(v, 'Submit a case', 'primary')}${btn(v, 'Watch the conference', 'secondary')}</div></div>`)}</div>`;
}

function hookBox(v) {
  const cols = [
    ['01', 'Who', 'KDIS alumni and graduating students working in or seeking to enter relevant fields: Agriculture and Forestry.'],
    ['02', 'How', 'Submit a policy innovation case individually or in a team of up to three'],
    ['03', 'What you gain', 'KRW 2.2 million Prize, expert feedback, global visibility, professional connections, and opportunities for future collaboration'],
  ].map(([n, label, text], i) => `<div style="display:flex;flex-direction:column;gap:12px;flex:1;${!v.m && i > 0 ? `border-left:1px solid ${C.line};padding-left:40px;` : ''}${v.m && i > 0 ? `border-top:1px solid ${C.line};padding-top:24px;` : ''}">
<div style="font-family:${F.display};font-size:${v.m ? 22 : 26}px;line-height:1;color:${C.tealDeep};">${esc(n)}</div>
${eyebrow(v, label, C.ink)}
<p style="font-family:${F.body};font-size:${v.m ? 15 : 16}px;line-height:1.6;color:${C.grayDeep};">${esc(text)}</p></div>`).join('');
  return `<div style="background:${C.creamDeep};padding:0 0 ${v.m ? 72 : 96}px;">
${wrap(v, `<div style="position:relative;z-index:1;background:${C.cream};border:1px solid ${C.line};border-top:2px solid ${C.tealDeep};border-radius:8px;padding:${v.m ? 32 : 48}px;margin-top:-${v.m ? 40 : 60}px;display:flex;flex-direction:column;gap:${v.m ? 28 : 40}px;">
<div style="display:flex;flex-direction:${v.m ? 'column' : 'row'};gap:${v.m ? 24 : 40}px;">${cols}</div>
${rule()}
<div style="font-family:${F.display};font-size:${v.m ? 22 : 32}px;line-height:1.05;letter-spacing:-.02em;text-transform:uppercase;color:${C.ink};text-align:${v.m ? 'left' : 'center'};">Share a case. Find your peers. Build what comes next.</div></div>`)}</div>`;
}

function manilaSection(v) {
  const body = `<div style="display:flex;flex-direction:column;gap:24px;flex:1;">
${para(v, 'This competition is a follow-up initiative to the KDI School–ADB Joint Conference for Global Alumni, held on April 22–23, 2026, at the Asian Development Bank Headquarters in Manila, the Philippines.')}
<div style="border-left:3px solid ${C.tealMid};padding:4px 0 4px 24px;">
<p style="font-family:${F.body};font-style:italic;font-size:${v.m ? 17 : 19}px;line-height:1.6;color:${C.ink};max-width:62ch;">“From Food Security to Smart Agriculture and Sustainable Forests: Korea's Development Pathways and Lessons for Asia and the Pacific”</p></div>
${para(v, 'Under that theme, the conference brought together experts and practitioners from ADB, the World Bank, governments, academia, the private sector, and the KDIS alumni community to exchange policy experiences and new ideas.')}
${para(v, 'Building on those discussions, KDI School seeks to develop a lasting professional network through which alumni, graduating students, and sector experts can continue to exchange knowledge, learn from one another, and explore future collaboration. This competition is the first step in expanding that network.')}</div>`;
  const title = `<div style="flex:${v.m ? 'none' : '0 0 38%'};">${sectTitle(v, 'From the Manila conference to a lasting professional network', C.ink, v.m ? 30 : 44)}</div>`;
  return `<div style="background:${C.cream};padding:${v.rhythm}px 0;">
${wrap(v, `<div style="display:flex;flex-direction:${v.m ? 'column' : 'row'};gap:${v.m ? 28 : 56}px;">${title}${body}</div>`)}</div>`;
}

function themeSection(v) {
  const cards = THEMES.map((t, i) => `<div style="display:flex;flex-direction:column;gap:12px;border:1px solid ${C.line};border-radius:8px;padding:${v.m ? 22 : 28}px;">
<div style="font-family:${F.display};font-size:${v.m ? 30 : 40}px;line-height:1;color:${C.tealLight};">${String(i + 1).padStart(2, '0')}</div>
<div style="font-family:${F.cond};font-weight:600;font-size:${v.m ? 16 : 18}px;line-height:1.35;color:${C.ink};text-wrap:pretty;">${esc(t)}</div></div>`).join('');
  return `<div style="background:${C.cream};padding:0 0 ${v.rhythm}px;">
${wrap(v, `<div style="display:flex;flex-direction:column;gap:${v.m ? 28 : 40}px;">
<div style="display:flex;flex-direction:column;gap:${v.m ? 14 : 18}px;">
${eyebrow(v, 'Competition theme')}
${sectTitle(v, 'Sustainable agriculture and forestry')}
${para(v, 'We welcome policy and program cases covering areas such as:')}</div>
<div style="display:grid;grid-template-columns:repeat(${v.m ? 1 : 3}, minmax(0, 1fr));gap:${v.m ? 14 : 24}px;">${cards}</div></div>`)}</div>`;
}

function watchSection(v) {
  const picks = ['MIEJi_GWYv4', 'lIMRQQaWidQ', 'dPDsiZTQiJ8', 'pxh7iUYVAaE'];
  const thumbs = `<div style="display:grid;grid-template-columns:repeat(2, minmax(0, 1fr));gap:${v.m ? 12 : 16}px;">
${picks.map((id) => `<div style="position:relative;border-radius:6px;overflow:hidden;background:${C.sand};">
<img src="${id}.jpg" alt="" style="display:block;width:100%;aspect-ratio:16/9;object-fit:cover;"/>
<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;">${playBadge(34)}</div></div>`).join('')}</div>`;
  const right = `<div style="display:flex;flex-direction:column;gap:20px;flex:${v.m ? 'none' : '0 0 44%'};">${thumbs}
<div style="display:flex;align-items:center;gap:10px;font-family:${F.cond};font-weight:700;font-size:13px;letter-spacing:.10em;text-transform:uppercase;color:${C.tealDeep};">View all 13 talks ${arrow(16)}</div></div>`;
  const left = `<div style="display:flex;flex-direction:column;gap:${v.m ? 16 : 20}px;flex:1;">
${eyebrow(v, 'Watch, learn, and connect')}
${sectTitle(v, 'Draw on the conference')}
${para(v, 'Keynote presentations and session videos from the April KDIS-ADB conference are available NOW.')}
${para(v, 'Participants are encouraged to revisit these sessions and draw inspiration from the experiences and insights shared by international experts.')}
${para(v, 'Beyond the competition, it will serve as a platform for continued knowledge sharing among professionals and emerging talent across countries and institutions.')}</div>`;
  return `<div style="background:${C.creamDeep};padding:${v.m ? 72 : 96}px 0;">
${wrap(v, `<div style="display:flex;flex-direction:${v.m ? 'column' : 'row'};gap:${v.m ? 32 : 56}px;align-items:flex-start;">${left}${right}</div>`)}</div>`;
}

function whoSection(v) {
  const items = ELIGIBILITY.map((t) => `<li style="display:flex;gap:14px;align-items:flex-start;padding:16px 0;border-bottom:1px solid ${C.lineSoft};">${check(18)}
<span style="font-family:${F.body};font-size:${v.body}px;line-height:1.6;color:${C.ink};">${esc(t)}</span></li>`).join('');
  return `<div style="background:${C.cream};padding:${v.rhythm}px 0;">
${wrap(v, `<div style="display:flex;flex-direction:column;gap:${v.m ? 24 : 32}px;">
<div style="display:flex;flex-direction:column;gap:${v.m ? 14 : 18}px;">
${sectTitle(v, 'Who can participate?')}
${para(v, 'The competition is open to KDIS alumni and graduating students who:')}</div>
<ul style="display:flex;flex-direction:column;">${items}</ul>
<div style="background:${C.sand};border-radius:8px;padding:${v.m ? 24 : 32}px;">
${para(v, 'You may participate individually or in a team of up to three members.', C.ink)}
${para(v, 'Prior professional experience in the sector is not required; those preparing to enter the field are equally encouraged to apply.', C.ink)}</div></div>`)}</div>`;
}

function submitSection(v) {
  const badge = (label, color) => `<div style="display:inline-flex;align-items:center;height:26px;padding:0 10px;border-radius:4px;background:${color};font-family:${F.cond};font-weight:700;font-size:11px;letter-spacing:.10em;text-transform:uppercase;color:${C.cream};">${esc(label)}</div>`;
  const parts = REPORT_PARTS.map(([label, desc], i) => `<div style="display:flex;gap:${v.m ? 14 : 20}px;padding:${v.m ? 16 : 18}px 0;border-top:1px solid ${C.lineSoft};">
<div style="font-family:${F.display};font-size:${v.m ? 18 : 20}px;line-height:1.3;color:${C.tealLight};flex:none;width:${v.m ? 26 : 34}px;">${String(i + 1).padStart(2, '0')}</div>
<div style="display:flex;flex-direction:column;gap:4px;">
<div style="font-family:${F.cond};font-weight:700;font-size:${v.m ? 15 : 16}px;color:${C.ink};">${esc(label)}</div>
<div style="font-family:${F.body};font-size:${v.body - 1}px;line-height:1.6;color:${C.grayDeep};">${esc(desc)}</div></div></div>`).join('');
  const block1 = `<div style="border:1px solid ${C.line};border-radius:8px;padding:${v.m ? 24 : 36}px;display:flex;flex-direction:column;gap:${v.m ? 16 : 20}px;background:${C.cream};">
<div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
<div style="font-family:${F.display};font-size:${v.m ? 24 : 30}px;line-height:1;text-transform:uppercase;color:${C.ink};">Summary report</div>${badge('Required', C.tealDeep)}</div>
<div style="font-family:${F.cond};font-weight:600;font-size:${v.body}px;color:${C.tealDeep};">2–5 pages · English · A4</div>
${para(v, 'Submit a report in English, using A4 page format and covering the following:')}
<div>${parts}</div></div>`;
  const opt = (label, text) => `<div style="flex:1;border:1px solid ${C.line};border-radius:8px;padding:${v.m ? 22 : 28}px;display:flex;flex-direction:column;gap:10px;background:${C.cream};">
<div style="font-family:${F.cond};font-weight:700;font-size:13px;letter-spacing:.10em;text-transform:uppercase;color:${C.tealDeep};">${esc(label)}</div>
<div style="font-family:${F.body};font-size:${v.body - 1}px;line-height:1.6;color:${C.ink};">${esc(text)}</div></div>`;
  const or = v.m
    ? `<div style="display:flex;align-items:center;gap:12px;"><div style="flex:1;height:1px;background:${C.line};"></div><div style="font-family:${F.cond};font-weight:700;font-size:12px;letter-spacing:.10em;color:${C.gray};">OR</div><div style="flex:1;height:1px;background:${C.line};"></div></div>`
    : `<div style="display:flex;align-items:center;font-family:${F.cond};font-weight:700;font-size:12px;letter-spacing:.10em;color:${C.gray};">OR</div>`;
  const block2 = `<div style="display:flex;flex-direction:column;gap:${v.m ? 16 : 20}px;">
<div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
<div style="font-family:${F.display};font-size:${v.m ? 24 : 30}px;line-height:1;text-transform:uppercase;color:${C.ink};">Visual material</div>${badge('Choose one', C.tealMid)}</div>
<div style="display:flex;flex-direction:${v.m ? 'column' : 'row'};gap:${v.m ? 14 : 20}px;align-items:stretch;">
${opt('Video', 'A video of up to five minutes, submitted as a YouTube link or video file')}${or}${opt('Infographic', 'A one-page visual summary in PNG or PDF format')}</div></div>`;
  return `<div style="background:${C.cream};padding:0 0 ${v.rhythm}px;">
${wrap(v, `<div style="display:flex;flex-direction:column;gap:${v.m ? 28 : 40}px;">
${sectTitle(v, 'What to submit')}
${block1}${block2}</div>`)}</div>`;
}

function aiSection(v) {
  return `<div style="background:${C.cream};padding:0 0 ${v.rhythm}px;">
${wrap(v, `<div style="background:${C.sand};border-left:3px solid ${C.tealDeep};border-radius:0 8px 8px 0;padding:${v.m ? 24 : 32}px ${v.m ? 24 : 40}px;display:flex;flex-direction:column;gap:12px;">
${eyebrow(v, 'Responsible use of AI', C.ink)}
<p style="font-family:${F.body};font-size:${v.body}px;line-height:1.65;color:${C.ink};max-width:78ch;">All Summary Reports will be reviewed for the use of AI. AI tools may be used for supporting tasks such as translation and proofreading; however, excessive reliance on generative AI <span style="font-family:${F.cond};font-weight:600;">may result in point deductions</span>. The core analysis and writing must be the participant's own work.</p></div>`)}</div>`;
}

function evaluationSection(v) {
  const cards = CRITERIA.map(([label, q]) => `<div style="flex:1;display:flex;flex-direction:column;gap:12px;border-top:2px solid ${C.tealDeep};padding-top:20px;">
<div style="font-family:${F.cond};font-weight:700;font-size:13px;letter-spacing:.10em;text-transform:uppercase;color:${C.ink};">${esc(label)}</div>
<div style="font-family:${F.body};font-size:${v.body - 1}px;line-height:1.6;color:${C.grayDeep};">${esc(q)}</div></div>`).join('');
  return `<div style="background:${C.cream};padding:0 0 ${v.rhythm}px;">
${wrap(v, `<div style="display:flex;flex-direction:column;gap:${v.m ? 28 : 40}px;">
<div style="display:flex;flex-direction:column;gap:${v.m ? 14 : 18}px;">
${sectTitle(v, 'Evaluation')}
${para(v, 'Submissions will be reviewed by a panel comprising ADB specialists, external sector experts, and KDIS faculty. Cases will be assessed according to three criteria:')}</div>
<div style="display:flex;flex-direction:${v.m ? 'column' : 'row'};gap:${v.m ? 24 : 32}px;">${cards}</div>
<div style="background:rgba(175,199,184,.30);border-radius:8px;padding:${v.m ? 20 : 24}px ${v.m ? 20 : 32}px;">
<p style="font-family:${F.body};font-size:${v.body}px;line-height:1.6;color:${C.ink};">Every shortlisted case will receive expert feedback — regardless of whether it receives an award.</p></div></div>`)}</div>`;
}

function awardsSection(v) {
  const head = `<div style="display:flex;padding:0 0 14px;border-bottom:1px solid ${C.ink};">
<div style="flex:1;font-family:${F.cond};font-weight:700;font-size:12px;letter-spacing:.10em;text-transform:uppercase;color:${C.ink};">Award</div>
<div style="width:150px;font-family:${F.cond};font-weight:700;font-size:12px;letter-spacing:.10em;text-transform:uppercase;color:${C.ink};">Recipients</div>
<div style="width:220px;text-align:right;font-family:${F.cond};font-weight:700;font-size:12px;letter-spacing:.10em;text-transform:uppercase;color:${C.ink};">Prize</div></div>`;
  // Monetary amounts get display treatment; the non-numeric prize would look
  // wrong (and wrap) in Anton, so it stays in the condensed face.
  const prize = (p, big) => p.startsWith('KRW')
    ? `font-family:${F.display};font-size:${big}px;line-height:1;color:${C.tealDeep};`
    : `font-family:${F.cond};font-weight:600;font-size:${big - 11}px;line-height:1.3;color:${C.tealDeep};`;
  const rows = AWARDS.map(([a, r, p]) => `<div style="display:flex;align-items:center;padding:22px 0;border-bottom:1px solid ${C.lineSoft};">
<div style="flex:1;font-family:${F.cond};font-weight:600;font-size:19px;color:${C.ink};padding-right:24px;">${esc(a)}</div>
<div style="width:150px;font-family:${F.body};font-size:15px;color:${C.gray};">${esc(r)}</div>
<div style="width:220px;text-align:right;${prize(p, 28)}">${esc(p)}</div></div>`).join('');
  const mobileRows = AWARDS.map(([a, r, p]) => `<div style="display:flex;flex-direction:column;gap:8px;padding:20px 0;border-bottom:1px solid ${C.lineSoft};">
<div style="font-family:${F.cond};font-weight:600;font-size:17px;line-height:1.35;color:${C.ink};">${esc(a)}</div>
<div style="display:flex;align-items:baseline;justify-content:space-between;gap:16px;">
<div style="font-family:${F.body};font-size:13px;color:${C.gray};">${esc(r)}</div>
<div style="text-align:right;${prize(p, 22)}">${esc(p)}</div></div></div>`).join('');
  return `<div style="background:${C.cream};padding:0 0 ${v.rhythm}px;">
${wrap(v, `<div style="display:flex;flex-direction:column;gap:${v.m ? 24 : 36}px;">
${sectTitle(v, 'Awards')}
<div>${v.m ? mobileRows : head + rows}</div>
<div style="display:flex;flex-direction:column;gap:10px;">
${para(v, 'Winning cases will be featured on the Alumni Policy Network webpage and promoted through KDIS newsletters and social media channels, including interviews with the winning teams.', C.grayDeep, v.body - 1)}
${para(v, 'Additional prizes may be available for KOICA alumni participants.', C.grayDeep, v.body - 1)}</div></div>`)}</div>`;
}

function datesSection(v) {
  const node = (label, when, last) => `<div style="display:flex;${v.m ? '' : 'flex:1;'}flex-direction:${v.m ? 'row' : 'column'};gap:${v.m ? 18 : 0};">
${v.m ? `<div style="display:flex;flex-direction:column;align-items:center;flex:none;width:16px;">
<div style="width:14px;height:14px;border-radius:999px;background:${C.tealDeep};flex:none;"></div>
${last ? '' : `<div style="width:2px;flex:1;background:${C.tealLight};min-height:56px;"></div>`}</div>` : ''}
<div style="display:flex;flex-direction:column;gap:${v.m ? 6 : 0};${v.m ? 'padding-bottom:28px;' : ''}">
${v.m ? '' : `<div style="display:flex;align-items:center;"><div style="width:14px;height:14px;border-radius:999px;background:${C.tealDeep};flex:none;"></div>${last ? '' : `<div style="height:2px;flex:1;background:${C.tealLight};"></div>`}</div>`}
<div style="${v.m ? '' : 'padding:20px 24px 0 0;'}display:flex;flex-direction:column;gap:8px;">
${eyebrow(v, label, C.ink)}
<div style="font-family:${F.cond};font-weight:600;font-size:${v.m ? 17 : 20}px;color:${C.tealDeep};">${esc(when)}</div></div></div></div>`;
  const timeline = `<div style="display:flex;flex-direction:${v.m ? 'column' : 'row'};">${DATES.map(([l, w], i) => node(l, w, i === DATES.length - 1)).join('')}</div>`;
  return `<div style="background:${C.cream};padding:0 0 ${v.rhythm}px;">
${wrap(v, `<div style="display:flex;flex-direction:column;gap:${v.m ? 28 : 40}px;">${sectTitle(v, 'Key dates')}${timeline}</div>`)}</div>`;
}

function closingSection(v) {
  return `<div style="background:${C.tealForest};padding:${v.m ? 72 : 112}px 0;">
${wrap(v, `<div style="max-width:720px;margin:0 auto;display:flex;flex-direction:column;gap:${v.m ? 24 : 32}px;${v.m ? '' : 'align-items:center;text-align:center;'}">
<h2 style="font-family:${F.display};font-size:${v.m ? 30 : 44}px;line-height:.98;letter-spacing:-.02em;text-transform:uppercase;color:${C.cream};text-wrap:pretty;">Your experience can strengthen the network</h2>
<p style="font-family:${F.body};font-size:${v.body}px;line-height:1.7;color:${C.tealLight};">For professionals already working in these fields, the competition offers an opportunity to share your achievements internationally and meet potential collaborators. For graduating students and those preparing to enter the sector, it provides a valuable chance to learn from real-world policy cases and connect with experienced practitioners.</p>
<p style="font-family:${F.body};font-size:${v.m ? 18 : 20}px;line-height:1.6;color:${C.cream};">If you work in this field—or hope to do so in the future—this network is for you.</p>
<p style="font-family:${F.body};font-size:${v.body}px;line-height:1.7;color:${C.tealLight};">We look forward to your participation and to seeing the ideas, experiences, and new connections that emerge from across the KDIS community.</p>
<div style="display:flex;flex-direction:column;gap:2px;font-family:${F.body};font-size:${v.body}px;line-height:1.6;color:${C.cream};">
<div>Warm regards,</div><div style="font-family:${F.cond};font-weight:600;">KDI School of Public Policy and Management</div></div>
<div style="margin-top:${v.m ? 8 : 16}px;${v.m ? 'align-self:stretch;display:flex;' : ''}">${btn(v, 'Submit a case', 'onDarkFill')}</div></div>`)}</div>`;
}

// The mobile page runs past the 8000px artboard ceiling, so it is also emitted
// as two halves. The cut falls between "who may enter" and "how to enter".
function competitionParts(v) {
  return {
    top: [header(v, 'competition'), heroCompetition(v), hookBox(v), manilaSection(v),
      themeSection(v), watchSection(v), whoSection(v)],
    rest: [submitSection(v), aiSection(v), evaluationSection(v), awardsSection(v),
      datesSection(v), closingSection(v), footer(v)],
  };
}

function competitionPage(v) {
  const { top, rest } = competitionParts(v);
  return [...top, ...rest].join('');
}

/* ------------------------------------------------------- artboard: modal */

function modalArtboard() {
  const v = DESKTOP;
  const behind = `<div style="filter:blur(1.5px);">${header(v, 'conference')}
<div style="background:${C.cream};padding:56px 0 0;">
${wrap(v, `<div style="display:flex;flex-direction:column;gap:40px;">
<div style="display:flex;flex-direction:column;gap:16px;">${eyebrow(v, 'The archive')}${sectTitle(v, 'Watch the conference')}${rule()}</div>
<div style="display:grid;grid-template-columns:repeat(3, minmax(0, 1fr));gap:32px;">${TALKS.slice(6, 12).map((t) => sessionCard(v, t)).join('')}</div></div>`)}</div></div>`;
  const t = TALKS[11];
  const panel = `<div style="position:absolute;top:52px;left:50%;transform:translateX(-50%);width:900px;background:${C.cream};border-radius:10px;overflow:hidden;">
<div style="position:relative;background:${C.tealForest};">
<img src="${t.id}.jpg" alt="" style="display:block;width:100%;aspect-ratio:16/9;object-fit:cover;"/>
<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;">${playBadge(84)}</div>
<div style="position:absolute;top:16px;right:16px;width:40px;height:40px;border-radius:999px;background:rgba(14,78,74,.86);display:flex;align-items:center;justify-content:center;">
<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 5l14 14M19 5L5 19" stroke="${C.cream}" stroke-width="2" stroke-linecap="square"/></svg></div></div>
<div style="padding:32px 40px 36px;display:flex;flex-direction:column;gap:16px;">
<div style="display:flex;align-items:center;gap:12px;">
<div style="display:inline-flex;align-items:center;height:26px;padding:0 10px;border-radius:4px;background:${C.tealDeep};font-family:${F.cond};font-weight:700;font-size:11px;letter-spacing:.10em;text-transform:uppercase;color:${C.cream};">Session ${t.s}</div>
<div style="font-family:${F.body};font-size:13px;color:${C.gray};">${esc(TRACKS[t.s])}</div></div>
<h2 style="font-family:${F.cond};font-weight:600;font-size:26px;line-height:1.3;color:${C.ink};text-wrap:pretty;">${esc(t.talk)}</h2>
${rule(C.lineSoft)}
<div style="display:flex;align-items:flex-end;justify-content:space-between;gap:32px;">
<div style="display:flex;flex-direction:column;gap:4px;">
<div style="font-family:${F.cond};font-weight:600;font-size:17px;color:${C.ink};">${esc(t.speaker)}</div>
<div style="font-family:${F.body};font-size:14px;line-height:1.5;color:${C.gray};">${esc(t.role)} · ${esc(t.affil)}</div></div>
${slidesButton(v, t.id)}</div></div></div>`;
  return `<div style="position:relative;width:${v.w}px;height:900px;overflow:hidden;background:${C.cream};">
${behind}
<div style="position:absolute;inset:0;background:rgba(14,78,74,.88);"></div>
${panel}</div>`;
}

/* --------------------------------------------- artboard: mobile menu open */

// A full-screen teal-forest sheet, matching the language the site already uses
// for overlays. Two destinations, so the list can afford display type rather
// than the usual cramped drawer.
function mobileMenuArtboard() {
  const v = MOBILE;
  // Each item takes an equal share of the space between header and CTA, so the
  // sheet reads as a composed screen rather than a short list with a hole under it.
  const item = (n, label, meta, current) => `<div style="display:flex;flex:1;gap:16px;align-items:center;padding:24px 0;border-bottom:1px solid rgba(253,251,245,.18);">
<div style="align-self:stretch;width:3px;flex:none;background:${current ? C.tealMid : 'transparent'};border-radius:2px;"></div>
<div style="display:flex;flex-direction:column;gap:10px;flex:1;">
<div style="font-family:${F.cond};font-weight:700;font-size:12px;letter-spacing:.10em;text-transform:uppercase;color:${current ? C.tealMid : 'rgba(253,251,245,.50)'};">${esc(n)}${current ? ' · Current' : ''}</div>
<div style="font-family:${F.display};font-size:52px;line-height:.94;letter-spacing:-.02em;text-transform:uppercase;color:${C.cream};">${esc(label)}</div>
<div style="font-family:${F.body};font-size:14px;line-height:1.5;color:${C.tealLight};">${esc(meta)}</div></div></div>`;

  const topBar = `<div style="display:flex;align-items:center;justify-content:space-between;height:${v.headerH}px;border-bottom:1px solid rgba(253,251,245,.18);">
<div style="font-family:${F.cond};font-weight:700;font-size:13px;letter-spacing:.10em;text-transform:uppercase;color:${C.cream};"><span style="color:${C.tealLight};">KDIS</span> Alumni Policy Network</div>
<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 5l14 14M19 5L5 19" stroke="${C.cream}" stroke-width="1.8" stroke-linecap="square"/></svg></div>`;

  const bottom = `<div style="display:flex;flex-direction:column;gap:20px;padding:28px 0 32px;">
${btn(v, 'Submit a case', 'onDarkFill')}
<div style="height:1px;background:rgba(253,251,245,.20);"></div>
<div style="display:flex;flex-direction:column;gap:6px;">
<div style="font-family:${F.body};font-size:13px;line-height:1.55;color:${C.tealLight};">KDI School of Public Policy and Management</div>
<div style="font-family:${F.body};font-size:12px;line-height:1.55;color:rgba(253,251,245,.50);">KDI School – ADB Joint Conference for Global Alumni · Manila · April 22–23, 2026</div></div></div>`;

  return `<div style="width:${v.w}px;height:844px;background:${C.tealForest};overflow:hidden;">
<div style="display:flex;flex-direction:column;height:844px;padding:0 ${v.pad}px;">
${topBar}
<div style="display:flex;flex-direction:column;flex:1;min-height:0;">
${item('01', 'Competition', `Submissions open ${DATES[0][1]}`, true)}
${item('02', 'Conference', '13 talks · 5 sessions · slide decks', false)}</div>
${bottom}</div></div>`;
}

/* ------------------------------------------------------------- assembly */

const HELMET = `<helmet>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Anton&amp;family=Roboto+Condensed:wght@400;600;700&amp;family=Roboto:wght@400;500&amp;display=swap"/>
<style>
  * { box-sizing: border-box; }
  body { margin: 0; background: ${C.cream}; color: ${C.ink}; font-family: ${F.body}; -webkit-font-smoothing: antialiased; }
  p, h1, h2, h3, h4 { margin: 0; font-weight: 400; }
  ul, li { margin: 0; padding: 0; list-style: none; }
  img { max-width: 100%; }
  a { color: ${C.tealDeep}; text-decoration: none; }
  a:hover { color: ${C.tealForest}; }
</style>
</helmet>`;

function doc(inner, width) {
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <script src="./support.js"></script>
</head>
<body>
<x-dc>
${HELMET}
<div style="width:${width}px;background:${C.cream};">
${inner}
</div>
</x-dc>
</body>
</html>
`;
}

// Main is the entry artboard, so Competition holds it — it is the site's
// first page and the one a focused open lands on.
const FILES = {
  'Main.dc.html': doc(competitionPage(DESKTOP), DESKTOP.w),
  'Conference.dc.html': doc(conferencePage(DESKTOP), DESKTOP.w),
  'ConferenceModal.dc.html': doc(modalArtboard(), DESKTOP.w),
  'MobileCompetition.dc.html': doc(competitionParts(MOBILE).top.join(''), MOBILE.w),
  'MobileCompetition2.dc.html': doc(competitionParts(MOBILE).rest.join(''), MOBILE.w),
  'MobileConference.dc.html': doc(conferencePage(MOBILE), MOBILE.w),
  'MobileMenu.dc.html': doc(mobileMenuArtboard(), MOBILE.w),
};

for (const [name, html] of Object.entries(FILES)) {
  writeFileSync(join(OUT, name), html, 'utf8');
  console.log(`${name.padEnd(26)} ${String(html.length).padStart(7)} bytes`);
}
