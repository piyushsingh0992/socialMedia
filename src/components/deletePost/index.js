import React from "react";
import MenuItem from "@material-ui/core/MenuItem";

import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { deleteCurrentPost } from "../../container/postContainer/postSlice";
import { useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";
const DeletePost = ({ anchorEl, handleClose, postId, deleteLoaderSetter }) => {
  const dispatch = useDispatch();

  return (
    
      <MenuItem
        onClick={() => {
          handleClose();
          deleteLoaderSetter(true);
          dispatch(deleteCurrentPost(postId));
        }}
      >
        <DeleteOutlineIcon />
        &nbsp;&nbsp;
              <Typography color="textSecondary" variant="p">
        Delete</Typography>
      </MenuItem>
    
  );
};

export default DeletePost;
