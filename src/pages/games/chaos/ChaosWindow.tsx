import { ChaosGameSettingsType } from "../../../models/chaosGameType";
import { Group } from "../../../gql/graphql";
import { Tabs } from "@mui/material";
import { Tab } from "@mui/material";
import { Box } from "@mui/material";
import { useState } from "react";
import RandomTheme from "./RandomTheme";
import RandomSample from "./RandomSample";
import RandomImage from "./RandomImage";
import RandomGenre from "./RandomGenre";
import { TabPanel } from "../../../components/TabPanel";

type Props = {
  group: Group;
  setGroup: (group: Group) => void;
  gameSettings: ChaosGameSettingsType;
  setGameSettings: (gameSettings: ChaosGameSettingsType) => void;
};

const ChaosWindow = ({
  group,
  setGroup,
  gameSettings,
  setGameSettings,
}: Props) => {
  const [themeViewing, setThemeViewing] = useState(0);

  function a11yProps(index: number) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
      sx: {
        backgroundColor: themeViewing == index ? "#eeeeee" : "#ffffff",
        border: "none",
      },
    };
  }

  const viewState = {
    meSelected: (meIndex: number) => {
      switch (meIndex) {
        case 0:
          return gameSettings.randomGenres.enabled;
        case 1:
          return gameSettings.randomSamples.enabled;
        case 2:
          return gameSettings.randomTheme.enabled;
        case 3:
          return gameSettings.randomImages.enabled;
        case 4:
          return gameSettings.lifeSoundSampling.enabled;
        case 5:
          return gameSettings.randomVideos.enabled;
        default:
          return false;
      }
    },
  };

  return (
    <div style={{}}>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.white",
          display: "flex",
          height: "75vh",
          borderRadius: 10,
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={themeViewing}
          onChange={(event, newValue) => setThemeViewing(newValue)}
          aria-label="chaosWindow"
          sx={{
            borderRight: 2,
            borderColor: "divider",
          }}
        >
          <Tab
            label={`${viewState.meSelected(0) ? "✔︎ " : ""}genres`}
            {...a11yProps(0)}
          />
          <Tab
            label={`${viewState.meSelected(1) ? "✔︎ " : ""}samples`}
            {...a11yProps(1)}
          />
          <Tab
            label={`${viewState.meSelected(2) ? "✔︎ " : ""}themes`}
            {...a11yProps(2)}
          />
          <Tab
            label={`${viewState.meSelected(3) ? "✔︎ " : ""}images`}
            {...a11yProps(3)}
          />
          <Tab
            label={`${viewState.meSelected(4) ? "✔︎ " : ""}⚠️ generative`}
            {...a11yProps(4)}
          />
          <Tab
            label={`${viewState.meSelected(5) ? "✔︎ " : ""}⚠️ videos`}
            {...a11yProps(5)}
          />
        </Tabs>
        <TabPanel value={themeViewing} index={0}>
          <RandomGenre
            group={group}
            gameSettings={gameSettings}
            setGameSettings={setGameSettings}
          />
        </TabPanel>
        <TabPanel value={themeViewing} index={1}>
          <RandomSample
            group={group}
            gameSettings={gameSettings}
            setGameSettings={setGameSettings}
          />
        </TabPanel>
        <TabPanel value={themeViewing} index={2}>
          <RandomTheme
            group={group}
            gameSettings={gameSettings}
            setGameSettings={setGameSettings}
          />
        </TabPanel>
        <TabPanel value={themeViewing} index={3}>
          <RandomImage
            group={group}
            gameSettings={gameSettings}
            setGameSettings={setGameSettings}
          />
        </TabPanel>
        <TabPanel value={themeViewing} index={4}>
          <div>⚠️ generative mode (developing)</div>
          <div> generate sound via programming</div>
          <div> we can collaborate on making weird sounds and sequences</div>
          <div> and we can record them so we can use them in the game</div>
        </TabPanel>
        <TabPanel value={themeViewing} index={5}>
          <div>⚠️ video mode (developing)</div>
          <div> choose random videos from server</div>
          <div> we create a bgm for the video</div>
          <div>meta datas like midi or bpm will be automatically generated</div>
        </TabPanel>
      </Box>
    </div>
  );
};

export default ChaosWindow;
