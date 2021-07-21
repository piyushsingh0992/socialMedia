import React from "react";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeletePost from "../deletePost";
import { useSelector } from "react-redux";

const PostHeader = ({
  handleClick,
  handleClose,
  anchorEl,
  userDetails,
  time,
}) => {
  const user = useSelector((state) => state.user.userDetails);
  
  return (
    <CardHeader
      title={`${userDetails.userName}`}
      subheader={time}
      avatar={<Avatar aria-label="recipe" src={user.profileImage} />}
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
