import { Sample } from "../generated/graphql";
import ErrStr from "../domain/ErrStr.domain";
import { GetCollLenDriver } from "../drivers/getCollLen.drivers";
import { GetRandomSampleDriver } from "../drivers/getRandomSample.drivers";

export const RandomSampleApp = async (): Promise<[Sample | null, ErrStr]> => {
  const [sampleGlobalLenCached, err] = await GetCollLenDriver("samples");
  if (err.IsError()) {
    return [null, err];
  }
  const [randomSample, err2] = await GetRandomSampleDriver(
    sampleGlobalLenCached
  );
  if (err2.IsError()) {
    return [null, err2];
  }

  return [randomSample, new ErrStr({ isErr: false })];
};
