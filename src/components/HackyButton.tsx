import { ColorObj } from "../models/color";

type Props = {
  name: string;
  mode?: "dark" | "light";
  onClick: () => void;
  isError?: boolean;
  isDisabled?: boolean;
  isPending?: boolean;
  style?: React.CSSProperties;
  prefer?: boolean;
};

const HackyButton = ({
  name,
  mode = "light",
  onClick,
  isError = false,
  isDisabled = false,
  isPending = false,
  style = {},
  prefer = false,
}: Props) => {
  const textColor = () => {
    if (isDisabled) return ColorObj.gray;
    if (isError) return ColorObj.red;

    if (prefer) return "green";

    return mode === "dark" ? ColorObj.white : ColorObj.black;
  };
  return (
    <div
      style={{
        backgroundColor: ColorObj.lightGray,
        color: textColor(),
        cursor: isDisabled ? "not-allowed" : "pointer",
        ...style,
      }}
      onClick={onClick}
    >
      <div style={{ padding: "8px 16px 8px 16px" }}>
        {isPending ? <div> loading... </div> : <div> {name} </div>}
      </div>
    </div>
  );
};

export default HackyButton;
