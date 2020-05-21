import React, { Component } from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { withStyles, fade } from "@material-ui/core/styles";
import { Menu, Search } from "@material-ui/icons";
import InputBase from "@material-ui/core/InputBase";
import SwipableDrawer from "@material-ui/core/SwipeableDrawer";
import DrawerItems from "../components/drawer";

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
    margin: 0,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: "#272727",
    paddingBottom: 8,
    [theme.breakpoints.up("sm")]: {
      paddingBottom: 0,
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    width: "90%",
    marginLeft: "5%",
    [theme.breakpoints.up("sm")]: {
      position: "absolute",
      marginLeft: theme.spacing(1),
      width: "28%",
      top: 14,
      right: 10,
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  drawerItems: {
    backgroundColor: "#353535",
    color: "#ffffff",
    width: 300,
    paddingTop: theme.spacing(1),
  },
});

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchor: false,
    };
    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
  }

  openDrawer() {
    this.setState({ anchor: true });
  }

  closeDrawer() {
    this.setState({ anchor: false });
  }
  render() {
    return (
      <AppBar
        position="static"
        className={this.props.classes.appBar}
        elevation="4"
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={this.props.classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={this.openDrawer}
          >
            <Menu />
          </IconButton>
          <SwipableDrawer
            open={this.state.anchor}
            onClose={this.closeDrawer}
            classes={{ paper: this.props.classes.drawerItems }}
          >
            <DrawerItems />
          </SwipableDrawer>
          <Typography variant="h6" className={this.props.classes.title}>
            Todos
          </Typography>
        </Toolbar>
        <div className={this.props.classes.search}>
          <div className={this.props.classes.searchIcon}>
            <Search />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: this.props.classes.inputRoot,
              input: this.props.classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
          />
        </div>
      </AppBar>
    );
  }
}

export default withStyles(useStyles)(NavBar);
