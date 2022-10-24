export type Theme = {
  themeIndex: number | null;
  content: string;
  description: string | null;
};
export const ThemeBankMock: Array<Theme> = [
  {
    themeIndex: 0,
    content: "bgm can devided by 3",
    description: "ex: 60, 90, 120, 150",
  },
  {
    themeIndex: 1,
    content: "use huge big snare",
    description: null,
  },
  {
    themeIndex: 2,
    content: "genre is jersey club",
    description:
      "jersey club is a genre of music that originated in the 2010s in New Jersey, United State",
  },
  {
    themeIndex: 3,
    content: "genre is footwork",
    description:
      "footwork is a genre of music that originated in the 2010s in Chicago, United State",
  },
  {
    themeIndex: 4,
    content: "put low pass filter with frequency 500hz on master channel",
    description: null,
  },
  {
    themeIndex: 5,
    content: "put phaser with feedback 30% on master channel",
    description: null,
  },
  {
    themeIndex: 6,
    content: "coolest edm track",
    description: "ever you heard",
  },
  {
    themeIndex: 7,
    content: "drums only 808",
    description: null,
  },
  {
    themeIndex: 8,
    content: "include acid bass line",
    description: "acid bass is generally synthesized by tb-303",
  },
  {
    themeIndex: 9,
    content: "use toho soundfont",
    description: "toho is a japanese oldschool game",
  },
  {
    themeIndex: 10,
    content: "reverse entire track",
    description: "make track then reverse it",
  },
];
