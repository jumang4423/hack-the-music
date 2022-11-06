import { ChaosGameSettingsType } from "../../../models/chaosGameType";
import { Group } from "../../../gql/graphql";
import { Tabs } from "@mui/material";
import { Tab } from "@mui/material";
import { Box } from "@mui/material";
import { useState } from "react";
import RandomTheme from "./RandomTheme";
import RandomSample from "./RandomSample";
import RandomImage from "./RandomImage";
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
          return gameSettings.randomTheme.enabled;
        case 1:
          return gameSettings.randomSamples.enabled;
        case 2:
          return gameSettings.randomImages.enabled;
        case 3:
          return gameSettings.lifeSoundSampling.enabled;
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
          height: "50vh",
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
            label={`${viewState.meSelected(0) ? "✔︎ " : ""}themes`}
            {...a11yProps(0)}
          />
          <Tab
            label={`${viewState.meSelected(1) ? "✔︎ " : ""}samples`}
            {...a11yProps(1)}
          />
          <Tab
            label={`${viewState.meSelected(2) ? "✔︎ " : ""}images`}
            {...a11yProps(2)}
          />
          <Tab
            label={`${viewState.meSelected(3) ? "✔︎ " : ""}⚠️ generative`}
            {...a11yProps(3)}
          />
        </Tabs>
        <TabPanel value={themeViewing} index={0}>
          <RandomTheme
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
          <RandomImage
            group={group}
            gameSettings={gameSettings}
            setGameSettings={setGameSettings}
          />
        </TabPanel>
        <TabPanel value={themeViewing} index={3}>
          not implemented
        </TabPanel>
      </Box>
    </div>
  );
};

export default ChaosWindow;
