import React, { Component } from "react";
import Wrapper from "../Wrapper";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
import axios from "axios";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import ListItemText from "@material-ui/core/ListItemText";
import Input from "@material-ui/core/Input";
import UserListings from "./userListings";

class Users extends Component {
  state = {
    creationForm: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      address: "",
      phone: "",
      authorities: [],
      authorityNames: [],
      open: false,
      vertical: "top",
      horizontal: "center",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this._handleTextFieldChange = this._handleTextFieldChange.bind(this);
  }
  componentDidMount() {
    axios
      .get("/authority")
      .then((response) => {
        this.setState({ authorityNames: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
      
  }
  _handleTextFieldChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleChange = (event) => {
    this.setState({ authorities: event.target.value });
  };
  handleSubmit(event) {
    const {
      firstName,
      lastName,
      username,
      email,
      address,
      phone,
      authorities,
    } = this.state;
    let body = {
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      address: address,
      phone: phone,
      authority: authorities
    };
    axios
      .post("/user/create", body, { "Content-Type": "application/json" })
      .then((response) => {
        this.setState({ open: true, vertical: "bottom", horizontal: "center" });
        window.location.reload();
      })
      .catch((error) => {
        console.log("login error", error);
      });

    event.preventDefault();
  }
  render() {
    const {
      firstName,
      lastName,
      username,
      email,
      address,
      phone,
      authorities,
      open,
      vertical,
      horizontal,
    } = this.state;
    return (
      <div>
        <Wrapper>
          <Fab
            style={{ float: "right" }}
            color="secondary"
            aria-label="add"
            onClick={() => {
              this.setState({ creationForm: !this.state.creationForm });
            }}
          >
            {!this.state.creationForm ? <AddIcon /> : <ClearIcon />}
          </Fab>
          {this.state.creationForm ? (
            <div>
              <h3> Create new user </h3>
              <form autoComplete="off" onSubmit={this.handleSubmit}>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      style={{ padding: "10px", width: "95%" }}
                      id="standard-secondary"
                      label="First name"
                      name="firstName"
                      value={firstName}
                      onChange={this._handleTextFieldChange}
                      color="secondary"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      style={{ padding: "10px", width: "95%" }}
                      id="standard-secondary"
                      label="Last name"
                      name="lastName"
                      value={lastName}
                      onChange={this._handleTextFieldChange}
                      color="secondary"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      style={{ padding: "10px", width: "95%" }}
                      id="standard-secondary"
                      label="Username"
                      name="username"
                      value={username}
                      onChange={this._handleTextFieldChange}
                      color="secondary"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      style={{ padding: "10px", width: "95%" }}
                      type="email"
                      id="standard-secondary"
                      label="Email"
                      name="email"
                      value={email}
                      onChange={this._handleTextFieldChange}
                      color="secondary"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      style={{ padding: "10px", width: "95%" }}
                      id="standard-secondary"
                      label="Address"
                      name="address"
                      value={address}
                      onChange={this._handleTextFieldChange}
                      color="secondary"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      style={{ padding: "10px", width: "95%" }}
                      type="number"
                      id="standard-secondary"
                      label="Phone"
                      name="phone"
                      value={phone}
                      onChange={this._handleTextFieldChange}
                      color="secondary"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl style={{ padding: "10px", width: "95%" }}>
                      <InputLabel id="demo-mutiple-checkbox-label">
                        Authorities
                      </InputLabel>
                      <Select
                        labelId="demo-mutiple-checkbox-label"
                        id="demo-mutiple-checkbox"
                        multiple
                        value={authorities}
                        onChange={this.handleChange}
                        input={<Input />}
                        renderValue={(selected) => {
                          let strArr = selected.map(s => s.authority);
                          return  strArr.join(", ")
                        }}>
                        {this.state.authorityNames.map((name) => (
                          <MenuItem key={name.id} value={name}>
                            <Checkbox
                              checked={authorities.indexOf(name) > -1}
                            />
                            <ListItemText primary={name.authority} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
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
                message="User created successfully"
                key={vertical + horizontal}
              />
            </div>
          ) : (
            <UserListings/>
          )}
        </Wrapper>
      </div>
    );
  }
}

export default Users;
