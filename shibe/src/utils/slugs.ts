const adjective1 = [
  "stinky",
  "legitimate",
  "brave",
  "random",
  "stupid",
  "polluted",
  "brain_washed",
  "cheerful",
  "warm",
  "hair_rasing",
  "cool",
];
const adjective2 = [
  "smelly",
  "disrespectful",
  "honorable",
  "awesome",
  "flaccid",
  "wasted",
  "smartass",
];
const noun = [
  "salmon",
  "keyboard",
  "sunshine",
  "drumstick",
  "man",
  "shepherd",
  "bot",
  "life",
  "school",
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
  "CaptainAmerica",
  "Thor",
  "franchise",
  "city",
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
