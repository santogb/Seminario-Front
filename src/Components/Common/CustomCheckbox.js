import React from "react";
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const GreenCheckbox = withStyles({
  root: {
    color: "#238fcf",
    '&$checked': {
      color: "#238fcf",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default function CustomCheckbox({
  propName,
  handleChange,
  isDisabled,
  value,
  text,
}) {

  isDisabled = isDisabled || false;

  return (
    <FormControlLabel
      disabled={isDisabled}
      control={
        <GreenCheckbox
          checked={value}
          onChange={(e) => handleChange(propName, !value)}
          name={propName}
          color="primary"
        />
      }
      label={text}
      style={{ color: "#606060" }}
    />
  );
}
