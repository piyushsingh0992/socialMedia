import React from "react";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";

export default function UserToolTip({ text, toolTipText, variant, color, component }) {
  return (
    <Tooltip arrow title={toolTipText} placement="top">
      <Typography variant={variant} color={color} component={component}>
        {text}
      </Typography>
    </Tooltip>
  );
}
