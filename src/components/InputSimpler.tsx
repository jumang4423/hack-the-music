import { Input } from "@mui/material";

type Props = {
  disabled?: boolean;
  title: string;
  value: string;
  autoFocus?: boolean;
  onChange?: any;
  error?: boolean;
  fullWidth?: boolean;
  placeholder?: string;
};

const InputSimpler: React.FC<Props> = ({
  disabled = false,
  value,
  title,
  autoFocus = false,
  onChange = () => {},
  error = false,
  fullWidth = false,
  placeholder = "",
}) => {
  return (
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
        {title}
      </h3>
      <Input
        autoFocus={autoFocus}
        disabled={disabled}
        error={error}
        value={value}
        color="primary"
        fullWidth={fullWidth}
        placeholder={placeholder}
        onChange={onChange}
        sx={{
          FontFamily: "IoSevka",
        }}
      />
    </div>
  );
};

export default InputSimpler;
