const U = "https://images.unsplash.com/photo-";
const PARAMS = "?auto=format&fit=crop&q=80&w=2400";
const PARAMS_SQ = "?auto=format&fit=crop&q=80&w=1600";

export const IMG = {
  hero:        `${U}1519501025264-65ba15a82390${PARAMS}`,
  nyMetro:     `${U}1496442226666-8d4d0e62e6e9${PARAMS}`,
  retail:      `${U}1567721913486-6585f069b332${PARAMS}`,
  luxury:      `${U}1604176354204-9268737828e4${PARAMS}`,
  dining:      `${U}1517248135467-4c7edcad34c4${PARAMS}`,
  events:      `${U}1470229722913-7c0e2dbbafd3${PARAMS}`,
  eventsHero:  `${U}1492684223066-81342ee5ff30${PARAMS}`,
  close:       `${U}1499092346589-b9b6be3e94b2${PARAMS}`,

  dreamworks:  `${U}1530549387789-4c1017266635${PARAMS_SQ}`,
  nickelodeon: `${U}1568952433726-3896e3881c65${PARAMS_SQ}`,
  bigSnow:     `${U}1483921020237-2ff51e8e4b22${PARAMS_SQ}`,
  seaLife:     `${U}1583212292454-1fe6229603b7${PARAMS_SQ}`,

  diningHall:    `${U}1414235077428-338989a2e8c0${PARAMS_SQ}`,
  diningKorean:  `${U}1498654896293-37aacf113fd9${PARAMS_SQ}`,
  diningKosher:  `${U}1546554137-f86b9593a222${PARAMS_SQ}`,
  diningItalian: `${U}1551183053-bf91a1d81141${PARAMS_SQ}`,
  diningCafe:    `${U}1554118811-1e0d58224f24${PARAMS_SQ}`,
  diningBurger:  `${U}1568901346375-23c9450c58cd${PARAMS_SQ}`,
  diningToast:   `${U}1517433367423-c7e5b0f35086${PARAMS_SQ}`,

  evFashion:     `${U}1490481651871-ab68de25d43d${PARAMS_SQ}`,
  evHoliday:     `${U}1574391884720-bbc3740c59d1${PARAMS_SQ}`,
  evSneaker:     `${U}1551107696-a4b0c5a0d9a2${PARAMS_SQ}`,
  evAuto:        `${U}1492144534655-ae79c964c9d7${PARAMS_SQ}`,
  evConcert:     `${U}1501281668745-f7f57925c3b4${PARAMS_SQ}`,
  evCelebrity:   `${U}1503095396549-807759245b35${PARAMS_SQ}`,
} as const;

const PEX = "https://videos.pexels.com/video-files/";

export const VID = {
  hero:        `${PEX}3015527/3015527-hd_1920_1080_24fps.mp4`,
  luxury:      `${PEX}856134/856134-hd_1920_1080_30fps.mp4`,
  events:      `${PEX}1192116/1192116-hd_1920_1080_30fps.mp4`,
  eventsHero:  `${PEX}855414/855414-hd_1920_1080_25fps.mp4`,
  close:       `${PEX}854279/854279-hd_1920_1080_30fps.mp4`,
} as const;

export type ImageKey = keyof typeof IMG;
export type VideoKey = keyof typeof VID;
