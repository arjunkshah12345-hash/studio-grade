/* Leave the Lights · the sky model (Canvas 2D, no dependencies).
   The canvas carries the argument: stars are drawn only if they are brighter than the limiting
   magnitude of the current Bortle class; the skyglow, the Milky Way and the street lamps follow
   the [data-sky] state of whatever section is in the middle of the viewport.
   Cheap by design: no per-frame work while nothing changes, DPR capped at 1.5, paused when the
   letter or footer covers the screen or the tab is hidden. */

const DEG = Math.PI / 180;
const LAT = 69.7, LON = 19.4;           // fictional Brekkøy, Tromsø latitude

/* ---------------- catalogue: real J2000 positions (RA hours, Dec °), V magnitude, B−V ---------------- */
const CAT = [
  // Ursa Minor (the Little Dipper test)
  ['Polaris', 2.530, 89.26, 1.98, .60, 'umi'], ['Kochab', 14.845, 74.16, 2.08, 1.47, 'umi'], ['Pherkad', 15.345, 71.83, 3.05, .05, 'umi'],
  ['Yildun', 17.537, 86.59, 4.35, .02, 'umi'], ['eps UMi', 16.766, 82.04, 4.21, .89, 'umi'], ['zet UMi', 15.734, 77.79, 4.32, .04, 'umi'],
  ['eta UMi', 16.292, 75.76, 4.95, .37, 'umi'],
  // Ursa Major
  ['Dubhe', 11.062, 61.75, 1.79, 1.07], ['Merak', 11.031, 56.38, 2.37, .03], ['Phecda', 11.897, 53.69, 2.44, .04], ['Megrez', 12.257, 57.03, 3.31, .08],
  ['Alioth', 12.900, 55.96, 1.77, -.02], ['Mizar', 13.399, 54.93, 2.23, .02], ['Alcor', 13.420, 54.99, 4.01, .16], ['Alkaid', 13.792, 49.31, 1.86, -.19],
  ['Muscida', 8.504, 60.72, 3.36, .86], ['psi UMa', 11.161, 44.50, 3.01, 1.14], ['mu UMa', 10.372, 41.50, 3.05, 1.59], ['lam UMa', 10.285, 42.91, 3.45, .03],
  ['Talitha', 8.987, 48.04, 3.14, .19], ['tet UMa', 9.547, 51.68, 3.17, .46], ['kap UMa', 9.060, 47.16, 3.60, .00], ['nu UMa', 11.308, 33.09, 3.48, 1.40],
  ['chi UMa', 11.768, 47.78, 3.71, 1.18], ['23 UMa', 9.525, 63.06, 3.67, .33], ['ups UMa', 9.849, 59.04, 3.80, .28],
  // Cassiopeia
  ['Caph', 0.153, 59.15, 2.27, .34], ['Schedar', 0.675, 56.54, 2.24, 1.17], ['Navi', 0.945, 60.72, 2.47, -.15], ['Ruchbah', 1.430, 60.24, 2.68, .13], ['Segin', 1.906, 63.67, 3.37, -.15],
  // Cepheus, Draco
  ['Alderamin', 21.310, 62.59, 2.45, .22], ['Errai', 23.656, 77.63, 3.21, 1.03], ['Alfirk', 21.478, 70.56, 3.23, -.22], ['zet Cep', 22.181, 58.20, 3.39, 1.57],
  ['iot Cep', 22.828, 66.20, 3.52, 1.05], ['del Cep', 22.486, 58.42, 4.07, .60],
  ['Thuban', 14.073, 64.38, 3.65, -.05], ['Eltanin', 17.943, 51.49, 2.23, 1.52], ['Rastaban', 17.507, 52.30, 2.79, .98], ['Edasich', 15.416, 58.97, 3.29, 1.16],
  ['Aldhibah', 17.146, 65.71, 3.17, -.12], ['Altais', 19.209, 67.66, 3.07, 1.00], ['chi Dra', 18.351, 72.73, 3.55, .49],
  // Perseus, Auriga, Andromeda, Triangulum, Camelopardalis, Lynx
  ['Mirfak', 3.405, 49.86, 1.79, .48], ['Algol', 3.136, 40.96, 2.12, -.05], ['gam Per', 3.080, 53.51, 2.93, .70], ['del Per', 3.715, 47.79, 3.01, -.13],
  ['eps Per', 3.964, 40.01, 2.89, -.18], ['zet Per', 3.902, 31.88, 2.85, .12], ['eta Per', 2.845, 55.90, 3.76, 1.68],
  ['Capella', 5.278, 46.00, 0.08, .80], ['Menkalinan', 5.992, 44.95, 1.90, .08], ['tet Aur', 5.995, 37.21, 2.62, -.08], ['iot Aur', 4.950, 33.17, 2.69, 1.53],
  ['eps Aur', 5.033, 43.82, 2.99, .54], ['eta Aur', 5.109, 41.23, 3.17, -.18],
  ['Almach', 2.065, 42.33, 2.10, 1.37], ['Mirach', 1.162, 35.62, 2.05, 1.58], ['Alpheratz', 0.140, 29.09, 2.06, -.11], ['del And', 0.656, 30.86, 3.27, 1.28],
  ['bet Tri', 2.159, 34.99, 3.00, .14], ['bet Cam', 5.057, 60.44, 4.03, .92], ['CS Cam', 3.484, 59.94, 4.21, .11], ['alf Lyn', 9.351, 34.39, 3.13, 1.55],
  // Lyra, Cygnus, Gemini, Boötes, Taurus (Pleiades)
  ['Vega', 18.616, 38.78, 0.03, .00], ['Sheliak', 18.835, 33.36, 3.52, .00], ['Sulafat', 18.982, 32.69, 3.25, -.05],
  ['Deneb', 20.690, 45.28, 1.25, .09], ['Sadr', 20.370, 40.26, 2.23, .67], ['Gienah', 20.770, 33.97, 2.48, 1.03], ['del Cyg', 19.750, 45.13, 2.87, -.03],
  ['Albireo', 19.512, 27.96, 3.05, 1.09], ['zet Cyg', 21.216, 30.23, 3.20, .99],
  ['Castor', 7.577, 31.89, 1.58, .03], ['Pollux', 7.755, 28.03, 1.14, 1.00], ['Arcturus', 14.261, 19.18, -.05, 1.23],
  ['Alcyone', 3.791, 24.11, 2.87, -.09], ['Atlas', 3.819, 24.05, 3.62, -.08], ['Electra', 3.747, 24.11, 3.70, -.11], ['Maia', 3.763, 24.37, 3.87, -.07],
  ['Merope', 3.772, 23.95, 4.18, -.06], ['Taygeta', 3.754, 24.47, 4.30, -.11],
];
const LINES = {
  umi: [['Polaris', 'Yildun'], ['Yildun', 'eps UMi'], ['eps UMi', 'zet UMi'], ['zet UMi', 'Kochab'], ['Kochab', 'Pherkad'], ['Pherkad', 'eta UMi'], ['eta UMi', 'zet UMi']],
  uma: [['Alkaid', 'Mizar'], ['Mizar', 'Alioth'], ['Alioth', 'Megrez'], ['Megrez', 'Phecda'], ['Phecda', 'Merak'], ['Merak', 'Dubhe'], ['Dubhe', 'Megrez']],
  cas: [['Caph', 'Schedar'], ['Schedar', 'Navi'], ['Navi', 'Ruchbah'], ['Ruchbah', 'Segin']],
};
// diffuse objects: [label, RA h, Dec °, visible-from limiting mag, full-at limiting mag, major °, minor °, position angle °]
const DIFFUSE = [
  ['Andromeda Galaxy', 0.712, 41.27, 4.7, 6.6, 3.2, 1.0, 35],
  ['Triangulum Galaxy', 1.564, 30.66, 6.5, 7.7, 1.0, .65, 23],
  ['Double Cluster', 2.33, 57.13, 4.5, 6.0, .9, .45, 90],
];

/* ---------------- the Bortle model (class → what the eye gets) ---------------- */
const NAMES = ['', 'Excellent dark-sky site', 'Typical truly dark site', 'Rural sky', 'Rural/suburban transition', 'Suburban sky',
  'Bright suburban sky', 'Suburban/urban transition', 'City sky', 'Inner-city sky'];
const LIM  = [0, 7.8, 7.3, 6.8, 6.3, 5.8, 5.3, 4.8, 4.3, 4.0];        // midpoints of Bortle's naked-eye limiting magnitude ranges
const GLOW = [0, 0, .03, .07, .12, .19, .28, .38, .5, .62];           // skyglow strength used by the drawing
const MW   = [0, 1, .86, .68, .48, .3, .15, .05, 0, 0];               // Milky Way visibility
const MWTXT = ['', 'to the horizon', 'highly structured', 'dark lanes', 'clear, no detail', 'weak, washed out', 'overhead only', 'barely', 'invisible', 'invisible'];
const tab = (T, b) => { b = Math.min(9, Math.max(1, b)); const i = Math.floor(b), f = b - i; return i >= 9 ? T[9] : T[i] + (T[i + 1] - T[i]) * f; };
const bFromGlow = (g) => { if (g <= 0) return 1; for (let i = 1; i < 9; i++) if (g <= GLOW[i + 1]) return i + (g - GLOW[i]) / (GLOW[i + 1] - GLOW[i]); return 9; };

/* ---------------- helpers ---------------- */
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const mix = (a, b, t) => a + (b - a) * t;
const mixRGB = (A, B, t) => A.map((v, i) => Math.round(mix(v, B[i], t)));
const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a.toFixed(3)})`;
function rng(seed) { return () => { seed |= 0; seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const gauss = (r) => { let u = 0, v = 0; while (!u) u = r(); while (!v) v = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };
const bvRGB = (bv) => bv < .15 ? [206, 220, 255] : bv < .55 ? [240, 242, 250] : bv < 1.0 ? [255, 238, 210] : [255, 214, 172];

// galactic ⇄ equatorial (J2000)
const aG = 192.85948 * DEG, dG = 27.12825 * DEG, lN = 122.93192 * DEG;
function galToEq(l, b) {
  const sd = Math.sin(b) * Math.sin(dG) + Math.cos(b) * Math.cos(dG) * Math.cos(lN - l);
  const y = Math.cos(b) * Math.sin(lN - l), x = Math.sin(b) * Math.cos(dG) - Math.cos(b) * Math.sin(dG) * Math.cos(lN - l);
  return [((aG + Math.atan2(y, x)) / DEG + 360) % 360, Math.asin(sd) / DEG];
}
const galLat = (ra, dec) => Math.asin(Math.sin(dec) * Math.sin(dG) + Math.cos(dec) * Math.cos(dG) * Math.cos(ra - aG));

// local sidereal time for 21:00 UTC today (≈ 22:00 in Brekkøy in winter, 23:00 in summer)
function skyInstant() {          // 22:00 tonight in Brekkøy (Europe/Oslo, so CET or CEST)
  const n = new Date(), probe = new Date(Date.UTC(n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate(), 21, 0));
  let off = 1; try { off = +new Intl.DateTimeFormat('en-GB', { hour: '2-digit', hourCycle: 'h23', timeZone: 'Europe/Oslo' }).format(probe) - 21; } catch (e) {}
  return new Date(probe.getTime() + (1 - off) * 3600000);
}
function lstDeg(date) { const D = date.getTime() / 86400000 + 2440587.5 - 2451545.0; return ((18.697374558 + 24.06570982441908 * D) * 15 + LON) % 360; }

/* ---------------- lamp colours (illustrative, not colourimetric) ---------------- */
const LAMP_COLD = [226, 234, 255], LAMP_WARM = [255, 190, 118];
const GLOW_COLD = [150, 162, 186], GLOW_WARM = [176, 136, 98];
const NIGHT = [5, 7, 12];

/* ======================================================================================= */
export function initSky({ canvas, reduced = false, onState = () => {} }) {
  const ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) throw new Error('no 2d context');

  const LST = lstDeg(skyInstant());
  let W = 0, H = 0, DPR = 1, G0 = 0, poleX = 0, poleY = 0, S = 1;
  let stars = [];            // [{x,y,m,c}] sorted by magnitude, on-screen only
  let named = {};            // name → {x,y,m}
  let mwCanvas = null, town = null, ridge = null, diffuse = [];
  let lampsX = [];

  // state: current (drawn) and target (from scroll)
  const keys = ['b', 'zoom', 'shield', 'cct', 'dim', 'labels'];
  const cur = { b: 9, zoom: 0, shield: 0, cct: 4000, dim: 1, labels: 0 };
  const tgt = { ...cur };
  let hudMode = 'scale';
  let intro = reduced ? null : { t0: performance.now(), on: [] };
  let paused = false, raf = 0, last = performance.now();

  /* ---------- geometry ---------- */
  const project = (raDeg, decDeg) => {
    const Hh = (LST - raDeg) * DEG, r = (90 - decDeg) * S;
    return [poleX - r * Math.sin(Hh), poleY - r * Math.cos(Hh)];
  };

  function build() {
    const r = rng(20010201);  // Bortle's issue date as the seed
    W = innerWidth; H = innerHeight; DPR = Math.min(1.5, devicePixelRatio || 1);
    canvas.width = Math.round(W * DPR); canvas.height = Math.round(H * DPR);
    const narrow = W < 700;
    G0 = H * 0.86;
    poleX = W * (narrow ? 0.62 : 0.68); poleY = H * (narrow ? 0.3 : 0.26);
    S = Math.min((G0 - poleY) / LAT, narrow ? W / 70 : 99);

    // catalogue
    named = {}; stars = [];
    for (const [name, ra, dec, m, bv, grp] of CAT) {
      const [x, y] = project(ra * 15, dec);
      named[name] = { x, y, m, grp };
      if (x > -20 && x < W + 20 && y > -20 && y < H) stars.push({ x, y, m, c: rgba(bvRGB(bv), 1), cc: bvRGB(bv) });
    }
    // modelled faint stars: N(<m) ∝ 10^(0.47 m), i.e. about three times more per magnitude; denser toward the galactic plane
    const k = 0.47, m0 = 4.45, m1 = narrow ? 7.7 : 8.0, A0 = 10 ** (k * m0), A1 = 10 ** (k * m1);
    const N = narrow ? 14000 : 30000;
    for (let i = 0; i < N; i++) {
      const z = 1 - r() * (1 + Math.cos(70 * DEG));          // polar distance ≤ 110°
      const p = Math.acos(z), ra = r() * 2 * Math.PI, dec = Math.PI / 2 - p;
      const m = Math.log10(A0 + r() * (A1 - A0)) / k;
      const gb = Math.abs(galLat(ra, dec)) / DEG;
      const keep = 0.42 + 0.58 * Math.exp(-((gb / 14) ** 2)) * clamp((m - 4.5) / 3);
      if (r() > keep) continue;
      const [x, y] = project(ra / DEG, dec / DEG);
      if (x < 0 || x > W || y < 0 || y > H) continue;
      const bv = r() < .5 ? .3 + r() * .4 : r() < .5 ? r() * .3 : .7 + r() * .7;
      stars.push({ x, y, m, cc: bvRGB(bv) });
    }
    stars.sort((a, b) => a.m - b.m);

    diffuse = DIFFUSE.map(([label, ra, dec, from, full, maj, min, pa]) => {
      const [x, y] = project(ra * 15, dec); const [x2, y2] = project(ra * 15 + 1, dec);
      const rot = Math.atan2(y2 - y, x2 - x) + pa * DEG;
      return { label, x, y, from, full, a: maj * S * 0.5, b: min * S * 0.5, rot };
    });

    buildMilkyWay(r);
    buildTown(r);
  }

  function buildMilkyWay(r) {
    mwCanvas = document.createElement('canvas');
    const q = 0.5;                                   // half resolution: the band is soft anyway
    mwCanvas.width = Math.ceil(W * q); mwCanvas.height = Math.ceil(H * q);
    const m = mwCanvas.getContext('2d');
    const sprite = document.createElement('canvas'); sprite.width = sprite.height = 64;
    const s = sprite.getContext('2d'); const gr = s.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, 'rgba(214,222,240,1)'); gr.addColorStop(1, 'rgba(214,222,240,0)'); s.fillStyle = gr; s.fillRect(0, 0, 64, 64);
    const brightAt = (l) => 0.5 + 0.5 * Math.cos((l - 75) * DEG) ** 2 + (l > 55 && l < 95 ? .35 : 0);
    for (let i = 0; i < 4200; i++) {
      const l = r() * 360, b = gauss(r) * (3.2 + 2.4 * r());
      let w = brightAt(l) * (0.5 + 0.5 * Math.sin(l * 0.35 + r() * 2) ** 2);
      if (l > 25 && l < 92 && Math.abs(b - 1.2) < 1.8) w *= 0.22;      // the Great Rift through Cygnus
      const [ra, dec] = galToEq(l * DEG, b * DEG);
      const [x, y] = project(ra, dec); if (x < -60 || x > W + 60 || y < -60 || y > H + 60) continue;
      const rad = (5 + r() * 16) * S / 7;
      m.globalAlpha = 0.05 * w; m.drawImage(sprite, (x - rad) * q, (y - rad) * q, rad * 2 * q, rad * 2 * q);
    }
    m.fillStyle = 'rgb(220,226,240)';
    for (let i = 0; i < 26000; i++) {                // unresolved star clouds
      const l = r() * 360, b = gauss(r) * 4.2;
      let w = brightAt(l); if (l > 25 && l < 92 && Math.abs(b - 1.2) < 1.6) w *= 0.25;
      const [ra, dec] = galToEq(l * DEG, b * DEG);
      const [x, y] = project(ra, dec); if (x < 0 || x > W || y < 0 || y > H) continue;
      m.globalAlpha = 0.16 * w * r(); m.fillRect(x * q, y * q, 1, 1);
    }
  }

  function buildTown(r) {
    // mountains either side of the fjord, lower in the middle
    ridge = []; const bump = (x, c, w) => Math.exp(-(((x - c) / w) ** 2));
    for (let i = 0; i <= 64; i++) {
      const xn = i / 64;
      const h = 0.62 * bump(xn, .06, .16) + 0.95 * bump(xn, .9, .16) + .3 * bump(xn, .55, .12) + .18 * bump(xn, .32, .07) + .04 * Math.sin(i * 1.7) ** 2;
      ridge.push([xn, h]);
    }
    // houses, a church spire, a few lit windows
    town = []; let x = -10;
    while (x < W + 20) {
      const w = 22 + r() * 46, h = 12 + r() * 30 + (r() < .1 ? 26 : 0), roof = r() < .6 ? 6 + r() * 10 : 0;
      const win = []; const nw = Math.floor(r() * 3);
      for (let j = 0; j < nw; j++) win.push([4 + r() * (w - 10), 4 + r() * Math.max(2, h - 12)]);
      town.push({ x, w, h, roof, win, spire: r() < .03 }); x += w + r() * 6;
    }
    const n = Math.max(4, Math.min(8, Math.round(W / 210)));
    lampsX = Array.from({ length: n }, (_, i) => (i + 0.5) / n + (r() - .5) * 0.02);
    if (intro) intro.on = new Array(n).fill(0);
  }

  /* ---------- draw ---------- */
  function draw() {
    const { b, zoom, shield, cct, dim, labels } = cur;
    const warmT = clamp((4000 - cct) / 1000);
    const nL = lampsX.length;
    const lampOn = intro ? intro.on : null;
    const onMean = lampOn ? lampOn.reduce((a, v) => a + v, 0) / nL : 1;

    // skyglow from the lamps: shielding, warmth and dimming each take some of it away (illustrative weights)
    const fixture = (1 - 0.42 * shield) * (1 - 0.16 * warmT) * (0.62 + 0.38 * dim);
    const g = tab(GLOW, b) * fixture * onMean;
    const bEff = bFromGlow(g), lim = tab(LIM, bEff), mw = tab(MW, bEff);
    const glowC = mixRGB(GLOW_COLD, GLOW_WARM, warmT);
    const G = H * (0.86 - 0.07 * zoom), kz = 1 + (W < 700 ? 0.2 : 0.45) * zoom;
    // the scale is a walk out of town: below class 6 the town falls behind you
    const tv = clamp((b - 1.5) / 4.5);

    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    // 1. night
    let gr = ctx.createLinearGradient(0, 0, 0, G);
    gr.addColorStop(0, '#04060B'); gr.addColorStop(1, '#0A0E18');
    ctx.fillStyle = gr; ctx.fillRect(0, 0, W, H);
    // airglow, faint and green, only at the darkest classes
    if (bEff < 2.6) { const a = (2.6 - bEff) / 1.6 * 0.09; gr = ctx.createLinearGradient(0, G - H * .3, 0, G); gr.addColorStop(0, 'rgba(70,110,80,0)'); gr.addColorStop(1, `rgba(70,110,80,${a})`); ctx.fillStyle = gr; ctx.fillRect(0, G - H * .3, W, H * .3); }

    // 2. Milky Way
    if (mw > 0.005) { ctx.globalAlpha = mw * 0.95; ctx.drawImage(mwCanvas, 0, 0, W, H); ctx.globalAlpha = 1; }

    // 3. diffuse objects
    for (const d of diffuse) {
      const v = clamp((lim - d.from) / (d.full - d.from)); if (v <= 0) continue;
      ctx.save(); ctx.translate(d.x, d.y); ctx.rotate(d.rot); ctx.scale(1, d.b / d.a);
      const rg = ctx.createRadialGradient(0, 0, 0, 0, 0, d.a * (0.6 + 0.4 * v));
      rg.addColorStop(0, `rgba(230,232,240,${0.55 * v})`); rg.addColorStop(.25, `rgba(220,224,236,${0.18 * v})`); rg.addColorStop(1, 'rgba(220,224,236,0)');
      ctx.fillStyle = rg; ctx.beginPath(); ctx.arc(0, 0, d.a, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    }

    // 4. constellation lines (faint, only between stars that are currently visible)
    const vis = (m) => clamp((lim - m) / 0.55);
    if (labels > 0.01) {
      ctx.lineWidth = 1;
      for (const [grp, segs] of Object.entries(LINES)) {
        for (const [a, c] of segs) {
          const A = named[a], C = named[c]; const v = Math.min(vis(A.m), vis(C.m)) * labels; if (v <= 0) continue;
          ctx.strokeStyle = `rgba(241,238,230,${(grp === 'umi' ? .2 : .11) * v})`;
          ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(C.x, C.y); ctx.stroke();
        }
      }
    }

    // 5. stars, brightest first; stop at the limiting magnitude
    const horizonFade = (y) => clamp((G - y) / (H * 0.14), 0.12, 1);
    for (const s of stars) {
      if (s.m > lim) break;
      const v = vis(s.m); if (v <= 0) continue;
      const depth = clamp((lim - s.m) / 3.2);
      const a = v * (0.32 + 0.68 * depth) * horizonFade(s.y);
      const rad = clamp(2.5 - 0.3 * s.m, 0.55, 2.9);
      ctx.fillStyle = rgba(s.cc, a);
      if (rad > 1.3) {
        ctx.beginPath(); ctx.arc(s.x, s.y, rad, 0, Math.PI * 2); ctx.fill();
        if (s.m < 1.4) { ctx.fillStyle = rgba(s.cc, a * .12); ctx.beginPath(); ctx.arc(s.x, s.y, rad * 3.2, 0, Math.PI * 2); ctx.fill(); }
      } else ctx.fillRect(s.x - rad, s.y - rad, rad * 2, rad * 2);
    }

    // 6. skyglow over everything above the horizon: brightest at the horizon, a dome over the town
    if (g > 0.002) {
      gr = ctx.createLinearGradient(0, 0, 0, G);
      gr.addColorStop(0, rgba(glowC, g * 0.42)); gr.addColorStop(.55, rgba(glowC, g * 0.62)); gr.addColorStop(1, rgba(glowC, Math.min(.92, g * 1.15)));
      ctx.fillStyle = gr; ctx.fillRect(0, 0, W, G);
      const rg = ctx.createRadialGradient(W * .42, G, 0, W * .42, G, Math.max(W, H) * .62);
      rg.addColorStop(0, rgba(glowC, g * .55)); rg.addColorStop(1, rgba(glowC, 0));
      ctx.fillStyle = rg; ctx.fillRect(0, 0, W, G);
    }

    // 7. labels (canvas text: the same facts are in the DOM)
    if (labels > 0.01 && W >= 700) {
      ctx.font = `600 ${W < 700 ? 10 : 11}px "Big Shoulders Display", sans-serif`;
      try { ctx.letterSpacing = '1.4px'; } catch (e) {}
      const lab = (txt, x, y, v, align = 'left') => { if (v <= 0.02 || x < 8 || x > W - 8 || y < 70 || y > G - 20) return; ctx.textAlign = align; ctx.fillStyle = `rgba(241,238,230,${0.62 * v * labels})`; ctx.fillText(txt, x, y); };
      const P = named.Polaris; lab('POLARIS', P.x + 9, P.y + 4, vis(P.m));
      const cen = (grp) => { const s = Object.values(named).filter((n) => n.grp === grp); return [s.reduce((a, n) => a + n.x, 0) / s.length, s.reduce((a, n) => a + n.y, 0) / s.length]; };
      const umiVis = CAT.filter((c) => c[5] === 'umi' && c[3] <= lim).length;
      const K = named.Kochab; lab(`LITTLE DIPPER · ${umiVis} OF 7`, K.x + 10, K.y + 18, 1);
      const D = named.Dubhe, M = named.Mizar; lab('BIG DIPPER', (D.x + M.x) / 2, (D.y + M.y) / 2 + 22, vis(2), 'center');
      const C = named.Navi; lab('CASSIOPEIA', C.x, C.y - 16, vis(2.5), 'center');
      for (const d of diffuse.slice(0, 2)) lab(d.label.toUpperCase(), d.x + d.a * .6 + 8, d.y + 4, clamp((lim - d.from) / 0.6));
      if (mw > .2) { const [ra, dec] = galToEq(118 * DEG, 0); const [x, y] = project(ra, dec); lab('MILKY WAY', x + 14, y, clamp((mw - .2) * 3)); }
    }

    // 8. mountains: snow on them catches the town's light (snowglow)
    const mtnTop = H * 0.15;
    const snow = mixRGB([12, 15, 22], glowC, clamp(g * 0.55));
    ctx.fillStyle = rgba(snow, 1);
    ctx.beginPath(); ctx.moveTo(0, G + 2);
    for (const [xn, h] of ridge) ctx.lineTo(xn * W, G - h * mtnTop);
    ctx.lineTo(W, G + 2); ctx.closePath(); ctx.fill();

    // 9. town
    const houseC = '#06080D';
    ctx.fillStyle = houseC;
    for (const t of town) {
      const top = G - t.h * (0.9 + 0.2 * zoom) * (0.25 + 0.75 * tv);
      ctx.fillRect(t.x, top, t.w, G - top + 1);
      if (t.roof) { ctx.beginPath(); ctx.moveTo(t.x - 2, top); ctx.lineTo(t.x + t.w / 2, top - t.roof); ctx.lineTo(t.x + t.w + 2, top); ctx.fill(); }
      if (t.spire) { ctx.beginPath(); ctx.moveTo(t.x + t.w * .4, top); ctx.lineTo(t.x + t.w * .5, top - 46); ctx.lineTo(t.x + t.w * .6, top); ctx.fill(); }
    }
    ctx.fillStyle = `rgba(255,190,120,${(.55 * tv).toFixed(3)})`;
    for (const t of town) { const top = G - t.h * (0.9 + 0.2 * zoom) * (0.25 + 0.75 * tv); if (tv < .05) break; for (const [wx, wy] of t.win) if (top + wy + 4 < G) ctx.fillRect(t.x + wx, top + wy, 3, 4); }

    // 10. street
    ctx.fillStyle = '#07090F'; ctx.fillRect(0, G, W, H - G);
    ctx.fillStyle = 'rgba(241,238,230,.06)'; ctx.fillRect(0, G + (H - G) * .62, W, 1);

    // 11. lamps (motif: the cutoff line)
    const lampC = mixRGB(LAMP_COLD, LAMP_WARM, warmT);
    const base = G + (H - G) * 0.58, ph = Math.min(H * 0.17, 150) * kz;
    if (tv > 0.01) for (let i = 0; i < nL; i++) {
      ctx.globalAlpha = tv;
      const on = (lampOn ? lampOn[i] : 1) * (0.4 + 0.6 * dim);
      const x = lampsX[i] * W, hx = x + 16 * kz, hy = base - ph;
      // pool of light on the street, always below the line
      if (on > 0) {
        const pool = ctx.createRadialGradient(hx, base, 0, hx, base, 90 * kz);
        pool.addColorStop(0, rgba(lampC, .34 * on)); pool.addColorStop(1, rgba(lampC, 0));
        ctx.fillStyle = pool; ctx.save(); ctx.translate(hx, base); ctx.scale(1, .28); ctx.beginPath(); ctx.arc(0, 0, 90 * kz, 0, Math.PI * 2); ctx.restore(); ctx.fill();
        // shielded: a cone straight down
        if (shield > 0.01) {
          const cone = ctx.createLinearGradient(0, hy, 0, base);
          cone.addColorStop(0, rgba(lampC, .2 * on * shield)); cone.addColorStop(1, rgba(lampC, .03 * on * shield));
          ctx.fillStyle = cone; ctx.beginPath(); ctx.moveTo(hx - 7 * kz, hy + 2); ctx.lineTo(hx + 7 * kz, hy + 2); ctx.lineTo(hx + 58 * kz, base); ctx.lineTo(hx - 58 * kz, base); ctx.closePath(); ctx.fill();
        }
        // halo: a small glow under the lamp always; the big all-round glow only while unshielded
        const low = ctx.createRadialGradient(hx, hy + 6 * kz, 0, hx, hy + 6 * kz, 30 * kz);
        low.addColorStop(0, rgba(lampC, .5 * on)); low.addColorStop(1, rgba(lampC, 0));
        ctx.fillStyle = low; ctx.fillRect(hx - 30 * kz, hy - 24 * kz, 60 * kz, 60 * kz);
        const halo = ctx.createRadialGradient(hx, hy, 0, hx, hy, 64 * kz);
        halo.addColorStop(0, rgba(lampC, .5 * on)); halo.addColorStop(.25, rgba(lampC, .15 * on)); halo.addColorStop(1, rgba(lampC, 0));
        ctx.fillStyle = halo;
        const up = 1 - shield;
        if (up > 0.01) {
          ctx.save(); ctx.globalAlpha = up * tv; ctx.fillRect(hx - 70 * kz, hy - 70 * kz, 140 * kz, 140 * kz); ctx.restore();
          // the wasted light: a faint column going straight up
          const col = ctx.createLinearGradient(0, hy, 0, hy - H * .42);
          col.addColorStop(0, rgba(lampC, .1 * on * up)); col.addColorStop(1, rgba(lampC, 0));
          ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(hx - 8 * kz, hy); ctx.lineTo(hx + 8 * kz, hy); ctx.lineTo(hx + 34 * kz, hy - H * .42); ctx.lineTo(hx - 34 * kz, hy - H * .42); ctx.closePath(); ctx.fill();
        }
      }
      // post and arm
      ctx.fillStyle = '#151924';
      ctx.fillRect(x - 1.5 * kz, hy, 3 * kz, base - hy);
      ctx.fillRect(x - 1.5 * kz, hy - 1.5 * kz, 18 * kz, 3 * kz);
      // the lamp: a globe, or a globe under a hood
      ctx.fillStyle = rgba(on > 0 ? lampC : [60, 66, 80], on > 0 ? .95 : 1);
      ctx.beginPath(); ctx.arc(hx, hy + 5 * kz, 5 * kz, 0, Math.PI * 2); ctx.fill();
      if (shield > 0.01) {
        ctx.fillStyle = `rgba(30,34,46,${shield})`;
        ctx.beginPath(); ctx.moveTo(hx - 15 * kz, hy + 4 * kz); ctx.quadraticCurveTo(hx, hy - 10 * kz, hx + 15 * kz, hy + 4 * kz); ctx.closePath(); ctx.fill();
        ctx.fillStyle = `rgba(241,238,230,${.25 * shield})`; ctx.fillRect(hx - 15 * kz, hy + 4 * kz, 30 * kz, 1);   // the cutoff line itself
      }
    }

    ctx.globalAlpha = 1;
    onState({ bEff, lim, mw, hudMode, umi: CAT.filter((c) => c[5] === 'umi' && c[3] <= lim).length, booting: !!intro, lampsOn: lampOn ? lampOn.filter((v) => v > .5).length : nL, lamps: nL, ...cur });
  }

  /* ---------- loop: runs only while something is changing ---------- */
  function frame(now) {
    raf = 0;
    const dt = Math.min(64, now - last); last = now;
    let moving = false;
    if (intro) {
      const t = now - intro.t0, n = intro.on.length;
      for (let i = 0; i < n; i++) intro.on[i] = clamp((t - 520 - i * 190) / 140);
      if (t > 520 + n * 190 + 380) intro = null; moving = true;
    }
    const f = reduced ? 1 : 1 - Math.pow(1 - 0.09, dt / 16.7);
    for (const k of keys) {
      const d = tgt[k] - cur[k];
      if (Math.abs(d) > (k === 'cct' ? 0.5 : 0.0015)) { cur[k] += d * f; moving = true; } else cur[k] = tgt[k];
    }
    if (!paused) draw();
    if (moving && !paused) raf = requestAnimationFrame(frame);
  }
  const kick = () => { if (!raf && !paused) { last = performance.now(); raf = requestAnimationFrame(frame); } };

  /* ---------- scroll → target state ---------- */
  let anchors = [];
  function measure() {
    const prev = {};
    anchors = [...document.querySelectorAll('[data-sky]')].map((el) => {
      const st = { ...prev };
      el.dataset.sky.split(';').forEach((kv) => { const [k, v] = kv.split(':').map((s) => s.trim()); if (k) st[k] = k === 'hud' ? v : +v; });
      Object.assign(prev, st);
      const r = el.getBoundingClientRect();
      return { y: r.top + scrollY + Math.min(r.height, innerHeight) / 2, st: { zoom: 0, shield: 0, cct: 4000, dim: 1, ...st } };
    });
  }
  const covers = [...document.querySelectorAll('[data-opaque]')];
  function onScroll() {
    // pause while an opaque section covers the screen
    const wasPaused = paused;
    paused = document.hidden || covers.some((el) => { const r = el.getBoundingClientRect(); return r.top <= 0 && r.bottom >= innerHeight; });
    if (!anchors.length) return;
    const probe = scrollY + innerHeight * 0.5;
    let A = anchors[0], B = anchors[0], t = 0;
    if (probe >= anchors[anchors.length - 1].y) A = B = anchors[anchors.length - 1];
    else for (let i = 0; i < anchors.length - 1; i++) if (probe >= anchors[i].y && probe < anchors[i + 1].y) { A = anchors[i]; B = anchors[i + 1]; t = (probe - A.y) / (B.y - A.y); break; }
    let e = clamp((t - 0.18) / 0.64); e = e * e * (3 - 2 * e);
    if (reduced) e = t < 0.5 ? 0 : 1;                        // discrete states instead of a scrub
    for (const k of ['b', 'zoom', 'shield', 'cct', 'dim']) tgt[k] = mix(A.st[k], B.st[k], e);
    hudMode = (t < 0.5 ? A : B).st.hud || 'none';
    tgt.labels = hudMode === 'scale' ? mix(A.st.labels ?? 1, B.st.labels ?? 1, e) : 0;
    if (paused && !wasPaused) onState({ covered: true });
    if (wasPaused && !paused) { if (reduced) Object.assign(cur, tgt); draw(); }
    kick();
  }

  let lastW = 0, lastH = 0;
  function resize(force) {
    if (!force && innerWidth === lastW && Math.abs(innerHeight - lastH) < 120) return;   // ignore mobile URL-bar jitter
    lastW = innerWidth; lastH = innerHeight;
    build(); measure(); onScroll(); draw();
  }

  resize(true);
  if (reduced) { Object.assign(cur, tgt); }
  draw(); kick();
  addEventListener('scroll', onScroll, { passive: true });
  let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => resize(false), 150); });
  document.addEventListener('visibilitychange', onScroll);
  // re-measure when fonts and late layout settle
  document.fonts?.ready.then(() => { measure(); onScroll(); draw(); });
  new ResizeObserver(() => { measure(); onScroll(); }).observe(document.body);

  return { names: NAMES, mwText: MWTXT, skyInstant };
}
