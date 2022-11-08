import { Group } from "../gql/graphql";
import { useState, useEffect } from "react";
import {
  getDatabase,
  ref,
  push,
  set,
  onChildAdded,
  off,
} from "firebase/database";
import InputSimpler from "../components/InputSimpler";
import HackyButton from "../components/HackyButton";
// @ts-ignore
import Cookies from "js-cookie";
import { ToRageQuit } from "../pages/GameModal";

enum MsgType {
  Text,
  Image,
  shellCommand,
}

type Message = {
  id: string;
  type: MsgType;
  userId: string;
  text: string;
  userName: string;
};

const MessageArr = ({
  messages,
  userId,
}: {
  messages: Array<Message>;
  userId: string;
}) => {
  const viewState = {
    msgBarColor: (msg_type: MsgType) => {
      switch (msg_type) {
        case MsgType.Text:
          return "lightblue";
        case MsgType.Image:
          return "white";
        case MsgType.shellCommand:
          return "lightgray";
      }
    },
  };
  return (
    <div
      style={{
        maxHeight: "320px",
        overflowY: "scroll",
      }}
    >
      {messages
        .map((message) => {
          if (message.type === MsgType.Image) {
            return (
              <div
                style={{
                  backgroundColor: viewState.msgBarColor(message.type),
                  margin: "5px",
                  padding: "5px",
                  borderRadius: "5px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <img src={message.text} width="25%" />
              </div>
            );
          }
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "16px",
                  backgroundColor: viewState.msgBarColor(message.type),
                  margin: "4px",
                }}
              />
              <div>
                <div
                  style={{
                    fontSize: userId !== message.userId ? "18px" : "16px",
                    color: userId !== message.userId ? "yellowgreen" : "black",
                  }}
                  key={message.id}
                >
                  {message.userName}: {message.text}
                </div>
              </div>
            </div>
          );
        })
        .reverse()}
    </div>
  );
};

const MsgParser = (
  msg: string
): [msgType: MsgType, additionalMsg: Array<string>] => {
  if (msg.startsWith("http")) {
    return [MsgType.Image, []];
  }

  const split = msg.split(" ");
  switch (split[0]) {
    case "group":
      return [MsgType.shellCommand, ["not implemented"]];
    case "help":
      return [
        MsgType.shellCommand,
        [
          "group: show group info ",
          "rage: ⚠️ rage quit",
          "clear: clear chat",
          "help: show this message",
        ],
      ];
    case "clear":
      return [MsgType.shellCommand, []];
    case "rage":
      return [MsgType.shellCommand, []];
    default:
      return [MsgType.Text, []];
  }
};

type Props = {
  group: Group;
  setGroup: (group: Group) => void;
  modalOpen: boolean;
};

const sendMsg = (mtype: MsgType, text: string, groupId: string) => {
  const db = getDatabase();
  const newMsgRef = push(ref(db, `groups/${groupId}/messages`));
  set(newMsgRef, {
    id: newMsgRef.key,
    type: mtype,
    userId: Cookies.get("userId"),
    text: text,
    userName: Cookies.get("name") ?? "anonymous",
  });
};

const Messanger = ({ group, setGroup, modalOpen }: Props) => {
  if (!modalOpen) return null;
  const userId = Cookies.get("userId");
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Array<Message>>([
    {
      id: "jumango",
      text: "welcome to hack-the-music!",
      type: MsgType.Text,
      userId,
      userName: "bot",
    },
    {
      id: "jumango2",
      text: "type 'help' to see what you can do",
      type: MsgType.Text,
      userId,
      userName: "bot",
    },
  ]);

  const msgUplodaer = (msg: string) => {
    if (message.length > 0 && group.groupId) {
      const [msgType, additionalMsg] = MsgParser(message);
      sendMsg(msgType, message, group.groupId);
      additionalMsg.forEach((msg: string) => {
        sendMsg(MsgType.shellCommand, msg, group.groupId);
      });
      setMessage("");
    }

    return void 0;
  };

  useEffect(() => {
    if (group.groupId === "") return;

    const db = getDatabase();
    const messagesRef = ref(db, `groups/${group.groupId}/messages`);
    onChildAdded(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data.text.split(" ").length > 0) {
        switch (data.text.split(" ")[0]) {
          case "clear":
            setMessages([]);
            break;
          case "rage":
            ToRageQuit(group.groupId);
            break;
        }
      }

      setMessages((messages) => [...messages, data as Message]);
    });

    return () => {
      off(messagesRef);
    };
  }, [group]);

  return (
    <div
      style={{
        marginTop: "36px",
        marginBottom: "36px",
      }}
    >
      <h2>λ= group chat </h2>

      <div
        style={{
          marginBottom: "24px",
        }}
      >
        <MessageArr messages={messages} userId={userId} />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <HackyButton
            name="run"
            onClick={() => {
              msgUplodaer(message);
            }}
          />
        </div>
        <div
          style={{
            width: "100%",
          }}
        >
          <InputSimpler
            title=""
            fullWidth={true}
            placeholder="message (enter to send)"
            value={message}
            onChange={(e: any) => setMessage(e.target.value)}
            onEnter={() => msgUplodaer(message)}
          />
        </div>
      </div>
    </div>
  );
};

export default Messanger;
