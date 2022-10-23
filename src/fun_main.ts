export type Theme = {
  themeIndex: number | null;
  name: string;
  description: string | null;
};
export const ThemeBankMock: Array<Theme> = [
  {
    themeIndex: 0,
    name: "bgm can devided by 3",
    description: "ex: 60, 90, 120, 150",
  },
  {
    themeIndex: 1,
    name: "use huge big snare",
    description: null,
  },
  {
    themeIndex: 2,
    name: "genre is jersey club",
    description:
      "jersey club is a genre of music that originated in the 2010s in New Jersey, United State",
  },
  {
    themeIndex: 3,
    name: "genre is footwork",
    description:
      "footwork is a genre of music that originated in the 2010s in Chicago, United State",
  },
  {
    themeIndex: 4,
    name: "put low pass filter with frequency 500hz on master channel",
    description: null,
  },
  {
    themeIndex: 5,
    name: "put phaser with feedback 30% on master channel",
    description: null,
  },
  {
    themeIndex: 6,
    name: "coolest edm track",
    description: "ever you heard",
  },
  {
    themeIndex: 7,
    name: "drums only 808",
    description: null,
  },
  {
    themeIndex: 8,
    name: "include acid bass line",
    description: "acid bass is generally synthesized by tb-303",
  },
  {
    themeIndex: 9,
    name: "use toho soundfont",
    description: "toho is a japanese oldschool game",
  },
  {
    themeIndex: 10,
    name: "reverse entire track",
    description: "make track then reverse it",
  },
];
