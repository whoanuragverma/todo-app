import React from "react";
import Fab from "@material-ui/core/Fab";
import { Add } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import { deepOrange } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Divider from "@material-ui/core/Divider";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import { TextField } from "@material-ui/core";
import CheckBox from "@material-ui/core/Checkbox";
const useStyle = (theme) => ({
  root: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  },
  button: {
    position: "fixed",
    bottom: 20,
    right: 20,
  },
  colorButton: {
    backgroundColor: deepOrange[400],
    "&:hover": {
      backgroundColor: deepOrange[700],
    },
  },
  buttonOutlined: {
    borderColor: deepOrange[600],
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#ffccbc332",
    },
  },
  dividerLight: {
    backgroundColor: "#ffffff94",
  },
  dialogWidth: {
    width: "100%",
    backgroundColor: "#383838",
    color: "#ffffff",
    margin: 0,
    height: "auto",
    maxHeight: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "80%",
      margin: 32,
      maxHeight: "calc(100% - 64px)",
      height: "auto",
    },
  },
  textField: {
    "&::placeholder": {
      color: "#ffffff",
      fontWeight: "300",
    },
    color: "#ffffff",
    fontWeight: "300",
  },
});
class AddItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      title: null,
      description: null,
      error: false,
      errorHelper: null,
      dueDate: "hidden",
      dueDateValue: null,
    };
    this.addNew = this.addNew.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.hasDueDate = this.hasDueDate.bind(this);
  }
  componentWillMount() {
    let dd = new Date().getDate();
    let mm = new Date().getMonth();
    let yy = new Date().getFullYear();
    if (mm < 10) mm = "0" + mm;
    if (dd < 10) dd = "0" + dd;
    const str = yy + "-" + mm + "-" + dd;
    this.setState({
      dueDateValue: str,
    });
  }
  addNew() {
    this.setState({
      open: true,
    });
  }
  hasDueDate() {
    if (this.state.dueDate === "hidden") {
      this.setState({
        dueDate: "date",
      });
    } else {
      this.setState({
        dueDate: "hidden",
      });
    }
  }
  handleSubmit() {
    if (
      this.state.title === null ||
      this.state.title === "" ||
      this.state.title === " "
    ) {
      this.setState({
        error: true,
        errorHelper: "Title is required!",
      });
    } else {
      alert("Save to DB not yet available.");
      console.log(this.state);
      this.closeDialog();
    }
  }
  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }
  closeDialog() {
    this.setState({
      open: false,
      error: false,
      errorHelper: null,
      title: null,
      description: null,
      dueDate: "hidden",
    });
  }
  render() {
    return (
      <React.Fragment>
        <Fab
          color="primary"
          className={this.props.classes.button}
          classes={{ primary: this.props.classes.colorButton }}
          onClick={this.addNew}
        >
          <Add />
        </Fab>
        <Dialog
          maxWidth="sm"
          open={this.state.open}
          classes={{ paper: this.props.classes.dialogWidth }}
        >
          <DialogTitle>Add a Todo</DialogTitle>
          <Divider classes={{ root: this.props.classes.dividerLight }} />
          <DialogContent>
            <DialogContentText>
              <TextField
                variant="outlined"
                placeholder="Title"
                fullWidth
                size="small"
                name="title"
                error={this.state.error}
                helperText={this.state.errorHelper}
                onChange={this.handleChange}
                className={this.props.classes.root}
                InputProps={{
                  classes: {
                    input: this.props.classes.textField,
                    root: this.props.classes.underline,
                  },
                }}
              />
              <TextField
                variant="outlined"
                name="description"
                placeholder="Add a description.."
                fullWidth
                size="small"
                onChange={this.handleChange}
                multiline
                className={this.props.classes.root}
                InputProps={{
                  classes: {
                    input: this.props.classes.textField,
                  },
                }}
              />
              <CheckBox
                checked={this.state.checked}
                style={{ color: deepOrange[400] }}
                onClick={this.hasDueDate}
              />
              <span style={{ color: "#ffffff" }}>Add due date</span>
              <TextField
                type={this.state.dueDate}
                variant="outlined"
                name="dueDateValue"
                className={this.props.classes.root}
                fullWidth
                onChange={this.handleChange}
                defaultValue={this.state.dueDateValue}
                InputProps={{
                  classes: {
                    input: this.props.classes.textField,
                  },
                }}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              className={this.props.classes.buttonOutlined}
              onClick={this.closeDialog}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={this.props.classes.colorButton}
              onClick={this.handleSubmit}
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default withStyles(useStyle)(AddItem);
