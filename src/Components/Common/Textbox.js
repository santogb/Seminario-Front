import React from "react";
import TextField from "@material-ui/core/TextField";

export default function Textbox({
  propName,
  placeholder,
  handleChange,
  value,
  isValid,
  isDisabled,
  isNumber,
  isPassword,
  isDate,
  isMonth,
  validationMessage,
}) {
  isValid = isValid != null && isValid !== undefined ? isValid : true;
  isDisabled =
    isDisabled != null && isDisabled !== undefined ? isDisabled : false;
  isNumber = isNumber != null && isNumber !== undefined ? isNumber : false;
  isPassword =
    isPassword != null && isPassword !== undefined ? isPassword : false;
  isDate = isDate != null && isDate !== undefined ? isDate : false;
  isMonth = isMonth != null && isMonth !== undefined ? isMonth : false;

  return (
    <div>
      <TextField
        id={propName}
        label={placeholder}
        defaultValue={value}
        value={value}
        variant="outlined"
        fullWidth
        disabled={isDisabled}
        onChange={(e) => handleChange(propName, e.target?.value)}
        error={!isValid}
        type={
          isNumber
            ? "number"
            : isPassword
            ? "password"
            : isDate
            ? "date"
            : isMonth
            ? "month"
            : "text"
        }
        helperText={!isValid ? validationMessage : ""}
        InputLabelProps={
          (isDate || isMonth || (isDisabled && value)) && {
            shrink: true,
          }
        }
      />
    </div>
  );
}
