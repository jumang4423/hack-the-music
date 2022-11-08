import { useEffect, useState } from "react";
import NewSessionModal from "./NewSessionModal";
import "./App.css";
import GameModal from "./GameModal";
import { GameModeEnum } from "../models/gameMode";
import Form from "./Form";
import { Group } from "../gql/graphql";
import AuthModal from "./AuthModal";
import UserModal from "./UserModal";

export const GroupDefault: Group = {
  groupId: "",
  name: "",
  gameMode: GameModeEnum.chaos,
  adminUserId: "",
};

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [gameModalOpen, setGameModalOpen] = useState(false);
  const [group, setGroup] = useState<Group>(GroupDefault);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [userModalOpen, setUserModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (group.groupId !== "") {
      setGameModalOpen(true);
    } else {
      setGameModalOpen(false);
    }
  }, [group]);

  return (
    <div className="App">
      <Form setGroup={setGroup} setModalOpen={setModalOpen} />
      <NewSessionModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        setGroup={setGroup}
        setIsNewUser={setIsNewUser}
      />

      <GameModal
        modalOpen={gameModalOpen}
        setModalOpen={setGameModalOpen}
        group={group}
        setGroup={setGroup}
        isNewUser={isNewUser}
      />

      <AuthModal modalOpen={authModalOpen} setModalOpen={setAuthModalOpen} />
      <UserModal modalOpen={userModalOpen} setModalOpen={setUserModalOpen} />
    </div>
  );
}

export default App;
