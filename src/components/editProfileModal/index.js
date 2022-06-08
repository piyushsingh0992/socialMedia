import React, { useState, useEffect } from "react";
import { getModalStyle, useStyles } from "./style.js";
import Modal from "@material-ui/core/Modal";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import SaveIcon from "@material-ui/icons/Save";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { editUserDetails } from "../../container/profileContainer/userSlice";
import { restAuthToken } from "../../container/loginContainer/authSlice";
import UploadImage from "../uploadImage";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function EditProfileModal() {
  const classes = useStyles();
  const [imgUploadText, imgUploadTextSetter] = useState({
    coverImage: "upload Cover Image",
    profileImage: "Upload profile Image",
  });
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  let user = useSelector((state) => state.user);
  useEffect(() => {
    if (user.status === "fullfilled") {
      restAuthToken(localStorage.getItem("userDetails")?.token);
      // toast.success(user.message);
      setOpen(false);
    } else if (user.status === "rejected") {
      toast.error(user.message);
    }
  }, [user]);

  useEffect(() => {
    let newUser = {
      coverImage: user.userDetails.coverImage,
      email: user.userDetails.email,
      profileImage: user.userDetails.profileImage,
      pronouns: user.userDetails.pronouns,
      sex: user.userDetails.sex,
      userName: user.userDetails.userName,
    };
    userDetailsSetter(newUser);
    return () => {
      userDetailsSetter(null);
    };
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [userDetails, userDetailsSetter] = useState(null);

  function handleImageUpload(event, name) {
    const reader = new FileReader();
    let file = event.target.files[0];
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = (x) => {
        if (reader.result) {
          imgUploadTextSetter((state) => {
            state[`${name}`] = "image Uploaded";

            return state;
          });
          userDetailsSetter((state) => {
            return {
              ...state,
              [name]: reader.result,
            };
          });
        }
      };
    }
  }

  const handleChange = (event) => {
    const name = event.target.name;

    if (name === "profileImage" || name === "coverImage") {
      handleImageUpload(event, name);
    } else {
      userDetailsSetter((state) => {
        return {
          ...state,
          [name]: event.target.value,
        };
      });
    }
  };

  return (
    <div>
      <EditOutlinedIcon onClick={handleOpen} className={classes.icon} />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {userDetails ? (
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
                <UploadImage
                  text={imgUploadText.profileImage}
                  changeHanlder={handleChange}
                  name="profileImage"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <UploadImage
                  text={imgUploadText.coverImage}
                  changeHanlder={handleChange}
                  name="coverImage"
                />
              </Grid>

              <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                startIcon={<SaveIcon />}
                onClick={() => {
                  dispatch(editUserDetails(userDetails));
                }}
              >
                {user.status === "loading" ? (
                  <CircularProgress size={28} color="white" />
                ) : (
                  "Save"
                )}
              </Button>
            </Grid>
          </div>
        ) : (
          <CircularProgress size={28} color="white" />
        )}
      </Modal>
    </div>
  );
}
