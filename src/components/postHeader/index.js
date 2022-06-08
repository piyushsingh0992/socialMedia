import React from "react";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeletePost from "../deletePost";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ShareIcon from "@material-ui/icons/Share";
import { toast } from "react-toastify";
import Typography from "@material-ui/core/Typography";
import RemoveFromQueueIcon from "@material-ui/icons/RemoveFromQueue";
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

  function copyToClipBoard() {
    navigator.clipboard.writeText(
      `https://social-1997.netlify.app/post/${postId}`
    );

    toast.success("copied to clipboard");
  }

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
        <div>
          {deleteLoader ? (
            <CircularProgress />
          ) : (
            <IconButton aria-label="settings" onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
          )}
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            onClick={() => {}}
          >
            <MenuItem
              onClick={() => {
                copyToClipBoard();
                handleClose();
              }}
            >
              <ShareIcon />
              &nbsp;&nbsp;
              <Typography color="textSecondary" variant="p">
                Copy Link
              </Typography>
            </MenuItem>

            <MenuItem
              onClick={() => {
                navigate(`/post/${postId}`);
                handleClose();
              }}
            >
              <RemoveFromQueueIcon />
              &nbsp;&nbsp;
              <Typography color="textSecondary" variant="p">
                View Full screen
              </Typography>
            </MenuItem>
            {userDetails._id === auth.userKey && (
              <DeletePost
                anchorEl={anchorEl}
                handleClose={handleClose}
                postId={postId}
                userId={userDetails._id}
                handleClick={handleClick}
                deleteLoaderSetter={deleteLoaderSetter}
              />
            )}
          </Menu>
        </div>
      }
    />
  );
};

export default PostHeader;
