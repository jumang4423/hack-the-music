import { useEffect, useState } from "react";
import NewSessionModal from "./NewSessionModal";
import "./App.css";
import GameModal from "./GameModal";
import { GameModeEnum } from "../models/gameMode";
import Form from "./Form";

export type Group = {
  groupId: string;
  name: string;
  gameMode: GameModeEnum;
};

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [gameModalOpen, setGameModalOpen] = useState(false);
  const [group, setGroup] = useState<Group>({
    groupId: "",
    name: "",
    gameMode: GameModeEnum.chaos,
  });

  useEffect(() => {
    if (group.groupId !== "") {
      setGameModalOpen(true);
    }
  }, [group]);

  return (
    <div className="App">
      <Form setGroup={setGroup} setModalOpen={setModalOpen} />
      <NewSessionModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        setGroup={setGroup}
      />

      <GameModal
        modalOpen={gameModalOpen}
        setModalOpen={setGameModalOpen}
        group={group}
        setGroup={setGroup}
      />
    </div>
  );
}

export default App;
