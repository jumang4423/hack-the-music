// 16 length random string
const emojiArr = [
  "🐶",
  "🐱",
  "🐭",
  "🐹",
  "🐰",
  "🦊",
  "🍎",
  "🍐",
  "🍊",
  "🍋",
  "❄️",
  "🌈",
  "🌞",
  "🌝",
  "🌚",
  "🌜",
];

export const RandomId: () => string = () => {
  const ID = Math.random().toString(36).substring(2, 18);
  // add random emojis to random place
  const emoji = emojiArr[Math.floor(Math.random() * emojiArr.length)];
  const randomIndex = Math.floor(Math.random() * ID.length);
  const newID =
    ID.substring(0, randomIndex) + emoji + ID.substring(randomIndex);
  return newID;
};

export const RandomFiveLengthBinary = () =>
  Math.random().toString(2).slice(2, 7);
