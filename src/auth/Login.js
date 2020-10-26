import React, { Component } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/styles";
import Snackbar from "@material-ui/core/Snackbar";

const styles = (theme) => ({
  root: {
    maxWidth: 500,
    width: '90%',
    margin: "100px auto",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

class Login extends Component {
  redirectToRegister = () => {
    this.props.history.push("/register");
  };

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      open: false,
      vertical: "top",
      horizontal: "center",
      message:""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    const { username, password } = this.state;
    let body = {
      username: username,
      password: password,
    };
    axios
      .post("/login", body, { "Content-Type": "application/json" })
      .then((response) => {
        let accessToken = response.headers.authorization;
        let username = JSON.parse(response.config.data).username
        localStorage.setItem("token", accessToken);
        localStorage.setItem("user", username);
        this.setState({ open: true, vertical: "top", horizontal: "right",message:"Loged in successfully" });
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log("login error", error);
        this.setState({ open: true, vertical: "top", horizontal: "right",message:"Username or password is incorrect!" });
      });
    event.preventDefault();
  }
  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { username, password, open, vertical, horizontal,message } = this.state;
    const { classes } = this.props;
    return (
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <div style={{ display: "inline" }}>
            <p style={{ fontSize: "22px" }}>Log in</p>
            <div
              style={{ color: "#bb91fd", cursor: "pointer" }}
              onClick={this.redirectToRegister}
            >
              Register
            </div>
            <Divider />
            <form onSubmit={this.handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} style={{marginTop: '30px'}}>
                  <TextField
                    style={{ padding: "10px", width: "90%" }}
                    id="standard-secondary"
                    name="username"
                    value={username}
                    onChange={this.handleChange}
                    color="secondary"
                    label="username"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    style={{ padding: "10px", width: "90%" }}
                    id="standard-secondary"
                    type="password"
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                    color="secondary"
                    label="Password"
                    required
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} style={{ paddingTop: "30px" }}>
                <Button variant="contained" color="secondary" type="submit">
                  Login
                </Button>
              </Grid>
            </form>
            <Snackbar
              anchorOrigin={{ vertical, horizontal }}
              open={open}
              onClose={this.handleClose}
              message={message}
              key={vertical + horizontal}
            />
          </div>
        </CardContent>
      </Card>
    );
  }
}
export default withStyles(styles)(Login);
