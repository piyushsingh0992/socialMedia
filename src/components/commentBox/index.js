import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import InputBase from "@material-ui/core/InputBase";
import Grid from "@material-ui/core/Grid";
import { useStyles } from "./style.js";
import CardContent from "@material-ui/core/CardContent";
import { addCommentFunction } from "../../container/newsFeedContainer/postSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CircularProgress from "@material-ui/core/CircularProgress";
const CommentBox = ({ postId }) => {
  const classes = useStyles();
  const [text, textSetter] = useState("");
  let post = useSelector((state) => state.post);
  let user = useSelector((state) => state.user.userDetails);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, loaderSetter] = useState(false);

  useEffect(() => {
  
    if (
      post.commentStatus === "fullfilled" 
    ) {

      loaderSetter(false);
      textSetter("");
    }else if( post.commentStatus === "rejected"){
      toast.error(post.message);
      loaderSetter(false);
    }
  }, [post]);

  function keyListener(e) {
    if (e.keyCode === 13 && text.length > 0) {
      
      loaderSetter(true);
      dispatch(addCommentFunction({ postId, text }));
    } else if (e.keyCode === 13 && text.length <= 0) {
      toast.error("You cann't comment an empty String ");
    }
  }
  return (
    <CardContent
      style={{
        borderTop: "0.1px solid grey",
        background: "white",
      }}
    >
      <Grid container wrap="nowrap" spacing={2}>
        <Grid
          item
          onClick={() => {
            navigate(`/profile/${user._id}`);
          }}
          style={{ cursor: "pointer" }}
        >
          <Avatar src={user.profileImage} />
        </Grid>
        <Grid item xs>
          {loader ? (
            <CircularProgress />
          ) : (
            <InputBase
              placeholder="Add a comment"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => {
                textSetter(e.target.value);
              }}
              onKeyDown={keyListener}
              value={text}
            />
          )}
        </Grid>
      </Grid>
    </CardContent>
  );
};

export default CommentBox;
