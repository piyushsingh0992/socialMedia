import React from "react";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";

export function UserToolTip({ text, toolTipText }) {
  return (
    <Tooltip arrow title={toolTipText} placement="top">
      <Typography variant="h6" color="textPrimary" component="span">
        {text}
      </Typography>
    </Tooltip>
  );
}
