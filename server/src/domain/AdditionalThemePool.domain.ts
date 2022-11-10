import { AdditionalTheme } from "../generated/graphql";

const additionalThemePooArr: Array<string> = [
  "-30bpm to your current working track tempo",
  "replace all kicks you put with 808s kick",
  "reverse your track when you upload your track",
  "replace all your snares with claps",
  "replace all your claps with snares",
  "work on the project with lowpass filter at 1khz on master channel",
  "twice faster than your current tempo",
  "twice slower than your current tempo",
];

export class AdditionalThemePool {
  private userId: string;
  private name: string;
  constructor(userId: string, name: string) {
    this.userId = userId;
    this.name = name;
  }
  public async getAdditionalTheme(): Promise<AdditionalTheme> {
    const randomIndex = Math.floor(
      Math.random() * additionalThemePooArr.length
    );
    return {
      toUserId: this.userId,
      content: additionalThemePooArr[randomIndex]!,
      toName: this.name,
    } as AdditionalTheme;
  }
}
