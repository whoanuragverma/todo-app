import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { deepOrange } from "@material-ui/core/colors";
const useStyles = (theme) => ({
  dialog: {
    backgroundColor: "#383838",
    color: "#ffffff",
  },

  input: {
    "&::placeholder": {
      color: "#ffffff",
    },
    color: "#ffffff",
  },
  label: {
    "&$erroredLabel": {
      color: deepOrange[300],
    },
  },
  focusedLabel: {},
  erroredLabel: {},
  underline: {
    "&$error:after": {
      borderBottomColor: deepOrange[300],
    },
  },
  error: {},
  button: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    "&:hover": {
      backgroundColor: deepOrange[700],
    },
  },
});
class UserDialog extends React.Component {
  constructor() {
    super();
    this.state = {
      open: null,
      userName: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }
  componentWillMount() {
    if (!localStorage.getItem("userName")) {
      this.setState({
        open: true,
      });
    }
  }
  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }
  formSubmit() {
    localStorage.setItem("userName", this.state.userName);
    this.setState({
      open: false,
    });
  }
  render() {
    return (
      <Dialog
        open={this.state.open}
        classes={{ paper: this.props.classes.dialog }}
      >
        <DialogTitle>Hello</DialogTitle>
        <DialogContent>
          <DialogContentText classes={{ root: this.props.classes.dialog }}>
            To personalize your experince on the app, we need to know you name.
          </DialogContentText>
          <TextField
            label="Enter your name"
            type="text"
            name="userName"
            margin="dense"
            error={{}}
            onChange={this.handleChange}
            fullWidth
            autoFocus
            InputLabelProps={{
              classes: {
                root: this.props.classes.label,
                focused: this.props.classes.focusedLabel,
                error: this.props.classes.erroredLabel,
              },
            }}
            InputProps={{
              classes: {
                input: this.props.classes.input,
                root: this.props.classes.underline,
                error: this.props.classes.error,
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            className={this.props.classes.button}
            color={deepOrange[500]}
            onClick={this.formSubmit}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(useStyles)(UserDialog);
