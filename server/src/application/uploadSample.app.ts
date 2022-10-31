import { Sample } from "../generated/graphql";
import { GetCollLenDriver } from "../drivers/getCollLen.drivers";
import { InsertSampleDriver } from "../drivers/insertSample.drivers";
import ErrStr from "../domain/ErrStr.domain";

export const UploadSampleApp = async (
  sample: Sample
): Promise<[Sample | null, ErrStr]> => {
  const [sampleGlobalLenCached, err] = await GetCollLenDriver("samples");
  if (err.IsError()) {
    return [null, err];
  }
  const [_, err2] = await InsertSampleDriver(sample, sampleGlobalLenCached);
  if (err2.IsError()) {
    return [null, err];
  }
  return [sample, new ErrStr({ isErr: false })];
};
