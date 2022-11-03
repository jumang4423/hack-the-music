import ErrStr from "../../../domain/ErrStr.domain";
import { Sample } from "../../../generated/graphql";

export interface SampleRepository {
  getRandomSample(): Promise<[Sample | null, ErrStr]>;
  uploadSample(sample: Sample): Promise<[Sample | null, ErrStr]>;
}
