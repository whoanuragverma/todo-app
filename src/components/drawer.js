import React from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Add, Delete, Info } from "@material-ui/icons";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange } from "@material-ui/core/colors";
import Divider from "@material-ui/core/Divider";
const useStyles = (theme) => ({
  avatarStyle: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[400],
  },
  button: {
    color: "#ffffff",
  },
  dividerLight: {
    backgroundColor: "#ffffff94",
  },
});
class DrawerItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: null,
    };
  }
  componentWillMount() {
    if (!localStorage.getItem("userName")) {
      this.setState({
        userName: "Smelly Cat",
      });
    } else {
      this.setState({
        userName: localStorage.getItem("userName"),
      });
    }
  }
  render() {
    return (
      <List component="nav" aria-label="new about info">
        <ListItem>
          <ListItemIcon>
            <Avatar className={this.props.classes.avatarStyle}>
              {this.state.userName[0]}
            </Avatar>
          </ListItemIcon>
          <ListItemText primary={this.state.userName} />
        </ListItem>
        <Divider classes={{ root: this.props.classes.dividerLight }} />
        <ListItem button>
          <ListItemIcon>
            <Add className={this.props.classes.button} />
          </ListItemIcon>
          <ListItemText primary="Add New" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Delete className={this.props.classes.button} />
          </ListItemIcon>
          <ListItemText primary="Delete All" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Info className={this.props.classes.button} />
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>
      </List>
    );
  }
}

export default withStyles(useStyles)(DrawerItems);
