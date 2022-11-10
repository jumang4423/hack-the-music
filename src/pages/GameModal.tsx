import { Drawer, Tooltip } from "@mui/material";
import { Group, AdditionalTheme } from "../gql/graphql";
import { GameModeEnum } from "../models/gameMode";
import ChaosModeGame from "./games/chaos/ChaosModeGame";
import { ChaosGameSettingsType } from "../models/chaosGameType";
import { useEffect, useState } from "react";
import TimeLimitBox from "./games/TimeLimitBox";
import Devider from "../components/Devider";
import HackyButton from "../components/HackyButton";
import ShareGroupIdModal from "./ShareGroupIdModal";
import GameSettingsModal from "./GameSettingsModal";
import AdditionalThemeModal from "./AdditionalThemeModal";
import { RemoveAllCookies } from "../fun/removeAllCookie";
import { getAuth, signOut } from "firebase/auth";
import ResultMusicPlayer from "./ResultMusicPlayer";
import Messanger from "./Messanger";
import {
  getDatabase,
  ref,
  get,
  set,
  onValue,
  off,
  onChildAdded,
  onChildChanged,
} from "firebase/database";
import { IsMeAdminRn } from "../fun/isMeAdminRn";
import { RandomId } from "../fun/randomId";
import MusicUploadModal from "./MusicUploadModal";

// @ts-ignore
import Cookies from "js-cookie";

export type UploadedMusic = {
  musicId: string;
  name: string;
  url: string;
  idUploadedBy: string;
  userName: string;
  love: number;
  surprised: number;
  crazy: number;
  beautiful: number;
};

const refresh = () => {
  window.location.reload();
};

const userAdditionalList = (
  userId: string,
  gameSettings: ChaosGameSettingsType
): Array<AdditionalTheme> => {
  const userAdditionalList =
    gameSettings.randomAdditionalThemes.additionalThemes.filter(
      (additionalTheme) => additionalTheme.toUserId === userId
    );

  return userAdditionalList;
};

const MeJoinGroupCall = async (groupId: string) => {
  const db = getDatabase();
  const groupRef = ref(db, `groups/${groupId}/joinedUsers`);
  const getUsersArr = get(groupRef);
  const usersArr_str: string = (await getUsersArr).val();

  if (usersArr_str === null) {
    set(
      groupRef,
      JSON.stringify([
        { userId: Cookies.get("userId"), name: Cookies.get("name") },
      ])
    );
  }

  const usersArr: Array<{ userId: string; name: string }> =
    JSON.parse(usersArr_str);
  const me = Cookies.get("userId");
  if (me) {
    const meObj = { userId: me, name: Cookies.get("name") };
    if (!usersArr.find((user) => user.userId === me)) {
      usersArr.push(meObj);
      set(groupRef, JSON.stringify(usersArr));
    }
  }

  return void 0;
};

const CheckIfICanRageToday = async (groupId: string): Promise<boolean> => {
  const db = getDatabase();
  const rageRef = ref(
    db,
    `groups/${groupId}/ragedFlags/${Cookies.get("userId")}`
  );
  const snapshot = await get(rageRef);

  return !snapshot.val();
};

const OiMeRagedFlagTaker = (groupId: string): void => {
  const db = getDatabase();
  const rageRef = ref(
    db,
    `groups/${groupId}/ragedFlags/${Cookies.get("userId")}`
  );
  set(rageRef, true);
};

export const rage = async (groupId: string) => {
  const isRage = await CheckIfICanRageToday(groupId);
  if (isRage) {
    OiMeRagedFlagTaker(groupId);
    RemoveAllCookies();
    // flager
    signOut(getAuth()).then(() => {
      refresh();
    });
  }
};

const secToMinSecString = (sec: number) => {
  const min = Math.floor(sec / 60);
  const secLeft = sec % 60;
  return `${min}m ${secLeft}s`;
};

export const ToRageQuit = (groupId: string) => {
  const db = getDatabase();
  const isRageQuitRef = ref(db, `groups/${groupId}/isRageQuit`);
  set(isRageQuitRef, true);
  rage(groupId);
};

const UpdateTimeLimit = (groupId: string, timeLimit: number) => {
  const db = getDatabase();
  const timeLimitRef = ref(db, `groups/${groupId}/timeLimit`);
  set(timeLimitRef, timeLimit);
};

const joinedGenreGame = (
  music: UploadedMusic,
  gameSettings: ChaosGameSettingsType
) => {
  return gameSettings.randomGenres.genres.some((genre) => {
    console.log(genre.userId, music);
    return genre.userId === music.idUploadedBy;
  });
};

const getGenreName = (
  gameSettings: ChaosGameSettingsType,
  userId: string
): string => {
  const genre = gameSettings.randomGenres.genres.find(
    (genre) => genre.userId === userId
  );
  if (genre) {
    return genre.genreName;
  }
  return "error";
};

const UpdateGameSettings = (
  group: Group,
  newSettings: ChaosGameSettingsType
) => {
  const db = getDatabase();
  const groupId = group.groupId;
  const gameSettingsRef = ref(db, `groups/${groupId}/gameSettings`);
  set(gameSettingsRef, JSON.stringify(newSettings));

  const gameModeRef = ref(db, `groups/${groupId}/gameMode`);
  set(gameModeRef, group.gameMode);

  return void 0;
};

type Props = {
  modalOpen: boolean;
  setModalOpen: any;
  group: Group;
  setGroup: (group: Group) => void;
  isNewUser: boolean;
};

const GameModal: React.FC<Props> = ({
  modalOpen,
  setModalOpen,
  group,
  setGroup,
  isNewUser,
}) => {
  const [gameSettings, setGameSettings] = useState<ChaosGameSettingsType>({
    randomTheme: {
      enabled: true,
      themes: [],
    },
    randomSamples: {
      enabled: true,
      samples: [],
    },
    randomImages: {
      enabled: false,
      images: [],
    },
    lifeSoundSampling: {
      enabled: false,
      generativeId: 0,
    },
    randomVideos: {
      enabled: false,
    },
    randomGenres: {
      enabled: false,
      genres: [],
    },
    randomAdditionalThemes: {
      enabled: true,
      additionalThemes: [],
    },
    sceneIndex: 0,
    timeLimitMin: 30,
    gameStarted: false,
    gameEnded: false,
    newGroupId: "",
  });
  const [isGroupIdModalOpen, setIsGroupIdModalOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<number | null>(null);
  const [uploadedMusics, setUploadedMusics] = useState<UploadedMusic[]>([]);
  const [isUploadMusicModalOpen, setIsUploadMusicModalOpen] = useState(false);
  const [isGameSettingsModalOpen, setIsGameSettingsModalOpen] = useState(false);
  const [isAdditionalThemeModalOpen, setIsAdditionalThemeModalOpen] =
    useState(false);

  const viewState = {
    gameComponentSelector: (gameMode: GameModeEnum) => {
      if (!modalOpen) {
        return <></>;
      }

      switch (gameMode) {
        case GameModeEnum.chaos:
          return (
            <ChaosModeGame
              group={group}
              setGroup={setGroup}
              gameSettings={gameSettings}
              setGameSettings={setGameSettings}
            />
          );
        default:
          return <div>Game not found</div>;
      }
    },
    isMeAdmin: () => IsMeAdminRn(group),
  };

  useEffect(() => {
    if (isNewUser && group.groupId !== "") {
      setIsGroupIdModalOpen(true);
    }
    if (group.groupId === "") {
      return;
    }
    const db = getDatabase();
    const groupId = group.groupId;
    const gameSettingsRef = ref(db, `groups/${groupId}/gameSettings`);
    onValue(gameSettingsRef, (snapshot) => {
      const newSettings = snapshot.val();
      if (newSettings) {
        const newSettingsParsed = JSON.parse(newSettings);
        setGameSettings(newSettingsParsed);
      } else {
        UpdateGameSettings(group, gameSettings);
      }
    });
    const isRageQuitRef = ref(db, `groups/${groupId}/isRageQuit`);
    get(isRageQuitRef).then((snapshot) => {
      const isRageQuit = snapshot.val();
      if (isRageQuit) {
        rage(group.groupId);
      }
    });
    onValue(isRageQuitRef, (snapshot) => {
      const isRageQuit = snapshot.val();
      if (isRageQuit) {
        rage(group.groupId);
      }
    });
    const TimeLimitRef = ref(db, `groups/${groupId}/timeLimit`);
    get(TimeLimitRef).then((snapshot) => {
      const timeLimit = snapshot.val();
      if (timeLimit) {
        setCurrentTime(timeLimit);
      }
    });
    onValue(TimeLimitRef, (snapshot) => {
      const timeLimit = snapshot.val();
      if (timeLimit) {
        setCurrentTime(timeLimit);
      }
    });
    const uploadedMusicsRef = ref(db, `groups/${groupId}/results`);
    onChildAdded(uploadedMusicsRef, (snapshot) => {
      const uploadedMusic = snapshot.val();
      if (uploadedMusic) {
        setUploadedMusics((prev) => [...prev, uploadedMusic]);
      }
    });
    onChildChanged(uploadedMusicsRef, (snapshot) => {
      const uploadedMusic = snapshot.val();
      if (uploadedMusic) {
        setUploadedMusics((prev) => {
          const newUploadedMusics = prev.map((music) => {
            if (music.musicId === uploadedMusic.musicId) {
              return uploadedMusic;
            }
            return music;
          });
          return newUploadedMusics;
        });
      }
    });
    // notify
    MeJoinGroupCall(group.groupId);

    return () => {
      off(gameSettingsRef);
      off(isRageQuitRef);
      off(TimeLimitRef);
      off(uploadedMusicsRef);
    };
  }, [group]);

  useEffect(() => {
    if (group.groupId !== "") {
      UpdateGameSettings(group, gameSettings);
    }
  }, [gameSettings]);

  useEffect(() => {
    if (currentTime === null) {
      return;
    }

    // getTimelimit!
    const db = getDatabase();
    const timeLimitRef = ref(db, `groups/${group.groupId}/timeLimit`);
    get(timeLimitRef).then((snapshot) => {
      const timeLimit = snapshot.val();
      if (timeLimit) {
        setCurrentTime(timeLimit);
      }
    });

    if (viewState.isMeAdmin() && group.groupId !== "") {
      const id = setInterval(() => {
        setCurrentTime((currentTime) => {
          if (currentTime! >= 0) {
            UpdateTimeLimit(group.groupId, currentTime! - 1);
            return currentTime! - 1;
          } else {
            return currentTime!;
          }
        });
      }, 1000);

      return () => {
        clearInterval(id);
      };
    }
  }, [gameSettings.gameStarted]);

  useEffect(() => {
    if (currentTime === null) {
      return;
    }
    if (currentTime <= 0) {
      const newGameSettings = Object.assign({}, gameSettings);
      newGameSettings.gameEnded = true;
      const newRandomId = RandomId();
      newGameSettings.newGroupId = newRandomId;
      setGameSettings(newGameSettings);
      // おわり
    }
  }, [currentTime]);

  return (
    <div>
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
                padding: "1rem 2rem 1rem 2rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Tooltip title={"click to copy group id to clipboard"}>
                  <div
                    style={{
                      color: "black",
                      marginTop: "2.2rem",
                      marginBottom: "2rem",
                      fontSize: "1.6rem",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      if (group.groupId !== "") {
                        navigator.clipboard.writeText(group.groupId);
                      }
                    }}
                  >
                    # {group.name} 💫 {group.groupId}
                  </div>
                </Tooltip>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "1.1rem",
                    marginBottom: "1rem",
                  }}
                >
                  <HackyButton
                    prefer={true}
                    name={"leave"}
                    mode={"light"}
                    style={{
                      marginRight: "1rem",
                    }}
                    onClick={() => {
                      refresh();
                    }}
                  />
                  <HackyButton
                    name={"⚠️ rage"}
                    style={{
                      marginRight: "1rem",
                    }}
                    onClick={() => {
                      ToRageQuit(group.groupId);
                    }}
                  />
                </div>
              </div>
              <Devider />

              {!gameSettings.gameStarted && (
                <div>
                  <div>
                    <div
                      style={{
                        marginTop: "1rem",
                        width: "100%",
                        marginRight: "5rem",
                        marginBottom: "1rem",
                        display: "flex",
                        justifyContent: "flex-start",
                        right: 0,
                      }}
                    >
                      <HackyButton
                        name={"🎧 start"}
                        mode={"light"}
                        prefer={true}
                        isDisabled={!viewState.isMeAdmin()}
                        style={{
                          marginRight: "0rem",
                        }}
                        onClick={() => {
                          const newGameSettings = Object.assign(
                            {},
                            gameSettings
                          );
                          newGameSettings.gameStarted = true;
                          setGameSettings(newGameSettings);
                          setCurrentTime(newGameSettings.timeLimitMin);
                          UpdateTimeLimit(
                            group.groupId,
                            newGameSettings.timeLimitMin * 60
                          );
                        }}
                      />
                      <HackyButton
                        name={"⚙ game settings"}
                        mode={"light"}
                        isDisabled={!viewState.isMeAdmin()}
                        style={{
                          marginLeft: "1rem",
                        }}
                        onClick={() => {
                          setIsGameSettingsModalOpen(true);
                        }}
                      />
                    </div>
                  </div>
                  <Devider />
                </div>
              )}

              {gameSettings.gameStarted &&
                currentTime !== null &&
                currentTime >= 0 && (
                  <div>
                    <div
                      style={{
                        marginTop: "0rem",
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-start",
                        color: "black",
                      }}
                    >
                      <h2>
                        ⏰{" "}
                        {currentTime ? secToMinSecString(currentTime) : "--:--"}{" "}
                        / {secToMinSecString(gameSettings.timeLimitMin * 60)}
                      </h2>
                      <div
                        style={{
                          marginTop: "0.8rem",
                          marginLeft: "2rem",
                        }}
                      >
                        <HackyButton
                          name={"check additional theme"}
                          onClick={() => {
                            setIsAdditionalThemeModalOpen(true);
                          }}
                        />
                      </div>
                      <div
                        style={{
                          marginTop: "0.8rem",
                          marginLeft: "1rem",
                        }}
                      >
                        <HackyButton
                          name={"add 10 min"}
                          isDisabled={!viewState.isMeAdmin()}
                          style={{
                            marginRight: "0rem",
                          }}
                          onClick={() => {
                            const newGameSettings = Object.assign(
                              {},
                              gameSettings
                            );
                            newGameSettings.gameStarted = true;
                            newGameSettings.gameEnded = false;
                            setGameSettings(newGameSettings);
                            setCurrentTime((currentTime) => currentTime! + 600);
                          }}
                        />
                      </div>
                      <div
                        style={{
                          marginTop: "0.8rem",
                          marginLeft: "1rem",
                        }}
                      >
                        <HackyButton
                          name={"finish"}
                          prefer={true}
                          isDisabled={!viewState.isMeAdmin()}
                          style={{
                            marginRight: "0rem",
                          }}
                          onClick={() => {
                            const newGameSettings = Object.assign(
                              {},
                              gameSettings
                            );
                            newGameSettings.gameStarted = true;
                            newGameSettings.gameEnded = true;
                            setGameSettings(newGameSettings);
                            setCurrentTime(0);
                          }}
                        />
                      </div>
                    </div>
                    <Devider />
                  </div>
                )}
              {gameSettings.gameEnded && (
                <div>
                  <div
                    style={{
                      marginTop: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <h2
                      style={{
                        padding: "8px 0px 8px 0px",
                      }}
                    >
                      ⛳️ game ended
                    </h2>
                    <div
                      style={{
                        marginTop: "-0.5rem",
                      }}
                    >
                      <div>
                        game finished! time to listen to the team's songs and
                        vote for your favorite!
                      </div>

                      <div
                        style={{
                          marginBottom: "2rem",
                        }}
                      >
                        {uploadedMusics.map((music, index) => {
                          return (
                            <div key={index}>
                              <div
                                style={{
                                  width: "100%",
                                  marginTop: "24px",
                                  marginLeft: "10px",
                                  marginBottom: "-16px",
                                  display: "flex",
                                  flexDirection: "row",
                                }}
                              >
                                <div>{index + 1}.</div>{" "}
                                <div
                                  style={{
                                    marginLeft: "8px",
                                  }}
                                >
                                  {music.name} by {music.userName}
                                </div>
                              </div>
                              {joinedGenreGame(music, gameSettings) && (
                                <div
                                  style={{
                                    marginTop: "16px",
                                    marginBottom: "-16px",
                                    marginLeft: "24px",
                                  }}
                                >
                                  <div
                                    style={{
                                      marginLeft: "8px",
                                      width: "auto",
                                      textDecoration: "underline",
                                    }}
                                  >
                                    🐧 tried genre:{" "}
                                    {getGenreName(
                                      gameSettings,
                                      music.idUploadedBy
                                    )}
                                  </div>
                                </div>
                              )}
                              {userAdditionalList(
                                music.idUploadedBy,
                                gameSettings
                              ).map((adTheme, index) => {
                                return (
                                  <div
                                    key={adTheme.toName + index}
                                    style={{
                                      marginTop: "16px",
                                      marginBottom: "-16px",
                                      marginLeft: "24px",
                                    }}
                                  >
                                    <div
                                      style={{
                                        marginLeft: "8px",
                                        width: "auto",
                                        textDecoration: "underline",
                                      }}
                                    >
                                      💨 required theme
                                      {adTheme.content}
                                    </div>
                                  </div>
                                );
                              })}
                              <ResultMusicPlayer
                                music={music}
                                index={index}
                                group={group}
                              />
                            </div>
                          );
                        })}
                      </div>

                      <div
                        style={{
                          marginTop: "1rem",
                          width: "120px",
                        }}
                      >
                        <HackyButton
                          name={"🌥 upload"}
                          prefer={true}
                          style={{
                            marginRight: "0rem",
                          }}
                          onClick={() => {
                            setIsUploadMusicModalOpen(true);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <Devider />
                </div>
              )}

              <Messanger
                group={group}
                setGroup={setGroup}
                modalOpen={modalOpen}
              />

              <Devider />

              {viewState.gameComponentSelector(group.gameMode)}
              <Devider />
              <TimeLimitBox
                group={group}
                gameSettings={gameSettings}
                setGameSettings={setGameSettings}
              />
            </div>
          </div>
        </div>
        <div style={{ height: "100vh" }} />
      </Drawer>
      <ShareGroupIdModal
        gameSettings={gameSettings}
        setGameSettings={setGameSettings}
        group={group}
        isGroupIdModalOpen={isGroupIdModalOpen}
        setIsGroupIdModalOpen={setIsGroupIdModalOpen}
      />
      <MusicUploadModal
        group={group}
        isModalOpen={isUploadMusicModalOpen}
        setIsModalOpen={setIsUploadMusicModalOpen}
      />
      <GameSettingsModal
        gameSettings={gameSettings}
        setGameSettings={setGameSettings}
        isModalOpen={isGameSettingsModalOpen}
        setIsModalOpen={setIsGameSettingsModalOpen}
      />

      <AdditionalThemeModal
        group={group}
        gameSettings={gameSettings}
        setGameSettings={setGameSettings}
        isModalOpen={isAdditionalThemeModalOpen}
        setIsModalOpen={setIsAdditionalThemeModalOpen}
        currentTime={currentTime}
      />
    </div>
  );
};

export default GameModal;
