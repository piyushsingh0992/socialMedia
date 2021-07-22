import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

const DeletePost = ({ anchorEl, handleClose, postId, userId }) => {
  
  return (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={handleClose}>
        <DeleteOutlineIcon />
        Delete
      </MenuItem>
    </Menu>
  );
};

export default DeletePost;
