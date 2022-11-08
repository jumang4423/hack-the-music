import { useState } from "react";
import { ChaosGameSettingsType } from "../../../models/chaosGameType";
import { FormControlLabel } from "@mui/material";
import { Checkbox } from "@mui/material";
import {
  RandomSamplesEnableCheckboxHandleChange,
  RandomSampleDataHandle,
} from "./fun_RandomSample";
import HackyButton from "../../../components/HackyButton";
import SampleInputBox from "./SampleInputBox";
import { useMutation } from "@apollo/client";
import { GET_RANDOM_SAMPLE } from "../../../fun/apis";
import GenericModal from "../../../components/GenericModal";
import SampleUploaderModal from "./SampleUploaderModal";
import { IsMeAdminRn } from "../../../fun/isMeAdminRn";
import { Group } from "../../../gql/graphql";

type Props = {
  group: Group;
  gameSettings: ChaosGameSettingsType;
  setGameSettings: (gameSettings: ChaosGameSettingsType) => void;
};

const RandomSample = ({ group, gameSettings, setGameSettings }: Props) => {
  const [GetSample, { loading }] = useMutation(GET_RANDOM_SAMPLE, {
    onCompleted({ randomSample }) {
      RandomSampleDataHandle(randomSample, gameSettings, setGameSettings);
    },
  });
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const viewState = {
    isMeAdminRn: IsMeAdminRn(group),
  };

  return (
    <div
      style={{
        overflowY: "scroll",
        height: "70vh",
        marginTop: "-32px",
      }}
    >
      <h3
        style={{
          marginBottom: "16px",
        }}
      >
        🍴 Random Sample
      </h3>

      <FormControlLabel
        style={{
          marginTop: "-10px",
        }}
        control={
          <Checkbox
            checked={gameSettings.randomSamples.enabled}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              RandomSamplesEnableCheckboxHandleChange(
                event,
                gameSettings,
                setGameSettings
              );
            }}
          />
        }
        label="enabled"
        disabled={!viewState.isMeAdminRn}
      />

      <div hidden={!gameSettings.randomSamples.enabled}>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            marginTop: "-10px",
            marginBottom: "20px",
          }}
        >
          {gameSettings.randomSamples.samples.map((sample, index: number) => {
            return (
              <div key={sample.url + index}>
                <SampleInputBox
                  IsMeAdminRn={viewState.isMeAdminRn}
                  index={index}
                  gameSettings={gameSettings}
                  setGameSettings={setGameSettings}
                />
              </div>
            );
          })}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div
            style={{
              margin: "0px 4px 4px 0px",
            }}
            hidden={
              gameSettings.randomSamples.samples.length >= 15 ||
              !viewState.isMeAdminRn
            }
          >
            <HackyButton
              name={"＋"}
              onClick={() => {
                setOpen(true);
              }}
            />
          </div>
          <div
            style={{
              margin: "4px 8px 8px 8px",
            }}
            hidden={
              gameSettings.randomSamples.samples.length >= 15 ||
              !viewState.isMeAdminRn
            }
          >
            <HackyButton
              prefer={true}
              isDisabled={loading}
              name={loading ? "loading..." : "🌏 random sample"}
              onClick={() => {
                GetSample();
              }}
            />
          </div>
        </div>

        <GenericModal
          open={open}
          title={"🚢 upload sample file"}
          handleClose={handleClose}
        >
          <div>
            <SampleUploaderModal
              gameSettings={gameSettings}
              setGameSettings={setGameSettings}
              onClose={handleClose}
            />
          </div>
        </GenericModal>
      </div>
    </div>
  );
};

export default RandomSample;
