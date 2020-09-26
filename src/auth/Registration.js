import React, { Component } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import { withStyles } from '@material-ui/styles';
const styles = theme =>({
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
class Registration extends Component {
    redirectToLogin = () => {
        this.props.history.push('/login');
    }
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      userName: "",
      address: "",
      phone: "",
      email: "",
      password: "",
      password_confirmation: "",
      registrationErrors: "",
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
    const {
      firstName,
      lastName,
      userName,
      address,
      phone,
      email,
      password,
      password_confirmation,
    } = this.state;
    console.log(this.state);
    axios
      .post(
        "https://courier-tracker-server.herokuapp.com/api/user/create",
        {
          user: {
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            address: address,
            phone: phone,
            email: email,
            password: password,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.status === "created") {
          this.props.handleSuccessfulAuth(response.data);
        }
      })
      .catch((error) => {
        console.log("registration error", error);
      });
    event.preventDefault();
  }

  render() {
    const {
      firstName,
      lastName,
      userName,
      address,
      phone,
      email,
      password,
    } = this.state;
    const { classes } = this.props;
    return (
      <Card
        variant="outlined"
        className={classes.root}
        
      >
        <CardContent>
          <div>
            <p style={{ fontSize: "22px" }}>Register</p>
            <p style={{ fontSize: "15px", color: "#bb91fd" }}>
              Please fill the information below!
            </p>
            <Divider />
            <form onSubmit={this.handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    style={{ padding: "10px", width: "40%" }}
                    id="standard-secondary"
                    name="firstName"
                    value={firstName}
                    onChange={this.handleChange}
                    color="secondary"
                    label="First Name"
                    required
                  />
                  <TextField
                    style={{ padding: "10px", width: "40%" }}
                    id="standard-secondary"
                    name="lastName"
                    value={lastName}
                    onChange={this.handleChange}
                    color="secondary"
                    label="Last Name"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    style={{ padding: "10px", width: "40%" }}
                    id="standard-secondary"
                    type="email"
                    name="email"
                    value={email}
                    onChange={this.handleChange}
                    color="secondary"
                    label="Email"
                    required
                  />
                  <TextField
                    style={{ padding: "10px", width: "40%" }}
                    id="standard-secondary"
                    type="number"
                    name="phone"
                    value={phone}
                    onChange={this.handleChange}
                    color="secondary"
                    label="Phone"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    style={{ padding: "10px", width: "40%" }}
                    id="standard-secondary"
                    name="userName"
                    value={userName}
                    onChange={this.handleChange}
                    color="secondary"
                    label="UserName"
                    required
                  />
                  <TextField
                    style={{ padding: "10px", width: "40%" }}
                    id="standard-secondary"
                    name="address"
                    value={address}
                    onChange={this.handleChange}
                    color="secondary"
                    label="Address"
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
                  {/* <TextField
                style={{ padding: "10px", width: "40%" }}
                id="standard-secondary"
                type="password"
                name="password_confirmation"
                value={password_confirmation}
                onChange={this.handleChange}
                color="secondary"
                label="Password Confirmation"
                required
              /> */}
                </Grid>
              </Grid>

              <Grid item xs={12} style={{ paddingTop: "30px" }}>
                <Button variant="contained" color="secondary" type="submit">
                  Register
                </Button>
              </Grid>
            </form>
          </div>
        </CardContent>
      </Card>
    );
  }
}


export default withStyles(styles)(Registration);
