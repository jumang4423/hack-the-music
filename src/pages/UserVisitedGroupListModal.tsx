import { useEffect, useState } from "react";
import GenericModal from "../components/GenericModal";
import { useQuery } from "@apollo/client";
import { GET_USER_ACCESSED_GROUPS, GET_GROUPS } from "../fun/apis";
import { Group } from "../gql/graphql";
import HackyButton from "../components/HackyButton";
// @ts-ignore
import Cookies from "js-cookie";
import { get, getDatabase, ref } from "firebase/database";

const GetRageList = async (
  setIsRageList: (arg0: boolean[]) => void,
  groups: Group[]
): void => {
  const IsRageArr = new Array(groups.length).fill(false);
  for (let i = 0; i < groups.length; i++) {
    const db = getDatabase();
    const rageRef = ref(db, `groups/${groups[i].groupId}/isRageQuit`);

    const snapshot = get(rageRef);
    const isRageQuit = (await snapshot).val();

    if (isRageQuit) {
      IsRageArr[i] = true;
    }
  }

  setIsRageList(IsRageArr);

  return void 0;
};

const UserVisitedGroupList = ({
  setGroup,
  setModalOpen,
}: {
  setGroup: (gr: Group) => void;
  setModalOpen: (b: boolean) => void;
}) => {
  const { data, loading } = useQuery(GET_USER_ACCESSED_GROUPS, {
    variables: { userId: Cookies.get("userId") },
  });
  const {
    data: data2,
    loading: loading2,
    refetch: refetch2,
  } = useQuery(GET_GROUPS, {});
  const [isRageList, setIsRageList] = useState<Array<boolean>>([]);

  useEffect(() => {
    if (data && loading === false) {
      refetch2({
        groupIDs: data.user.accessedGroupIDs,
      });
    }
  }, [data, loading]);

  useEffect(() => {
    if (data2 && loading2 === false) {
      GetRageList(setIsRageList, data2.groups);
    }
  }, [data2, loading2]);

  if (loading || loading2) return <div>Loading...</div>;

  return (
    <div
      style={{
        margin: "16px",
        width: "540px",
      }}
    >
      <div
        style={{
          width: "540px",
        }}
      >
        {data2?.groups
          .map((group: Group, index: number) => {
            return (
              <div
                key={index + group.groupId}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "left",
                }}
              >
                <div
                  style={{
                    width: "80px",
                    marginRight: "16px",
                  }}
                >
                  <HackyButton
                    name={"join"}
                    prefer
                    onClick={() => {
                      setGroup(group);
                      setModalOpen(false);
                    }}
                  />
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    {group.groupId}
                    {isRageList[index] && (
                      <div style={{ color: "green", marginLeft: "8px" }}>
                        (raged)
                      </div>
                    )}
                  </div>
                  <div
                    style={{
                      color: "gray",
                    }}
                  >
                    :name {group.name}
                  </div>
                </div>
              </div>
            );
          })
          .reverse()}
      </div>
    </div>
  );
};

type Props = {
  modalOpen: boolean;
  setModalOpen: (is: boolean) => void;
  setGroup: (group: Group) => void;
};

const UserVisitedGroupListModal = ({
  modalOpen,
  setModalOpen,
  setGroup,
}: Props) => {
  return (
    <GenericModal
      open={modalOpen}
      handleClose={() => setModalOpen(false)}
      title="✈️ user visited group list"
    >
      {modalOpen && (
        <UserVisitedGroupList setModalOpen={setModalOpen} setGroup={setGroup} />
      )}
    </GenericModal>
  );
};

export default UserVisitedGroupListModal;
