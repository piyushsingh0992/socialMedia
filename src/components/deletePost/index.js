import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { deletePostFunction } from "../../container/newsFeedContainer/postSlice";
import { useDispatch } from "react-redux";

const DeletePost = ({ anchorEl, handleClose, postId, userId }) => {
  const dispatch = useDispatch();

  return (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
      onClick={() => {
        dispatch(deletePostFunction(postId));
      }}
    >
      <MenuItem onClick={handleClose}>
        <DeleteOutlineIcon />
        Delete
      </MenuItem>
    </Menu>
  );
};

export default DeletePost;
