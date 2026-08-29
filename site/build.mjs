// Emits index.html (Competition) and conference.html from one set of data.
// Output is plain static HTML — no runtime templating, no framework.
//   run:  node site/build.mjs
import { writeFileSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = dirname(fileURLToPath(import.meta.url));
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* ------------------------------------------------------------------ data */

const SLIDES = JSON.parse(readFileSync(join(OUT, '..', 'design', 'slides', 'manifest.json'), 'utf8'));
const mb = (b) => `${(b / 1048576).toFixed(1)} MB`;

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
  { s: 1, talk: "Korea's Green Revolution", speaker: 'Il Jeong Jeong', role: 'Former Director General for International Cooperation Bureau', affil: 'Ministry of Agriculture, Food and Rural Affairs, Republic of Korea', id: 'MIEJi_GWYv4' },
  { s: 1, talk: 'Smart Greenhouse Horticulture and Vertical Farming in Korea', speaker: 'Jung Eek Son', role: 'Chairman / Director · Professor Emeritus', affil: 'Korea Smart Farm R&D Foundation · Dept. of Agriculture, Forestry & Bioresources, Seoul National University', id: '2O3aMFhveeg' },
  { s: 1, talk: 'Smart Agriculture in Japan: Policies for Data-Driven Greenhouse Horticulture', speaker: 'Tadahisa Higashide', role: 'Director, Institute of Vegetable and Floriculture Science', affil: 'National Agriculture and Food Research Organization (NARO)', id: 'kVo5HeDcOPM' },
  { s: 1, talk: 'Smart Agriculture in Asia and the Pacific', speaker: 'Monica Petri', role: 'Senior Natural Resources and Agriculture Specialist', affil: 'Asian Development Bank (ADB)', id: '4jzEQClk93U' },
  { s: 2, talk: 'Strategic Frameworks for Research-to-Impact in Rice Science', speaker: 'Yvonne Pinto', role: 'Director General', affil: 'International Rice Research Institute (IRRI)', id: 'lIMRQQaWidQ' },
  { s: 2, talk: 'AI-Enabled Earth Observation for Monitoring and Predicting the Hydrological Cycle: Focus on Droughts and Floods', speaker: 'Hyunglok Kim', role: 'Professor', affil: 'Gwangju Institute of Science and Technology (GIST)', id: 'UrwG47ZjtRs' },
  { s: 3, talk: 'Sustainable Vertical Farming', speaker: 'Jong Myung Lee', role: 'Task Leader', affil: 'LG CNS', id: 'dPDsiZTQiJ8' },
  { s: 3, talk: 'Harnessing Technology. Revolutionizing Global Food & Agriculture.', speaker: 'Aditya Shah', role: 'Global Director', affil: 'Cropin', id: 'U7EuQw3oZG4' },
  { s: 4, talk: 'Institutional Innovations in South Korean Reforestation and Implications for REDD+', speaker: 'Taejong Kim', role: 'Professor', affil: 'KDI School of Public Policy and Management', id: 'itiXq6iGK0Q' },
  { s: 5, talk: "Forests, Finance, and Climate Action: Lessons from the World Bank's Experience in Forest Carbon", speaker: 'Stephanie Tam', role: 'Senior Climate Finance Specialist', affil: 'World Bank', id: 'pxh7iUYVAaE' },
  { s: 5, talk: 'Carbon Finance and Regional Investment: Integrating REDD+ and Nature-Based Solutions (NbS)', speaker: 'Virender Kumar Duggal', role: 'Principal Climate Change Specialist', affil: 'Climate Change and Sustainable Development Department, Asian Development Bank (ADB)', id: 'hVWcLhA-Fwo' },
  { s: 5, talk: 'Towards REDD+ Implementation: Deforestation and Forest Degradation Drivers, REDD+ Financing, and Readiness Activities in Participant Countries', speaker: 'Yohan Lee', role: 'Professor', affil: 'Department of Forest Sciences, Seoul National University', id: 'IqDGMGDdjxA' },
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

// The submission form. It lives off-site, so every Submit button opens a new
// tab — someone reading the requirements should not lose the page.
const SUBMIT_URL = 'https://forms.gle/f1AeBRNezv9K6Mjq9';

// One helper, so the new-tab attributes and the screen-reader note cannot
// drift apart across the six places this button appears.
const submitLink = (cls, label) =>
  `<a${cls ? ` class="${cls}"` : ''} href="${SUBMIT_URL}" target="_blank" rel="noopener">${label}<span class="sr-only"> (opens in a new tab)</span></a>`;

// ---- to be supplied -------------------------------------------------------
const SITE_URL = 'https://kdis-alumni-policy-network.vercel.app'; // set to the real domain before launch

// Machine-readable twin of DATES[1], for the hero countdown. Korean time —
// the deadline runs to the end of that day. The opening date stays prose only.
const DEADLINE_AT = '2026-10-11T23:59:59+09:00';
// Slide decks live on Google Drive, keyed by the same video id as everything
// else. Verified 2026-08-29: all 13 are publicly readable and this URL form
// returns the file as an attachment (content-disposition), so the browser
// downloads it instead of navigating to a Drive preview page.
// Each id was confirmed against the local original by byte size.
const DRIVE = {
  MIEJi_GWYv4: '1wLh8afH0AUJkIO2dzLNG50xXbWBny0YV',   // Il Jeong Jeong
  '2O3aMFhveeg': '1qzF5SHuTH6E7TJt_dpiAy9QixstFwzsF', // Jung Eek Son
  kVo5HeDcOPM: '1ylqwRjBNKQ4Lalxh_b_HH6zqzd98x7dA',   // Tadahisa Higashide
  '4jzEQClk93U': '1H0vxK8UVS0zYqBxJkQGy15DCMN1mX10F', // Monica Petri
  lIMRQQaWidQ: '1bcEsJs6fkA0EYtfKXQtMQPxNqUk29yyy',   // Yvonne Pinto
  UrwG47ZjtRs: '1tv6ocn3oDihrpwXC_x6aDuTZQlpiVxeU',   // Hyunglok Kim
  dPDsiZTQiJ8: '1oJ7HhacEHBzDbyS7fNm0elV1ONyrVacW',   // Jong Myung Lee
  U7EuQw3oZG4: '15wY--qtxUtTuP7LarpnAo_3tfqPRZzw2',   // Aditya Shah
  Msy7ocHWwqM: '16qgNEOP5zL69TBEbpSIel7wNYNNDs5yX',   // Kyung Joon Lee (keynote)
  itiXq6iGK0Q: '1kpTnPhQUJF_oj25_Y2XDifAaD-KZA6dr',   // Taejong Kim
  pxh7iUYVAaE: '1zW0I7aiTVFynxe5-WXRq8DF4CaE4Zopc',   // Stephanie Tam
  'hVWcLhA-Fwo': '19xZv1PUpAnTUBja3w_c7OOQIVWhxQaJ-', // Virender Kumar Duggal
  IqDGMGDdjxA: '1GhRk6UL9R8k5AMueDo32_tBxni1HQDT1',   // Yohan Lee
};
const slidesUrl = (videoId) => {
  const id = DRIVE[videoId];
  if (!id) throw new Error(`No Drive file mapped for ${videoId}`);
  return `https://drive.google.com/uc?export=download&id=${id}`;
};

/* ------------------------------------------------------------- fragments */

const ICON = {
  play: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8 5.2v13.6L19 12 8 5.2Z"/></svg>',
  download: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d="M12 3.5v11.5M7.2 10.6 12 15.4l4.8-4.8" stroke="currentColor" stroke-width="2" stroke-linecap="square"/><path d="M4.5 19.5h15" stroke="currentColor" stroke-width="2" stroke-linecap="square"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d="M4.5 12.5 9.5 17.5 19.5 6.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="square"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d="M4 12h15M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="square"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d="M3 6.5h18M3 12h18M3 17.5h18" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d="M5 5l14 14M19 5L5 19" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/></svg>',
};

// The hero backdrop. waves.js paints drifting contour lines into this;
// if the script never runs it is simply an empty, harmless box.
const motif = () => '<div class="waves" data-waves aria-hidden="true"></div>';

const header = (page) => `<header class="site-header" data-header>
  <div class="wrap site-header__inner">
    <a class="wordmark" href="index.html"><span>KDIS</span> Alumni Policy Network</a>
    <nav class="nav" aria-label="Main">
      <a class="nav__item${page === 'competition' ? ' is-current' : ''}" href="index.html"${page === 'competition' ? ' aria-current="page"' : ''}>Competition</a>
      <a class="nav__item${page === 'conference' ? ' is-current' : ''}" href="conference.html"${page === 'conference' ? ' aria-current="page"' : ''}>Conference</a>
      <span class="nav__rule" aria-hidden="true"></span>
      ${submitLink('btn btn--primary nav__cta', 'Submit a case')}
    </nav>
    <button class="menu-toggle" type="button" data-menu-open aria-expanded="false" aria-controls="menu-sheet">
      ${ICON.menu}<span class="sr-only">Open menu</span>
    </button>
  </div>
</header>

<div class="menu-sheet" id="menu-sheet" data-menu hidden>
  <div class="wrap menu-sheet__inner">
    <div class="menu-sheet__bar">
      <span class="wordmark wordmark--light"><span>KDIS</span> Alumni Policy Network</span>
      <button class="menu-close" type="button" data-menu-close>${ICON.close}<span class="sr-only">Close menu</span></button>
    </div>
    <ul class="menu-list">
      <li class="menu-list__item${page === 'competition' ? ' is-current' : ''}">
        <span class="menu-list__index">01${page === 'competition' ? ' · Current' : ''}</span>
        <a class="menu-list__link" href="index.html">Competition</a>
        <span class="menu-list__meta">Submissions open ${esc(DATES[0][1])}</span>
      </li>
      <li class="menu-list__item${page === 'conference' ? ' is-current' : ''}">
        <span class="menu-list__index">02${page === 'conference' ? ' · Current' : ''}</span>
        <a class="menu-list__link" href="conference.html">Conference</a>
        <span class="menu-list__meta">13 talks · 5 sessions · slide decks</span>
      </li>
    </ul>
    <div class="menu-sheet__foot">
      ${submitLink('btn btn--on-dark-fill', 'Submit a case')}
      <hr class="rule rule--light">
      <p class="menu-sheet__org">KDI School of Public Policy and Management</p>
      <p class="menu-sheet__note">KDI School – ADB Joint Conference for Global Alumni · Manila · April 22–23, 2026</p>
    </div>
  </div>
</div>`;

const footer = () => `<footer class="site-footer">
  <div class="wrap">
    <div class="site-footer__cols">
      <div>
        <p class="wordmark wordmark--light"><span>KDIS</span> Alumni Policy Network</p>
        <p class="site-footer__org">KDI School of Public Policy and Management</p>
      </div>
      <nav class="site-footer__nav" aria-label="Footer">
        <p class="eyebrow eyebrow--mid">Navigate</p>
        <a href="index.html">Competition</a>
        <a href="conference.html">Conference</a>
        ${submitLink('', 'Submit a Case')}
      </nav>
      <div>
        <p class="eyebrow eyebrow--mid">Organised by</p>
        <div class="logo-plate">
          <img src="media/kdis-logo.png" alt="KDI School of Public Policy and Management"
               width="560" height="141" loading="lazy" decoding="async">
        </div>
      </div>
    </div>
    <hr class="rule rule--light">
    <p class="site-footer__copy">© 2026 KDI School of Public Policy and Management. All rights reserved.</p>
  </div>
</footer>`;

function page({ title, description, page: p, body, script }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="website">
<link rel="canonical" href="${SITE_URL}/${p === 'competition' ? '' : 'conference'}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<meta name="theme-color" content="#FDFBF5">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Anton&family=Roboto+Condensed:wght@400;600;700&family=Roboto:wght@400;500;700;900&display=swap">
<link rel="stylesheet" href="assets/style.css">
</head>
<body data-page="${p}">
<a class="skip-link" href="#main">Skip to content</a>
<div class="scroll-progress" data-progress aria-hidden="true"><span></span></div>
<div class="cursor-glow" data-glow aria-hidden="true"></div>
<div class="grain" aria-hidden="true"></div>
${header(p)}
<main id="main">
${body}
</main>
${footer()}
<script src="assets/app.js" defer></script>
<script src="assets/waves.js" defer></script>
<script src="assets/vendor/gsap.min.js" defer></script>
<script src="assets/vendor/ScrollTrigger.min.js" defer></script>
<script src="assets/vendor/lenis.min.js" defer></script>
<script src="assets/motion.js" defer></script>${script ? `\n<script src="${script}" defer></script>` : ''}
</body>
</html>
`;
}

/* ----------------------------------------------------- page: competition */

const hookBox = () => {
  const cols = [
    ['01', 'Who', 'KDIS alumni and graduating students working in or seeking to enter relevant fields: Agriculture and Forestry.'],
    ['02', 'How', 'Submit a policy innovation case individually or in a team of up to three'],
    ['03', 'What you gain', 'KRW 2.2 million Prize, expert feedback, global visibility, professional connections, and opportunities for future collaboration'],
  ].map(([n, label, text]) => `<div class="hook__col">
        <span class="hook__num">${n}</span>
        <h2 class="eyebrow eyebrow--ink">${esc(label)}</h2>
        <p>${esc(text)}</p>
      </div>`).join('\n      ');
  return `<section class="hook-band">
  <div class="wrap">
    <div class="hook reveal">
      <div class="hook__cols">
      ${cols}
      </div>
      <hr class="rule">
      <p class="hook__line">Share a case. Find your peers. Build what comes next.</p>
    </div>
  </div>
</section>`;
};

const competitionBody = () => `<section class="hero hero--competition">
  ${motif()}
  <div class="wrap hero__inner">
    <p class="eyebrow">Open to KDIS alumni and graduating students</p>
    <h1 class="display display--hero" data-hero-lines>
      <span class="line"><span>2026 KDIS</span></span>
      <span class="line"><span>Policy Innovation</span></span>
      <span class="line"><span>Case Competition</span></span>
    </h1>
    <p class="hero__pull">One competition. A network that lasts.</p>
    <p class="hero__sub">Share your policy case and connect with the global KDIS community shaping the future of agriculture and forestry.</p>
    <div class="countdown" data-countdown data-deadline="${DEADLINE_AT}">
      <p class="countdown__label" data-countdown-label>Submission deadline</p>
      <p class="countdown__clock" data-countdown-clock hidden>
        <span class="countdown__unit"><b data-unit="days">—</b><i>days</i></span>
        <span class="countdown__unit"><b data-unit="hours">—</b><i>hrs</i></span>
        <span class="countdown__unit"><b data-unit="minutes">—</b><i>min</i></span>
        <span class="countdown__unit"><b data-unit="seconds">—</b><i>sec</i></span>
      </p>
      <p class="countdown__date"><time datetime="2026-10-11">${esc(DATES[1][1])}</time> · Opens <time datetime="2026-08-31">${esc(DATES[0][1])}</time></p>
    </div>
    <p class="hero__actions">
      ${submitLink('btn btn--primary', 'Submit a case')}
      <a class="btn btn--secondary" href="conference.html">Watch the conference</a>
    </p>
  </div>
</section>

${hookBox()}

<section class="section">
  <div class="wrap cols-2">
    <h2 class="display display--section cols-2__aside reveal">From the Manila conference to a lasting professional network</h2>
    <div class="prose reveal">
      <p>This competition is a follow-up initiative to the KDI School–ADB Joint Conference for Global Alumni, held on April 22–23, 2026, at the Asian Development Bank Headquarters in Manila, the Philippines.</p>
      <blockquote>“From Food Security to Smart Agriculture and Sustainable Forests: Korea's Development Pathways and Lessons for Asia and the Pacific”</blockquote>
      <p>Under that theme, the conference brought together experts and practitioners from ADB, the World Bank, governments, academia, the private sector, and the KDIS alumni community to exchange policy experiences and new ideas.</p>
      <p>Building on those discussions, KDI School seeks to develop a lasting professional network through which alumni, graduating students, and sector experts can continue to exchange knowledge, learn from one another, and explore future collaboration. This competition is the first step in expanding that network.</p>
    </div>
  </div>
</section>

<section class="section section--tight">
  <div class="wrap reveal">
    <p class="eyebrow">Competition theme</p>
    <h2 class="display display--section">Sustainable agriculture and forestry</h2>
    <p class="lead">We welcome policy and program cases covering areas such as:</p>
    <ol class="theme-grid">
      ${THEMES.map((t, i) => `<li class="theme-card"><span class="theme-card__num">${String(i + 1).padStart(2, '0')}</span><span class="theme-card__name">${esc(t)}</span></li>`).join('\n      ')}
    </ol>
  </div>
</section>

<section class="band">
  <div class="wrap cols-watch reveal">
    <div>
      <p class="eyebrow">Watch, learn, and connect</p>
      <h2 class="display display--section">Draw on the conference</h2>
      <div class="prose">
        <p>Keynote presentations and session videos from the April KDIS-ADB conference are available NOW.</p>
        <p>Participants are encouraged to revisit these sessions and draw inspiration from the experiences and insights shared by international experts.</p>
      </div>
    </div>
    <div class="watch-preview">
      <div class="watch-preview__grid">
        ${['MIEJi_GWYv4', 'lIMRQQaWidQ', 'dPDsiZTQiJ8', 'pxh7iUYVAaE'].map((id) => `<a class="watch-thumb" href="conference.html" aria-label="Go to the conference archive">
          <img src="media/thumbs/${id}.jpg" alt="" width="800" height="450" loading="lazy" decoding="async">
          <span class="watch-thumb__play">${ICON.play}</span>
        </a>`).join('\n        ')}
      </div>
      <a class="link-arrow" href="conference.html">View all 13 talks ${ICON.arrow}</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap reveal">
    <h2 class="display display--section">Who can participate?</h2>
    <p class="lead">The competition is open to KDIS alumni and graduating students who:</p>
    <ul class="check-list">
      ${ELIGIBILITY.map((t) => `<li>${ICON.check}<span>${esc(t)}</span></li>`).join('\n      ')}
    </ul>
    <div class="note-strip">
      <p>You may participate individually or in a team of up to three members.</p>
      <p>Prior professional experience in the sector is not required; those preparing to enter the field are equally encouraged to apply.</p>
    </div>
  </div>
</section>

<section class="section section--tight">
  <div class="wrap reveal">
    <h2 class="display display--section">Two things to submit</h2>
    <p class="lead submit-lead">Both are required: a <strong>summary report</strong> and <strong>one piece of visual material</strong>.</p>

    <div class="submit-block">
      <div class="submit-block__head">
        <span class="step">1 of 2</span>
        <h3 class="display display--sub">Summary report</h3>
        <span class="badge badge--required">Required</span>
      </div>
      <p class="submit-block__format">2–5 pages · English · A4</p>
      <p class="lead">Submit a report in English, using A4 page format and covering the following:</p>
      <ol class="parts">
        ${REPORT_PARTS.map(([label, desc], i) => `<li class="part">
          <span class="part__num">${String(i + 1).padStart(2, '0')}</span>
          <span class="part__body"><strong>${esc(label)}</strong><span>${esc(desc)}</span></span>
        </li>`).join('\n        ')}
      </ol>
    </div>

    <p class="submit-join"><span class="submit-join__mark" aria-hidden="true">+</span><span class="submit-join__note">both are required</span></p>

    <div class="submit-block">
      <div class="submit-block__head">
        <span class="step">2 of 2</span>
        <h3 class="display display--sub">Visual material</h3>
        <span class="badge badge--required">Required</span>
      </div>
      <p class="submit-block__format">Pick one format</p>
      <div class="options">
        <div class="option"><h4 class="eyebrow">Video</h4><p>A video of up to five minutes, submitted as a YouTube link or video file</p></div>
        <span class="options__or" aria-hidden="true">or</span>
        <div class="option"><h4 class="eyebrow">Infographic</h4><p>A one-page visual summary in PNG or PDF format</p></div>
      </div>
    </div>
  </div>
</section>

<section class="section section--tight">
  <div class="wrap reveal">
    <aside class="advisory">
      <h2 class="eyebrow eyebrow--ink">Responsible use of AI</h2>
      <p>All Summary Reports will be reviewed for the use of AI. AI tools may be used for supporting tasks such as translation and proofreading; however, excessive reliance on generative AI <strong>may result in point deductions</strong>. The core analysis and writing must be the participant's own work.</p>
    </aside>
  </div>
</section>

<section class="section section--tight">
  <div class="wrap reveal">
    <h2 class="display display--section">Evaluation</h2>
    <p class="lead">Submissions will be reviewed by a panel comprising ADB specialists, external sector experts, and KDIS faculty. Cases will be assessed according to three criteria:</p>
    <div class="criteria">
      ${CRITERIA.map(([label, q]) => `<div class="criterion"><h3 class="eyebrow eyebrow--ink">${esc(label)}</h3><p>${esc(q)}</p></div>`).join('\n      ')}
    </div>
    <p class="reassure">Every shortlisted case will receive expert feedback — regardless of whether it receives an award.</p>
  </div>
</section>

<section class="section section--tight">
  <div class="wrap reveal">
    <h2 class="display display--section">Awards</h2>
    <table class="awards">
      <thead><tr><th scope="col">Award</th><th scope="col">Recipients</th><th scope="col" class="awards__prize">Prize</th></tr></thead>
      <tbody>
        ${AWARDS.map(([a, r, p]) => `<tr><th scope="row">${esc(a)}</th><td>${esc(r)}</td><td class="awards__prize"><span class="${p.startsWith('KRW') ? 'prize' : 'prize prize--text'}">${esc(p)}</span></td></tr>`).join('\n        ')}
      </tbody>
    </table>
    <div class="prose prose--small">
      <p>Winning cases will be featured on the Alumni Policy Network webpage and promoted through KDIS newsletters and social media channels, including interviews with the winning teams.</p>
      <p>Additional prizes may be available for KOICA alumni participants.</p>
    </div>
  </div>
</section>

<section class="section section--tight">
  <div class="wrap reveal">
    <h2 class="display display--section">Key dates</h2>
    <ol class="timeline">
      ${DATES.map(([l, w]) => `<li class="timeline__step"><span class="timeline__node" aria-hidden="true"></span><span class="timeline__label">${esc(l)}</span><span class="timeline__when">${esc(w)}</span></li>`).join('\n      ')}
    </ol>
  </div>
</section>

<section class="closing">
  <div class="wrap closing__inner reveal">
    <h2 class="display display--closing">Your experience can strengthen the network</h2>
    <p>For professionals already working in these fields, the competition offers an opportunity to share your achievements internationally and meet potential collaborators. For graduating students and those preparing to enter the sector, it provides a valuable chance to learn from real-world policy cases and connect with experienced practitioners.</p>
    <p class="closing__lead">If you work in this field—or hope to do so in the future—this network is for you.</p>
    <p>We look forward to your participation and to seeing the ideas, experiences, and new connections that emerge from across the KDIS community.</p>
    <p class="closing__sign">Warm regards,<br><strong>KDI School of Public Policy and Management</strong></p>
    <p>${submitLink('btn btn--on-dark-fill', 'Submit a case')}</p>
  </div>
</section>`;

/* ------------------------------------------------------ page: conference */

function card(t) {
  const s = SLIDES[t.id];
  return `<article class="card reveal" data-track="${t.s}">
        <div class="card__thumb">
          <img src="media/thumbs/${t.id}.jpg" alt="" width="800" height="450" loading="lazy" decoding="async">
          <span class="chip chip--track">Session ${t.s}</span>
          <span class="chip chip--pdf">${ICON.download}PDF</span>
          <span class="card__play" aria-hidden="true">${ICON.play}</span>
        </div>
        <div class="card__body">
          <h3 class="card__title">
            <button type="button" class="card__open"
              data-video="${t.id}"
              data-tag="Session ${t.s}" data-trackname="${esc(TRACKS[t.s])}"
              data-title="${esc(t.talk)}" data-speaker="${esc(t.speaker)}"
              data-role="${esc(t.role)} · ${esc(t.affil)}"
              data-slides="${slidesUrl(t.id)}"
              data-slides-meta="PDF · ${s.pages} pages · ${mb(s.bytes)}">${esc(t.talk)}</button>
          </h3>
          <div class="card__speaker">
            <p class="card__name">${esc(t.speaker)}</p>
            <p class="card__role">${esc(t.role)}</p>
            <p class="card__affil">${esc(t.affil)}</p>
          </div>
        </div>
      </article>`;
}

const conferenceBody = () => {
  const k = SLIDES[KEYNOTE.id];
  return `<section class="hero hero--conference">
  ${motif()}
  <div class="wrap hero__inner">
    <p class="eyebrow">KDI School – ADB Joint Conference for Global Alumni</p>
    <p class="eyebrow">ADB Headquarters, Manila · April 22–23, 2026</p>
    <h1 class="display display--hero" data-hero-lines>
      <span class="line"><span>From food security to</span></span>
      <span class="line"><span>smart agriculture and</span></span>
      <span class="line"><span>sustainable forests</span></span>
    </h1>
    <p class="hero__sub hero__sub--stack">Korea's Development Pathways<br>and Lessons for Asia and the Pacific</p>
    <ul class="stats">
      <li><span class="stats__num" data-count="1">1</span><span class="eyebrow eyebrow--muted">Keynote</span></li>
      <li><span class="stats__num" data-count="5">5</span><span class="eyebrow eyebrow--muted">Sessions</span></li>
      <li><span class="stats__num" data-count="13">13</span><span class="eyebrow eyebrow--muted">Talks</span></li>
    </ul>
  </div>
</section>

<div class="marquee" data-marquee aria-hidden="true">
  <div class="marquee__track">
    ${[1, 2, 3, 4, 5].map((n) => `<span class="marquee__item">${esc(TRACKS[n])}</span>`).join('\n    ')}
  </div>
</div>

<section class="keynote">
  <div class="wrap keynote__inner">
    <div class="keynote__thumb">
      <img src="media/thumbs/${KEYNOTE.id}.jpg" alt="" width="1280" height="720" decoding="async">
      <span class="chip chip--pdf">${ICON.download}PDF</span>
      <span class="card__play card__play--lg" aria-hidden="true">${ICON.play}</span>
    </div>
    <div class="keynote__text">
      <p class="eyebrow eyebrow--light">Keynote</p>
      <h2 class="display display--keynote">${esc(KEYNOTE.talk)}</h2>
      <div class="keynote__speaker">
        <p class="keynote__name">${esc(KEYNOTE.speaker)}</p>
        <p>${esc(KEYNOTE.role)}</p>
        <p>${esc(KEYNOTE.affil)}</p>
      </div>
      <p><button type="button" class="btn btn--on-dark-ghost card__open"
        data-video="${KEYNOTE.id}"
        data-tag="Keynote" data-trackname=""
        data-title="${esc(KEYNOTE.talk)}" data-speaker="${esc(KEYNOTE.speaker)}"
        data-role="${esc(KEYNOTE.role)} · ${esc(KEYNOTE.affil)}"
        data-slides="${slidesUrl(KEYNOTE.id)}"
        data-slides-meta="PDF · ${k.pages} pages · ${mb(k.bytes)}">Watch keynote</button></p>
    </div>
  </div>
</section>

<section class="section archive">
  <div class="wrap">
    <div class="archive__head reveal">
      <p class="eyebrow">The archive</p>
      <h2 class="display display--section">Watch the conference</h2>
      <p class="lead">Keynote presentations and session videos from the April conference — revisit the experiences and insights shared by international experts.</p>
      <hr class="rule">
    </div>
    <div class="filters">
      <div class="filters__chips" role="group" aria-label="Filter talks by session">
        <button type="button" class="chip-btn is-active" data-filter="all" aria-pressed="true">All</button>
        ${[1, 2, 3, 4, 5].map((n) => `<button type="button" class="chip-btn" data-filter="${n}" aria-pressed="false">Session ${n}</button>`).join('\n        ')}
      </div>
      <p class="filters__count" data-count-label aria-live="polite">Showing 12 of 13 talks</p>
    </div>
    <div class="grid" data-grid>
      ${TALKS.map(card).join('\n      ')}
    </div>
  </div>
</section>

<section class="cta">
  <div class="wrap cta__inner reveal">
    <h2 class="display display--section display--light">One competition. A network that lasts.</h2>
    <p>Share your policy case and connect with the global KDIS community shaping the future of agriculture and forestry.</p>
    <p class="cta__actions">
      <a class="btn btn--on-dark-fill" href="index.html">View the competition</a>
      ${submitLink('btn btn--on-dark-ghost', 'Submit a case')}
    </p>
  </div>
</section>

<div class="modal" data-modal hidden>
  <div class="modal__scrim" data-modal-close></div>
  <div class="modal__panel" role="dialog" aria-modal="true" aria-labelledby="modal-title">
    <div class="modal__video" data-modal-video></div>
    <button type="button" class="modal__close" data-modal-close>${ICON.close}<span class="sr-only">Close</span></button>
    <div class="modal__meta">
      <p class="modal__track"><span class="chip chip--track" data-modal-tag></span><span data-modal-trackname></span></p>
      <h2 class="modal__title" id="modal-title" data-modal-title></h2>
      <hr class="rule">
      <div class="modal__foot">
        <div class="modal__speaker">
          <p class="modal__name" data-modal-speaker></p>
          <p class="modal__role" data-modal-role></p>
        </div>
        <div class="modal__slides">
          <a class="btn btn--secondary" data-modal-slides target="_blank" rel="noopener">${ICON.download}Download slides</a>
          <p class="modal__slides-meta" data-modal-slides-meta></p>
        </div>
      </div>
      <p class="modal__fallback">Video not loading? <a data-modal-watch target="_blank" rel="noopener">Watch it on YouTube</a></p>
    </div>
  </div>
</div>`;
};

/* -------------------------------------------------------------- emitting */

writeFileSync(join(OUT, 'index.html'), page({
  title: '2026 KDIS Policy Innovation Case Competition — KDIS Alumni Policy Network',
  description: 'Share a policy innovation case in sustainable agriculture and forestry. Open to KDIS alumni and graduating students. Submissions open 31 August 2026.',
  page: 'competition',
  body: competitionBody(),
}), 'utf8');

writeFileSync(join(OUT, 'conference.html'), page({
  title: 'Conference archive — KDIS Alumni Policy Network',
  description: 'Keynote and session videos from the KDI School–ADB Joint Conference for Global Alumni, Manila, April 2026 — 13 talks with slide decks.',
  page: 'conference',
  body: conferenceBody(),
  script: 'assets/conference.js',
}), 'utf8');

// robots + sitemap — cleanUrls is on in vercel.json, so the canonical paths
// carry no .html extension.
writeFileSync(join(OUT, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`, 'utf8');

const today = new Date().toISOString().slice(0, 10);
writeFileSync(join(OUT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE_URL}/</loc><lastmod>${today}</lastmod><priority>1.0</priority></url>
  <url><loc>${SITE_URL}/conference</loc><lastmod>${today}</lastmod><priority>0.8</priority></url>
</urlset>
`, 'utf8');

for (const f of ['index.html', 'conference.html', 'robots.txt', 'sitemap.xml']) {
  console.log(`${f.padEnd(22)} ${readFileSync(join(OUT, f), 'utf8').length} bytes`);
}
