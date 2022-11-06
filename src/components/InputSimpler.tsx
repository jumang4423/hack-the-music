import { Input } from "@mui/material";
import { Box } from "@mui/system";

type Props = {
  disabled?: boolean;
  title: string;
  value: string | number;
  autoFocus?: boolean;
  onChange?: any;
  error?: boolean;
  fullWidth?: boolean;
  placeholder?: string;
  onEnter?: any;
  type?: string;
};

const InputSimpler: React.FC<Props> = ({
  disabled = false,
  value,
  title,
  autoFocus = false,
  onChange = () => {},
  onEnter = () => {},
  error = false,
  fullWidth = false,
  placeholder = "",
  type = "text",
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
      }}
    >
      <h3
        style={{
          marginRight: "1rem",
        }}
      >
        {title}
      </h3>
      <Box sx={{ width: 0.8 }}>
        <Input
          autoFocus={autoFocus}
          disabled={disabled}
          error={error}
          value={value}
          color="primary"
          fullWidth={fullWidth}
          placeholder={placeholder}
          onChange={onChange}
          type={type}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              onEnter();
            }
          }}
        />
      </Box>
    </div>
  );
};

export default InputSimpler;
