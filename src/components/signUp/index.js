import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import logo from "../../assets/logo.png";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    width: "100%",
    margin: "0.5rem 0",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    padding: "0.5rem 1.5rem",
    borderRadius: "5px",
    margin: "2rem 0",
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    margin: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp({
  currentUserSetter,
  signUpDetails,
  signUpDetailsSetter,
  signInDetailsSetter,
}) {
  const classes = useStyles();

  const handleChange = (event) => {
    const name = event.target.name;
    signUpDetailsSetter((state) => {
      return {
        ...state,
        [name]: event.target.value,
      };
    });
  };

  const settingSignupObject = () => {
    signInDetailsSetter({
      password: signUpDetails.password,
      email: signUpDetails.email,
    });
  };

  const successSignUp = () => {
    settingSignupObject();
    currentUserSetter((value) => !value);
    signUpDetailsSetter({
      userName: "",
      password: "",
      email: "",
      pronouns: "",
      sex: null,
    });
  };

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
            
          >
            Sign Up
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
                  sex: null,
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
