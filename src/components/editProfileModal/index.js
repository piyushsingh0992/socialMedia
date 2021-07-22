import React, { useState, useEffect } from "react";
import { getModalStyle, useStyles } from "./style.js";
import Modal from "@material-ui/core/Modal";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import SaveIcon from "@material-ui/icons/Save";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { updateFunction } from "../../container/loginContainer/userSlice";
import UploadImage from "../uploadImage";

export default function EditProfileModal({ editDetails }) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  let user = useSelector((state) => state.user);
  useEffect(() => {
    if (user.updateStatus === "fullfilled") {
      toast.success(user.message);
      setOpen(false);
    } else if (user.updateStatus === "rejected") {
      toast.error(user.message);
    }
  }, [user]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [userDetails, userDetailsSetter] = useState(editDetails);
  const handleChange = (event) => {
    const name = event.target.name;
    userDetailsSetter((state) => {
      return {
        ...state,
        [name]: event.target.value,
      };
    });
  };

  useEffect(() => {
    if (user.status === "fullfilled") {
    }
  }, [user]);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Typography variant="h5" color="primary">
        Edit Profile
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            value={userDetails.userName}
            name="userName"
            autoFocus
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoFocus
            value={userDetails.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl
            required
            variant="outlined"
            className={classes.formControl}
          >
            <InputLabel margin="normal">Pronouns</InputLabel>
            <Select
              native
              onChange={handleChange}
              label="Pronouns"
              value={userDetails.pronouns}
              inputProps={{
                name: "pronouns",
              }}
            >
              <option aria-label="None" value="" />
              <option value="He/Him">He/Him</option>
              <option value="She/Her">She/Her</option>
              <option value="They/Them">They/Them</option>
              <option value="Ze/Zir">Ze/Zir</option>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl
            required
            variant="outlined"
            className={classes.formControl}
          >
            <InputLabel margin="normal">Sex</InputLabel>
            <Select
              native
              onChange={handleChange}
              label="sex"
              value={userDetails.sex}
              inputProps={{
                name: "sex",
              }}
            >
              <option aria-label="None" value="" />
              <option value={"Male"}>Male</option>
              <option value={"Female"}>Female</option>
              <option value={"Others"}>Others</option>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <UploadImage text="Change Profile Picture" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <UploadImage text="Change Cover Picture" />
        </Grid>

        <Grid xs={12} sm={6} style={{ margin: "2rem 0" }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            startIcon={<SaveIcon />}
            onClick={() => {
              dispatch(updateFunction(userDetails));
            }}
          >
            {user.updateStatus === "loading" ? "loading..." : "Save"}
          </Button>
        </Grid>
      </Grid>
    </div>
  );

  return (
    <div>
      <EditOutlinedIcon
        onClick={handleOpen}
        style={{ cursor: "pointer", marginLeft: "1rem", fontSize: 38 }}
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
