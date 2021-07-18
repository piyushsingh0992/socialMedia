import React from "react";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import logo from "../../assets/logo.png";
import DeletePost from "../deletePost";

const PostHeader = ({ handleClick, handleClose, anchorEl }) => {
  
  return (
    <CardHeader
      title="user Name"
      subheader="September 14, 2016"
      avatar={
        <Avatar aria-label="recipe"  src={logo} />
      }
      style={{
        borderBottom: "0.1px solid grey",
      }}
      action={
        <div>
          <IconButton aria-label="settings" onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
          <DeletePost anchorEl={anchorEl} handleClose={handleClose} />
        </div>
      }
    />
  );
};

export default PostHeader;
