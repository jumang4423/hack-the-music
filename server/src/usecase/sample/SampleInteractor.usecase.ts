import { SampleRepository } from "./interface/repository.usecase";
import ErrStr from "../../domain/ErrStr.domain";
import { ErrsEnumeration } from "../../util/err.util";
import { Sample } from "../../generated/graphql";
import { Maybe } from "graphql/jsutils/Maybe";

export class SampleInteractor {
  private readonly sampleRepository: SampleRepository;
  private response: any;
  private err: ErrStr;

  constructor(sampleRepository: SampleRepository) {
    this.sampleRepository = sampleRepository;
    this.err = new ErrStr({});
  }

  handleUploadSample = async (args: {
    url: string;
    description: Maybe<string>;
    idUploadedBy: string;
  }) => {
    const { url, description, idUploadedBy } = args;
    // validate
    if (url === undefined || idUploadedBy === undefined) {
      this.err.ToError(ErrsEnumeration.ARGS_NOT_VALID);
      return void 0;
    }
    const [sample, err] = await this.sampleRepository.uploadSample({
      url,
      description,
      idUploadedBy,
    } as Sample);
    this.response = sample;
    this.err = err;
  };

  handleGetRandomSample = async () => {
    const [sample, err] = await this.sampleRepository.getRandomSample();
    this.response = sample;
    this.err = err;
  };

  getResponseUploadSample = (): Sample => {
    if (this.err.IsError()) {
      throw new Error(this.err.GetError());
    }
    return this.response!;
  };

  getResponseGetRandomSample = (): Sample => {
    if (this.err.IsError()) {
      throw new Error(this.err.GetError());
    }
    return this.response!;
  };
}
