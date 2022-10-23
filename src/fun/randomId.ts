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
  return ID.substring(0, 8) + emoji + ID.substring(8, 16);
};
