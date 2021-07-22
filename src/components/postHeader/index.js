import React from "react";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeletePost from "../deletePost";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PostHeader = ({
  handleClick,
  handleClose,
  anchorEl,
  userDetails,
  time,
  postId
}) => {
  const navigate = useNavigate();
  return (
    <CardHeader
      title={`${userDetails.userName}`}
      subheader={time}
      avatar={
        <Avatar
          aria-label="recipe"
          src={userDetails.profileImage}
          style={{
            cursor: "pointer",
          }}
          onClick={() => {
            navigate(`/profile/${userDetails._id}`);
          }}
        />
      }
      style={{
        borderBottom: "0.1px solid grey",
      }}
      action={
        <div>
          <IconButton aria-label="settings" onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
          <DeletePost
            anchorEl={anchorEl}
            handleClose={handleClose}
            postId={postId}
            userId={userDetails._id}
          />
        </div>
      }
    />
  );
};

export default PostHeader;
