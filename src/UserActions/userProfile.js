import React, { Component } from "react";
import Wrapper from "../Wrapper";
import PersonIcon from "@material-ui/icons/Person";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import ClearIcon from '@material-ui/icons/Clear';
import Fab from "@material-ui/core/Fab";
import axios from "axios";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      oldPassword: "",
      newPassWord: "",
      confirmPassword: "",
      changePassword: false,
      open: false,
      vertical: "top",
      horizontal: "center",
      message: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this._handleTextFieldChange = this._handleTextFieldChange.bind(this);
  }
  changePassword = () => {
    this.setState({ changePassword: true });
  };
  _handleTextFieldChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit(event) {
    const { oldPassword, newPassWord, confirmPassword } = this.state;
    if (newPassWord === confirmPassword) {
    
      var formData = new FormData();
      formData.append("oldPassword", oldPassword);
      formData.append("newPassword", confirmPassword);
      axios
        .post("/user/updatePassword", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          localStorage["token"] = response.config.headers.Authorization;
          this.setState({
            open: true,
            vertical: "bottom",
            horizontal: "center",
            message: "Password changed successfully!",
          });
          this.setState({ changePassword: false });
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            open: true,
            vertical: "bottom",
            horizontal: "center",
            message: "Old password is incorrect!",
          });
        });
    } else {
      this.setState({
        open: true,
        vertical: "bottom",
        horizontal: "center",
        message: "Passwords dont match!",
      });
    }
    event.preventDefault();
  }
  componentDidMount() {
    let query = localStorage.getItem("user");
    axios
      .get("/user", {
        params: {
          username: query,
        },
      })
      .then((response) => {
        console.log(response.data);
        this.setState({ user: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    const {
      user,
      oldPassword,
      newPassWord,
      confirmPassword,
      open,
      vertical,
      horizontal,
      message,
    } = this.state;
    return (
      <div>
        <Wrapper>
          {this.state.changePassword ? (
            <div>
              <h3>Change password</h3>
              <Fab
                style={{ float: "right" }}
                color="secondary"
                aria-label="add"
                onClick={() => {
                  this.setState({ changePassword: !this.state.changePassword });
                }}
              >
                <ClearIcon />
              </Fab>
              <form autoComplete="off" onSubmit={this.handleSubmit} style={{marginBottom:"100px"}}>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      style={{ padding: "10px", width: "95%" }}
                      type="password"
                      id="standard-secondary"
                      label="Old password"
                      name="oldPassword"
                      value={oldPassword}
                      onChange={this._handleTextFieldChange}
                      color="secondary"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      style={{ padding: "10px", width: "95%" }}
                      type="password"
                      id="standard-secondary"
                      label="New password"
                      name="newPassWord"
                      value={newPassWord}
                      onChange={this._handleTextFieldChange}
                      color="secondary"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      style={{ padding: "10px", width: "95%" }}
                      type="password"
                      id="standard-secondary"
                      label="Confirm password"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={this._handleTextFieldChange}
                      color="secondary"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" color="secondary" type="submit">
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
              <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                message={message}
                key={vertical + horizontal}
              />
            </div>
          ) : (
            <div style={{marginBottom:"100px"}}>
              <Button
                variant="contained"
                style={{ float: "right" }}
                color="secondary"
                onClick={this.changePassword}
              >
                Change password
              </Button>
              <h3> My profile </h3>
              <div style={{ textAlign: "center" }}>
                <PersonIcon
                  style={{
                    fontSize: "150px",
                    color: "#e2e0e0",
                    margin: "auto",
                  }}
                />
              </div>
              <div style={{ textAlign: "left", marginLeft: "80px" }}>
                <div style={{ margin: "auto", padding: "29px" }}>
                  <span style={{ fontWeight: "bold" }}>First name: </span>{" "}
                  <span style={{ paddingLeft: "20px" }}>{user.firstName}</span>{" "}
                </div>{" "}
                <Divider light />
                <div style={{ margin: "auto", padding: "29px" }}>
                  <span style={{ fontWeight: "bold" }}>Last name:</span>{" "}
                  <span style={{ paddingLeft: "20px" }}> {user.lastName}</span>
                </div>{" "}
                <Divider light />
                <div style={{ margin: "auto", padding: "29px" }}>
                  <span style={{ fontWeight: "bold" }}>Username:</span>{" "}
                  <span style={{ paddingLeft: "20px" }}>{user.username}</span>
                </div>{" "}
                <Divider light />
                <div style={{ margin: "auto", padding: "29px" }}>
                  <span style={{ fontWeight: "bold" }}>Email:</span>{" "}
                  <span style={{ paddingLeft: "20px" }}>{user.email}</span>
                </div>{" "}
                <Divider light />
                <div style={{ margin: "auto", padding: "29px" }}>
                  <span style={{ fontWeight: "bold" }}>Address: </span>{" "}
                  <span style={{ paddingLeft: "20px" }}>{user.address}</span>
                </div>{" "}
                <Divider light />
                <div style={{ margin: "auto", padding: "29px" }}>
                  <span style={{ fontWeight: "bold" }}>Phone: </span>{" "}
                  <span style={{ paddingLeft: "20px" }}>{user.phone}</span>
                </div>{" "}
                <Divider light />
                <div style={{ margin: "auto", padding: "29px" }}>
                  <span style={{ fontWeight: "bold" }}> Created date: </span>{" "}
                  <span style={{ paddingLeft: "20px" }}>
                    {" "}
                    {new Date(user.date).toLocaleDateString("en-US")}{" "}
                    {new Date(user.date).toLocaleTimeString("en-US")}{" "}
                  </span>
                </div>{" "}
                <Divider light />
                <div style={{ margin: "auto", padding: "29px" }}>
                  <span style={{ fontWeight: "bold" }}>Authorities:</span>
                  {user?.authorities?.map((auth) => (
                    <span key={auth.id} style={{ paddingLeft: "20px" }}>
                      <Chip
                        color="primary"
                        label={auth.authority}
                        style={{ marginLeft: "10px" }}
                        variant="default"
                      />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Wrapper>
      </div>
    );
  }
}

export default UserProfile;
