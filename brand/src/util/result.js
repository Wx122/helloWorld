const url = 'https://ssl-public.langlib.com/activity/brand';


const A = [
  {
    enUrl:url + "/answer/lion_E.png",
    cnUrl:url + "/answer/lion_C.png",
    rsEnUrl: url + "/share/lion_E.png",
    rsCnUrl: url + "/share/lion_C.png"
  },
  {
    enUrl: url + "/answer/monkey_E.png",
    cnUrl: url + "/answer/monkey_C.png",
    rsEnUrl: url + "/share/monkey_E.png",
    rsCnUrl: url + "/share/monkey_C.png"
  }
];
const B = [
  {
    enUrl: url + "/answer/persiancat_E.png",
    cnUrl: url + "/answer/persiancat_C.png",
    rsEnUrl: url + "/share/persiancat_E.png",
    rsCnUrl: url + "/share/persiancat_C.png"
  },
  {
    enUrl: url + "/answer/huntaway_E.png",
    cnUrl: url + "/answer/huntaway_C.png",
    rsEnUrl: url + "/share/huntaway_E.png",
    rsCnUrl: url + "/share/huntaway_C.png"
  }
];
const C = [
  {
    enUrl: url + "/answer/panda_E.png",
    cnUrl: url + "/answer/panda_C.png",
    rsEnUrl: url + "/share/panda_E.png",
    rsCnUrl: url + "/share/panda_C.png"
  },
  {
    enUrl: url + "/answer/spot_E.png",
    cnUrl: url + "/answer/spot_C.png",
    rsEnUrl: url + "/share/spot_E.png",
    rsCnUrl: url + "/share/spot_C.png"
  }
];
const D = [
  {
    enUrl: url + "/answer/Elephant_E.png",
    cnUrl: url + "/answer/Elephant_C.png",
    rsEnUrl: url + "/share/Elephant_E.png",
    rsCnUrl: url + "/share/Elephant_C.png"
  },
  {
    enUrl: url + "/answer/African_E.png",
    cnUrl: url + "/answer/African_C.png",
    rsEnUrl: url + "/share/African_E.png",
    rsCnUrl: url + "/share/African_C.png"
  }
];


const result = {
  A: A,
  B: B,
  C: C,
  D: D,

  AB : [...A,...B],
  BC : [...B,...C],
  CD : [...C,...D],
  AC : [...A,...C],
  AD : [...A,...D],
  BD : [...B,...D],

  ABC : [...A,...B,...C],
  BCD : [...B,...C,...D],
  ABD : [...A,...B,...D],
  ACD : [...A,...C,...D]
};

export default result

