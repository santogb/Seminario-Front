import React from "react";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';

export default function Dropdown({
  propName,
  placeholder,
  handleChange,
  value,
  isValid,
  isDisabled,
  validationMessage,
  options,
  optionValueProp,
  optionTextProp,
  optionTextProp2,

}) {

  isValid = isValid != null && isValid !== undefined ? isValid : true;
  isDisabled = isDisabled != null && isDisabled !== undefined ? isDisabled : false;

  return (
    <FormControl
      variant="outlined"
      fullWidth
      error={!isValid}
    >
      <InputLabel id={propName + "-ddl-lable"}>{placeholder}</InputLabel>
      <Select
        labelId={propName + "-ddl-lable"}
        id={propName + "-ddl"}
        value={value}
        onChange={(e) => handleChange(propName, e.target?.value)}
        label={placeholder}
        disabled={isDisabled}
      >
        {options.map((option, index) => (
          <MenuItem
            key={"ddl-" + { propName } + "-" + index}
            value={option[optionValueProp]}
          >
            {option[optionTextProp] + (option[optionTextProp2] ? (", " + option[optionTextProp2]) : "")}
          </MenuItem>
        ))}
      </Select>

      {!isValid && (
        <FormHelperText>
          {validationMessage ?? "Debe seleccionar una opcion."}
        </FormHelperText>
      )}
    </FormControl>
  );
}
