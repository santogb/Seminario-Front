import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import { styled } from "@material-ui/core/styles";

const StyledButton = styled(Button)({
  "border-radius": "0.2rem !important",
  "background-color": "#238fcf",
  "color": "white",
  "& span": {
    padding: "5px !important",
    fontSize: "18px",
  },
  '&:hover': {
    backgroundColor: '#055A8B',
  },
});

export default function CustomButton({
  isLoading,
  isDisabled,
  isFullWidth,
  text,
  loadingText,
  handleClick,
  style
}) {
  
  isLoading = isLoading != null && isLoading !== undefined ? isLoading : false;
  isDisabled = isDisabled != null && isDisabled !== undefined ? isDisabled : false;
  isFullWidth = isFullWidth != null && isFullWidth !== undefined ? isFullWidth : false;

  return (
    
      <StyledButton
        variant="contained"
        color="secondary"
        fullWidth={isFullWidth}
        onClick={handleClick}
        disabled={isLoading || isDisabled}
        style={style}
      >
        {!isLoading ? text : loadingText} 
        {isLoading && (<div>{" "}<CircularProgress
          size={18}
          style={{ marginRight: "10px" }}
        />{" "}</div>)}
      </StyledButton>
  );
}
