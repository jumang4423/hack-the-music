import { ThemeRepository } from "./interface/repository.usecase";
import ErrStr from "../../domain/ErrStr.domain";
import { ErrsEnumeration } from "../../util/err.util";
import { Theme, AdditionalTheme } from "../../generated/graphql";
import { Maybe } from "graphql/jsutils/Maybe";

export class ThemeInteractor {
  private readonly themeRepository: ThemeRepository;
  private response: any;
  private err: ErrStr;

  constructor(themeRepository: ThemeRepository) {
    this.themeRepository = themeRepository;
    this.err = new ErrStr({});
  }

  handleUploadTheme = async (args: {
    content: string;
    description: Maybe<string>;
    idUploadedBy: string;
  }) => {
    const { content, description, idUploadedBy } = args;
    // validate
    if (content === undefined || idUploadedBy === undefined) {
      this.err.ToError(ErrsEnumeration.ARGS_NOT_VALID);
      return void 0;
    }
    const [theme, err] = await this.themeRepository.uploadTheme({
      content,
      description,
      idUploadedBy,
    } as Theme);
    this.response = theme;
    this.err = err;
  };

  handleGetRandomTheme = async () => {
    const [theme, err] = await this.themeRepository.getRandomTheme();
    this.response = theme;
    this.err = err;
  };

  handleGetRandomAdditionalTheme = async (args: {
    toUserId: string;
    toName: string;
  }) => {
    const { toUserId, toName } = args;
    const [theme, err] = await this.themeRepository.getRandomAdditionalTheme(
      toUserId,
      toName
    );
    this.response = theme;
    this.err = err;
  };

  getResponseUploadTheme = (): Theme => {
    if (this.err.IsError()) {
      throw new Error(this.err.GetError());
    }
    return this.response!;
  };

  getResponseGetRandomTheme = (): Theme => {
    if (this.err.IsError()) {
      throw new Error(this.err.GetError());
    }
    return this.response!;
  };

  getResponseGetRandomAdditionalTheme = (): AdditionalTheme => {
    if (this.err.IsError()) {
      throw new Error(this.err.GetError());
    }
    return this.response!;
  };
}
