import React from "react";
import localforage from "localforage";
import Card from "@material-ui/core/Card";
import CardContnet from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import CheckBox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Toc, Alarm, CalendarToday } from "@material-ui/icons";
const useStyles = (theme) => ({
  cardRoot: {
    width: "90%",
    backgroundColor: "#2e2e2e",
    margin: "auto",
    marginTop: 6,
    marginBottom: 6,
    color: "#ffffff",
    [theme.breakpoints.up("sm")]: {
      width: "50%",
    },
  },

  rootLabel: {
    fontSize: 20,
    fontWeight: 700,
  },
  icon: {
    fontSize: 20,
    marginRight: 8,
    position: "relative",
    top: 5,
  },
});
class ShowItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keys: [],
      result: [],
    };
    this.handleClick = this.handleClick.bind(this);
  }
  async handleClick({ target }) {
    await localforage.getItem(target.name).then((res) => {
      if (res.open === true) res.open = false;
      else res.open = true;
      localforage.setItem(target.name, res);
    });
    window.location.reload();
  }
  async componentWillMount() {
    await localforage.keys().then((res) => {
      this.setState({ keys: res });
    });
    for (let i = 0; i < this.state.keys.length; i++) {
      await localforage.getItem(this.state.keys[i]).then((res) => {
        this.setState({
          result: this.state.result.concat(res),
        });
      });
    }
  }
  render() {
    return (
      <React.Fragment>
        {this.state.result.map((el) => {
          return (
            <div id={"open-" + el.open}>
              <Card
                key={el.epochTime}
                className={this.props.classes.cardRoot}
                id={el.open}
              >
                <CardContnet>
                  <FormControlLabel
                    classes={{ label: this.props.classes.rootLabel }}
                    control={<CheckBox />}
                    label={el.title}
                    name={el.epochTime}
                    onClick={this.handleClick}
                  />
                  <Typography
                    variant="body2"
                    component="p"
                    className={"no" + el.description}
                  >
                    <Toc className={this.props.classes.icon} />
                    {el.description}
                  </Typography>
                  <Typography
                    variant="body2"
                    component="p"
                    className={el.dueDate}
                  >
                    <CalendarToday className={this.props.classes.icon} />
                    {el.dueDateValue}
                  </Typography>
                  <Typography
                    variant="body2"
                    component="p"
                    className={el.dueTime}
                  >
                    <Alarm className={this.props.classes.icon} />
                    {el.dueTimeValue}
                  </Typography>
                </CardContnet>
              </Card>
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(ShowItem);
