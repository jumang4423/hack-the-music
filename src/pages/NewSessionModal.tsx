import "react";
import { useEffect, useState } from "react";
import { Drawer, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { ColorObj } from "../models/color";
import { RandomId } from "../fun/randomId";
import InputSimpler from "../components/InputSimpler";
import { GameModeEnum } from "../models/gameMode";
import { useMutation } from "@apollo/client";
import { INSERT_GROUP } from "../fun/apis";
import { Group } from "./App";

type Props = {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  setGroup: (group: Group) => void;
};

const NewSessionModal: React.FC<Props> = ({
  modalOpen,
  setModalOpen,
  setGroup,
}) => {
  type formType = {
    groupIdBox: string;
    nameBox: string;
    nameBoxError: boolean;
    gameMode: GameModeEnum;
  };
  const [formData, setFormData] = useState<formType>({
    groupIdBox: "",
    nameBox: "",
    nameBoxError: false,
    gameMode: GameModeEnum.chaos,
  });
  const [insertGroup, { data, loading, error }] = useMutation(INSERT_GROUP);

  useEffect(() => {
    modalOpen && setFormData({ ...formData, groupIdBox: RandomId() });
  }, [modalOpen]);

  useEffect(() => {
    if (data) {
      setGroup(data.insertGroup);

      // navigate
      setModalOpen(false);
    }
  }, [data]);

  const onCreateSession = async () => {
    // check name is not empty
    setFormData({ ...formData, nameBoxError: formData.nameBox === "" });
    if (formData.nameBox === "") {
      return;
    }

    // mutate
    insertGroup({
      variables: {
        groupId: formData.groupIdBox,
        name: formData.nameBox,
        gameMode: Number(formData.gameMode),
      },
    });
  };

  return (
    <Drawer
      anchor={"bottom"}
      open={modalOpen}
      onClose={() => setModalOpen(false)}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            width: "100%",
          }}
        >
          <div
            style={{
              padding: "1rem 4rem 1rem 4rem",
            }}
          >
            <h1
              style={{
                color: ColorObj.black,
                marginBottom: "3rem",
              }}
            >
              # create a new group
            </h1>
            <InputSimpler
              title="group id"
              value={formData.groupIdBox}
              disabled
            />
            <InputSimpler
              title="group name *"
              value={formData.nameBox}
              error={formData.nameBoxError}
              autoFocus
              onChange={(e: any) => {
                setFormData({ ...formData, nameBox: e.target.value });
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <h3
                style={{
                  marginRight: "1rem",
                }}
              >
                initial game mode
              </h3>
              <ToggleButtonGroup
                color="primary"
                value={formData.gameMode}
                exclusive
                onChange={(_, newGameMode) => {
                  setFormData({ ...formData, gameMode: newGameMode });
                }}
                aria-label="Platform"
              >
                <ToggleButton value={0}>chaos mode</ToggleButton>
                <ToggleButton value={1}>ogiri mode</ToggleButton>
                <ToggleButton value={2}>bgm mode</ToggleButton>
              </ToggleButtonGroup>
            </div>

            <div
              style={{
                marginTop: "1rem",
              }}
            />

            <button onClick={onCreateSession}>
              {loading ? "loading..." : "create"}
            </button>

            <div
              style={{
                marginTop: "5rem",
              }}
            />
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default NewSessionModal;
