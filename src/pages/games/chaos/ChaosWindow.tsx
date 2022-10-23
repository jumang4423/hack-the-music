import { ChaosGameSettingsType } from "../../../models/chaosGameType";
import { Group } from "../../App";
import { Tabs } from "@mui/material";
import { Tab } from "@mui/material";
import { Box } from "@mui/material";
import { useState } from "react";
import RandomTheme from "./RandomTheme";
import { TabPanel } from "../../../components/TabPanel";

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

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
  const viewState = {
    meSelected: (meIndex: number) => {
      switch (meIndex) {
        case 0:
          return gameSettings.randomTheme.enabled;
        case 1:
          return gameSettings.randomSamples.enabled;
        case 2:
          return gameSettings.lifeSoundSampling.enabled;
        default:
          return false;
      }
    },
  };

  return (
    <div>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.white",
          display: "flex",
          height: "50vh",
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
            label={`${viewState.meSelected(2) ? "✔︎ " : ""}generative`}
            {...a11yProps(2)}
          />
        </Tabs>
        <TabPanel value={themeViewing} index={0}>
          <RandomTheme
            gameSettings={gameSettings}
            setGameSettings={setGameSettings}
          />
        </TabPanel>
        <TabPanel value={themeViewing} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={themeViewing} index={2}>
          Item Three
        </TabPanel>
      </Box>
    </div>
  );
};

export default ChaosWindow;
