import React, { useEffect } from "react";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeletePost from "../deletePost";
import { resetDeletePostStatus } from "../../container/newsFeedContainer/postSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
const PostHeader = ({
  handleClick,
  handleClose,
  anchorEl,
  userDetails,
  time,
  postId,
}) => {
  let user = useSelector((state) => state.user.userDetails);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post);

  useEffect(() => {
    post.deletePostStatus === "fullfilled" && dispatch(resetDeletePostStatus());

    post.deletePostStatus === "rejected" &&
      toast.error("Sorry Couldn't delete your post");
    return () => {
      if (post.deletePostStatus === "fullfilled") {
        toast.success("post deleted");
        navigate("/");
      }
    };
  }, [post]);

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
          {userDetails._id === user._id &&
            (post.deletePostStatus === "loading" ? (
              <CircularProgress />
            ) : (
              <IconButton aria-label="settings" onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
            ))}

          {userDetails._id === user._id && (
            <DeletePost
              anchorEl={anchorEl}
              handleClose={handleClose}
              postId={postId}
              userId={userDetails._id}
              handleClick={handleClick}
            />
          )}
        </div>
      }
    />
  );
};

export default PostHeader;
