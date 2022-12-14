import { useMutation } from "@apollo/client";
import { ChaosGameSettingsType } from "../models/chaosGameType";
import GenericModal from "../components/GenericModal";
import { useEffect } from "react";
import { GET_RANDOM_ADDITIONAL_THEME } from "../fun/apis";
import { Group } from "../gql/graphql";
import * as database from "firebase/database";
import { useNoticeSound } from "../fun/useNoticeSound";

type Props = {
  group: Group;
  currentTime: number | null;
  gameSettings: ChaosGameSettingsType;
  setGameSettings: (gameSettings: ChaosGameSettingsType) => void;
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
};

const AdditionalThemeModal = ({
  group,
  currentTime,
  gameSettings,
  setGameSettings,
  isModalOpen,
  setIsModalOpen,
}: Props) => {
  const onChimePlay = useNoticeSound();
  const [GetAdditionalTheme] = useMutation(GET_RANDOM_ADDITIONAL_THEME, {
    onCompleted({ randomAdditionalTheme }) {
      onChimePlay();
      setGameSettings({
        ...gameSettings,
        randomAdditionalThemes: {
          ...gameSettings.randomAdditionalThemes,
          additionalThemes: [
            ...gameSettings.randomAdditionalThemes.additionalThemes,
            randomAdditionalTheme,
          ],
        },
      });
    },
  });
  const onGetTheme = async () => {
    const db = database.getDatabase();
    const ref = database.ref(db, `groups/${group.groupId}/joinedUsers`);
    const joinedUsers = await database.get(ref);
    const joinedUsersData = JSON.parse(joinedUsers.val());
    const randomUser =
      joinedUsersData[Math.floor(Math.random() * joinedUsersData.length)];

    GetAdditionalTheme({
      variables: {
        toUserId: randomUser.userId,
        toName: randomUser.name,
      },
    });
    setIsModalOpen(true);
  };

  useEffect(() => {
    // um, basically this does call additional theme modal every 10 minutes
    // TODO: and you know, this is terrifying code
    if (
      gameSettings.randomAdditionalThemes.enabled &&
      currentTime !== 60 * gameSettings.timeLimitMin &&
      !gameSettings.gameEnded &&
      currentTime !== null &&
      currentTime !== -1 &&
      currentTime !== 0 &&
      currentTime % 600 === 0
    ) {
      onGetTheme();
    }
  }, [currentTime]);

  return (
    <GenericModal
      open={isModalOpen}
      handleClose={() => setIsModalOpen(false)}
      title="???? new additional theme"
    >
      <div
        style={{
          width: "540px",
          padding: "16px",
        }}
      >
        <div
          style={{
            marginTop: "-8px",
            marginBottom: "16px",
            fontSize: "22px",
          }}
        >
          new additional theme arrived!
        </div>
        <div>
          {gameSettings.randomAdditionalThemes.additionalThemes.map(
            (additionalTheme, index) => (
              <div key={additionalTheme.content + index}>
                {additionalTheme.toName}
                {" got "}
                {additionalTheme.content}
              </div>
            )
          )}
        </div>
      </div>
    </GenericModal>
  );
};

export default AdditionalThemeModal;
