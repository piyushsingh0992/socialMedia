import React from "react";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeletePost from "../deletePost";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
const PostHeader = ({
  handleClick,
  handleClose,
  anchorEl,
  userDetails,
  time,
  postId,
  deleteLoader,
  deleteLoaderSetter,
}) => {
  let auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  let currentPost = useSelector((state) => state.post);

  return (
    <CardHeader
      title={`${userDetails.userName}`}
      subheader={time ? time : ""}
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
        userDetails._id === auth.userKey && (
          <div>
            {deleteLoader ? (
              <CircularProgress />
            ) : (
              <IconButton aria-label="settings" onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
            )}
            <DeletePost
              anchorEl={anchorEl}
              handleClose={handleClose}
              postId={postId}
              userId={userDetails._id}
              handleClick={handleClick}
              deleteLoaderSetter={deleteLoaderSetter}
            />
          </div>
        )
      }
    />
  );
};

export default PostHeader;
