const adjective1 = [
  "stinky",
  "legitimate",
  "brave",
  "random",
  "stupid",
  "polluted",
  "brainwashed",
  "brainwashing",
  "cheerful",
  "warm",
  "hair_rasing",
  "cool",
  "fantastic",
  "legit",
  "interactive",
  "legendary",
  "strong",
];
const adjective2 = [
  "smelly",
  "disrespectful",
  "honorable",
  "awesome",
  "flaccid",
  "wasted",
  "smartass",
  "deep_fried",
  "amazing",
  "not_so_pleasant",
];
const noun = [
  "salmon",
  "keyboard",
  "sunshine",
  "drumstick",
  "introvert",
  "entrepreneur",
  "man",
  "shepherd",
  "socks",
  "facebook",
  "CEO",
  "guy",
  "cake",
  "dude",
  "burrito",
  "paella",
  "pizza",
  "dumplings",
  "pepsi",
  "meme",
  "sushi",
  "book",
  "mathematician",
  "linguist",
  "whisper",
  "iPhone",
  "iPad",
  "PC",
  "franchise",
  "NonSense",
  "city",
  "IronMan",
  "WarMachine",
  "CaptainAmerica",
  "Thor",
  "StarLord",
  "Groot",
  "SpiderMan",
  "Falcon",
  "ScarletWitch",
  "Thanos",
  "DrStrange",
  "WinterSoldier",
  "Hawkeye",
];

const words = { adjective1, adjective2, noun } as any;
const order = ["adjective1", "adjective2", "noun"];

export const randSlug = () => {
  const selected = order.map((partOfSpeech) => {
    const choices = words[partOfSpeech];
    return choices[Math.floor(Math.random() * choices.length)];
  });

  return selected.join("-");
};
