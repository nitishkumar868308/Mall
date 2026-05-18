// Curated Unsplash photo IDs themed for each chapter / attraction.
// Real assets are hot-linkable from images.unsplash.com — `next.config.ts` whitelists the domain.
// When official American Dream press-kit footage is added, swap these `poster` URLs for local files
// in `public/images/` and point `src` at the local `public/videos/*.mp4`.

const U = "https://images.unsplash.com/photo-";
const PARAMS = "?auto=format&fit=crop&q=80&w=2400";
const PARAMS_SQ = "?auto=format&fit=crop&q=80&w=1600";

export const IMG = {
  // Hero — grand interior architecture, scale and ambition
  hero:        `${U}1519501025264-65ba15a82390${PARAMS}`,
  // Why Here — NYC night skyline, the metro at scale
  nyMetro:     `${U}1496442226666-8d4d0e62e6e9${PARAMS}`,
  // Retail — luxury shopping atrium
  retail:      `${U}1567721913486-6585f069b332${PARAMS}`,
  // Luxury — gilded marble, fashion house interior
  luxury:      `${U}1604176354204-9268737828e4${PARAMS}`,
  // Dining — warm food hall ambience
  dining:      `${U}1517248135467-4c7edcad34c4${PARAMS}`,
  // Events platform — cinematic concert stage
  events:      `${U}1470229722913-7c0e2dbbafd3${PARAMS}`,
  // Events page hero — packed crowd, energy
  eventsHero:  `${U}1492684223066-81342ee5ff30${PARAMS}`,
  // Close — cinematic city/architecture closer
  close:       `${U}1499092346589-b9b6be3e94b2${PARAMS}`,

  // Attractions
  dreamworks:  `${U}1530549387789-4c1017266635${PARAMS_SQ}`,
  nickelodeon: `${U}1568952433726-3896e3881c65${PARAMS_SQ}`,
  bigSnow:     `${U}1483921020237-2ff51e8e4b22${PARAMS_SQ}`,
  seaLife:     `${U}1583212292454-1fe6229603b7${PARAMS_SQ}`,

  // Dining tiles
  diningHall:    `${U}1414235077428-338989a2e8c0${PARAMS_SQ}`,
  diningKorean:  `${U}1498654896293-37aacf113fd9${PARAMS_SQ}`,
  diningKosher:  `${U}1546554137-f86b9593a222${PARAMS_SQ}`,
  diningItalian: `${U}1551183053-bf91a1d81141${PARAMS_SQ}`,
  diningCafe:    `${U}1554118811-1e0d58224f24${PARAMS_SQ}`,
  diningBurger:  `${U}1568901346375-23c9450c58cd${PARAMS_SQ}`,
  diningToast:   `${U}1517433367423-c7e5b0f35086${PARAMS_SQ}`,

  // Events highlight cards
  evFashion:     `${U}1490481651871-ab68de25d43d${PARAMS_SQ}`,
  evHoliday:     `${U}1574391884720-bbc3740c59d1${PARAMS_SQ}`,
  evSneaker:     `${U}1551107696-a4b0c5a0d9a2${PARAMS_SQ}`,
  evAuto:        `${U}1492144534655-ae79c964c9d7${PARAMS_SQ}`,
  evConcert:     `${U}1501281668745-f7f57925c3b4${PARAMS_SQ}`,
  evCelebrity:   `${U}1503095396549-807759245b35${PARAMS_SQ}`,
} as const;

export type ImageKey = keyof typeof IMG;
