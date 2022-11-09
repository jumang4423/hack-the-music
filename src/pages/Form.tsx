import { useState, useEffect } from "react";
import { Input } from "@mui/material";
import { ColorObj } from "../models/color";
import { useQuery, useMutation } from "@apollo/client";
import { GET_GROUP, USER_VISIT_GROUP } from "../fun/apis";
import HackyButton from "../components/HackyButton";
import { Group } from "../gql/graphql";
// @ts-ignore
import Cookies from "js-cookie";
import UserVisitedGroupListModal from "./UserVisitedGroupListModal";
import LogoutModal from "./LogoutModal";

type Props = {
  setGroup: (group: Group) => void;
  setModalOpen: (open: boolean) => void;
};

type formType = { groupIdBox: string; groupIdBoxError: boolean };

const Form = ({ setGroup, setModalOpen }: Props) => {
  const [formData, setFormData] = useState<formType>({
    groupIdBox: "",
    groupIdBoxError: false,
  });

  const { data, loading, refetch } = useQuery(GET_GROUP, {});
  const [UserVisitedGroupListModalOpen, setUserVisitedGroupListModalOpen] =
    useState(false);
  const [UserVisitGroup] = useMutation(USER_VISIT_GROUP, {});
  const [isLogoutModal, setIsLogoutModal] = useState(false);

  useEffect(() => {
    if (data) {
      const group = data.group;
      setGroup(group);
      // navigate
      UserVisitGroup({
        variables: {
          groupId: group.groupId,
          userId: Cookies.get("userId") ?? "anonymous",
        },
      });
      setModalOpen(false);
    }
  }, [data]);

  const onJoingroup = () => {
    // check group id is not empty
    setFormData({
      ...formData,
      groupIdBoxError: formData.groupIdBox === "",
    });
    if (formData.groupIdBox === "") {
      return;
    }

    // mutate
    try {
      refetch({
        groupId: formData.groupIdBox,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1
        style={{
          color: ColorObj.black,
          marginBottom: "0px",
          fontSize: "34px",
        }}
      >
        # hack-the-music
      </h1>
      <div className="card">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Input
            value={formData.groupIdBox}
            autoFocus={true}
            error={formData.groupIdBoxError}
            placeholder="group id"
            color="primary"
            onChange={(e) => {
              setFormData({ ...formData, groupIdBox: e.target.value });
            }}
          />
          <HackyButton
            prefer
            style={{
              marginLeft: "1rem",
              marginRight: "1rem",
            }}
            isPending={loading}
            name={"join"}
            onClick={onJoingroup}
          />
        </div>
        <p
          style={{
            cursor: "pointer",
            color: "yellowgreen",
          }}
          onClick={() => {
            setModalOpen(true);
          }}
        >
          {"->"} 🍀 create a new group
        </p>
        <p
          style={{
            cursor: "pointer",
            color: ColorObj.gray,
            marginTop: "-0.7rem",
          }}
          onClick={() => {
            setUserVisitedGroupListModalOpen(true);
          }}
        >
          {"->"} 🌏 visited group history
        </p>
        <p
          style={{
            cursor: "pointer",
            color: ColorObj.gray,
            marginTop: "-0.7rem",
          }}
          onClick={() => {
            setIsLogoutModal(true);
          }}
        >
          {"->"} or logout right now
        </p>
      </div>

      <UserVisitedGroupListModal
        setGroup={setGroup}
        modalOpen={UserVisitedGroupListModalOpen}
        setModalOpen={setUserVisitedGroupListModalOpen}
      />

      <LogoutModal modalOpen={isLogoutModal} setModalOpen={setIsLogoutModal} />
    </div>
  );
};

export default Form;
