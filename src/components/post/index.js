import React from "react";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import Grid from "@material-ui/core/Grid";
import logo from "../../assets/logo.png";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { useStyles } from "./style.js";
import InputBase from "@material-ui/core/InputBase";

export default function Post() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    console.log({ expanded });

    setExpanded((value) => !value);
  };
  let x = false;

  const [anchorEl, setAnchorEl] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        title="user Name"
        subheader="September 14, 2016"
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar} src={logo} />
        }
        action={
          <div>
            <IconButton aria-label="settings" onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
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
          </div>
        }
      />
      <CardMedia className={classes.media} image={logo} title="Paella dish" />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Typography color="textSecondary" variant="p">
            5 &nbsp;
          </Typography>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share" onClick={handleExpandClick}>
          <Typography color="textSecondary" variant="p">
            5 &nbsp;
          </Typography>
          <ChatBubbleOutlineOutlinedIcon
            aria-expanded={expanded}
            aria-label="show more"
          />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Grid container>
            <Grid
              container
              wrap="nowrap"
              spacing={2}
              style={{ margin: "0.5rem 0" }}
            >
              <Grid item>
                <Avatar>W</Avatar>
              </Grid>
              <Grid item xs>
                <Typography>
                  Heat 1/2 cup of the broth in a pot until simmering, add
                  saffron and set aside for 10 minutes.
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              wrap="nowrap"
              spacing={2}
              style={{ margin: "0.5rem 0" }}
            >
              <Grid item>
                <Avatar>W</Avatar>
              </Grid>
              <Grid item xs>
                <Typography>
                  Heat 1/2 cup of the broth in a pot until simmering, add
                  saffron and set aside for 10 minutes.
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              wrap="nowrap"
              spacing={2}
              style={{ margin: "0.5rem 0" }}
            >
              <Grid item>
                <Avatar>W</Avatar>
              </Grid>
              <Grid item xs>
                <Typography>
                  Heat 1/2 cup of the broth in a pot until simmering, add
                  saffron and set aside for 10 minutes.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
      <CardContent>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar>W</Avatar>
          </Grid>
          <Grid item xs>
            <InputBase
              placeholder="Add a comment"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => {
                console.log(e.target.value);
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
