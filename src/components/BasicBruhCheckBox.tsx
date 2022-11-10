import { FormControlLabel } from "@mui/material";
import { Checkbox } from "@mui/material";

type Props = {
  name: string;
  value: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
};

const BasicBruhCheckBox = ({
  name,
  value,
  onChange,
  disabled = false,
}: Props) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          name={name}
          disabled={disabled}
        />
      }
      label={name}
    />
  );
};

export default BasicBruhCheckBox;
