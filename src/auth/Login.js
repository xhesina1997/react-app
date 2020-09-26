import React, { Component } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/styles";

const styles = (theme) => ({
  root: {
    minWidth: 275,
    width: 700,
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
    let config = {
      headers: {
        "Content-Type": "application/json"
       
      },
    };
    let body = {
      username:username,
      password:password
    }
    axios
      .post(
        "localhost:8080/api/login",
        body,{ "Content-Type": "application/json"}
       
      )
      .then(function(response)  {
        
          console.log(response);
        
      })
      .catch((error) => {
        // console.log(body);
        console.log("login error", error);
      });
    event.preventDefault();
  }

  render() {
    const { username, password } = this.state;
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
                <Grid item xs={12}>
                  <TextField
                    style={{ padding: "10px", width: "40%" }}
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
                    style={{ padding: "10px", width: "40%" }}
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
          </div>
        </CardContent>
      </Card>
    );
  }
}
export default withStyles(styles)(Login);
