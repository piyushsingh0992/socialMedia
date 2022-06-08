import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./style.js";
import Container from "@material-ui/core/Container";
import logo from "../../assets/logo.png";

import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  signInFunction,
  resetauthSlice,
} from "../../container/loginContainer/authSlice";

export default function SignIn({
  currentUserSetter,
  signInDetails,
  signInDetailsSetter,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  const handleChange = (event) => {
    const name = event.target.name;
    signInDetailsSetter((state) => {
      return {
        ...state,
        [name]: event.target.value,
      };
    });
  };

  useEffect(() => {
    if (user.status === "rejected") {
      toast.error(user.message);
    }
  }, [user]);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <img src={logo} />
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoFocus
            value={signInDetails.email}
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
            value={signInDetails.password}
            onChange={handleChange}
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => {
              dispatch(signInFunction(signInDetails));
            }}
          >
            {user.status === "loading" ? (
              <CircularProgress size={28} color="white" />
            ) : (
              "Sign In"
            )}
          </Button>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => {
              signInDetailsSetter({
                email: "piyush1997@gmail.com",
                password: "piyush@1997",
              });
              dispatch(
                signInFunction({
                  email: "piyush1997@gmail.com",
                  password: "piyush@1997",
                })
              );
            }}
          >
            {user.status === "loading" ? (
              <CircularProgress size={28} color="white" />
            ) : (
              "Sign In As Guest"
            )}
          </Button>
          <Grid container alignItems="center" justify="center">
            <Grid
              item
              xs={8}
              onClick={() => {
                currentUserSetter((value) => {
                  return !value;
                });

                signInDetailsSetter({
                  password: "",
                  email: "",
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
                Don't have an account? Sign Up
              </Typography>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
