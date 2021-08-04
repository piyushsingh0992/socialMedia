import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { toast } from "react-toastify";

import Container from "@material-ui/core/Container";
import logo from "../../assets/logo.png";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useStyles } from "./style.js";
import { check, successSignUp } from "./common.js";

import { useSelector, useDispatch } from "react-redux";

import {
  signUpFunction,
} from "../../container/loginContainer/authSlice";
export default function SignUp({
  currentUserSetter,
  signUpDetails,
  signUpDetailsSetter,
  signInDetailsSetter,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [loader, loaderSetter] = useState(false);
  const handleChange = (event) => {
    const name = event.target.name;
    signUpDetailsSetter((state) => {
      return {
        ...state,
        [name]: event.target.value,
      };
    });
  };

  const successSignUpProps = {
    signUpDetails,
    signUpDetailsSetter,
    signInDetailsSetter,
    currentUserSetter,
    toast,
  };
  useEffect(() => {
    if (loader) {
      if (auth.status === "fullfilled") {
        successSignUp(successSignUpProps, auth.message);
        loaderSetter(false);
      } else if (auth.status === "rejected") {
        toast.error(auth.message);
        loaderSetter(false);
      }
    }
  }, [auth.status]);

  async function submitHandler() {
    if (check(signUpDetails)) {
      toast.error("please fill in all the details");
      return;
    }

    dispatch(signUpFunction(signUpDetails));
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <img src={logo} />
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>

        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            value={signUpDetails.name}
            name="userName"
            autoFocus
            onChange={handleChange}
          />
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
              value={signUpDetails.pronouns}
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
              value={signUpDetails.sex}
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoFocus
            value={signUpDetails.email}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={signUpDetails.password}
            onChange={handleChange}
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => {
              loaderSetter(true);
              submitHandler();
            }}
          >
            {loader ? "loading..." : "Sign Up"}
          </Button>
          <Grid container alignItems="center" justify="center">
            <Grid
              item
              xs={8}
              onClick={() => {
                currentUserSetter((value) => !value);
                signUpDetailsSetter({
                  userName: "",
                  password: "",
                  email: "",
                  pronouns: "",
                  sex: "",
                });
              }}
            >
              <Typography
                component="p"
                color="primary"
                variant="p"
                style={{
                  cursor: "pointer",
                }}
              >
                Already have an account? Sign In
              </Typography>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
