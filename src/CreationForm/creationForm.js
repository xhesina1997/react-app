import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Autocomplete from "@material-ui/lab/Autocomplete";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from "axios";
import { withRouter } from 'react-router-dom';

class CreationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: "",
      lastname: "",
      mobile: "",
      comment: "",
      address: "",
      city: {},
      state: "Albania",
      fee: "",
      currency:{
        currency:""
      },
      open: false,
      vertical: "top",
      horizontal: "center",
      cities: [],
      currencies: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this._handleTextFieldChange = this._handleTextFieldChange.bind(this);
  }
  componentDidMount() {
    axios
      .get("/city")
      .then((response) => {
        console.log(response);
        this.setState({ cities: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("/currency")
      .then((response) => {
        this.setState({ currencies: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  handleReset = () => {};
  handleSubmit(event) {
    const {
      firstname,
      lastname,
      mobile,
      comment,
      address,
      city,
      state,
      fee,
      currency
    } = this.state;
    let body = {
      firstName: firstname,
      lastName: lastname,
      mobile: mobile,
      comment: comment,
      address: address,
      city: city,
      state: state,
      fee: fee,
      currency:currency
    };
    axios
      .post("/ticket", body, { "Content-Type": "application/json" })
      .then((response) => {
       
        this.setState({ open: true, vertical: "bottom", horizontal: "center" });
        window.location.reload();
      })
      .catch((error) => {
        console.log("login error", error);
      });

    event.preventDefault();
  }
  _handleTextFieldChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleChange = (event) => {
    console.log(event);
  };
  setValue = (newValue) => {
    this.setState({ city: newValue });
  };
   handleChange = (event) => {
    console.log(event);
    this.setState({currency:event.target.value})
    
  };
  render() {
    const {
      firstname,
      lastname,
      mobile,
      comment,
      address,
      city,
      state,
      fee,
      currency,
      open,
      vertical,
      horizontal,
    } = this.state;

    return (
      <div style={{marginBottom:"100px"}}>
        <h3>Create new ticket</h3>
        <form autoComplete="off" onSubmit={this.handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <TextField
                style={{ padding: "10px", width: "95%" }}
                id="standard-secondary"
                label="First name"
                name="firstname"
                value={firstname}
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
                name="lastname"
                value={lastname}
                onChange={this._handleTextFieldChange}
                color="secondary"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                style={{ padding: "10px", width: "95%" }}
                id="standard-secondary"
                type="tel"
                label="Mobile"
                name="mobile"
                value={mobile}
                onChange={this._handleTextFieldChange}
                color="secondary"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                style={{ padding: "10px", width: "95%" }}
                id="standard-secondary"
                label="Comment"
                name="comment"
                value={comment}
                onChange={this._handleTextFieldChange}
                color="secondary"
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
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                style={{ padding: "10px", width: "95%" }}
                id="combo-box-demo"
                options={this.state.cities}
                getOptionLabel={(option) => option.city}
                getOptionSelected={(option, value) =>
                  option.city === value.city
                }
                onChange={(event, newValue) => {
                  this.setValue(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="City"
                    value={city}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled
                style={{ padding: "10px", width: "95%" }}
                id="standard-secondary"
                label="State"
                color="secondary"
                name="state"
                value={state}
                onChange={this._handleTextFieldChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                style={{ padding: "10px", width: "95%" }}
                id="standard-secondary"
                type="number"
                label="Fee"
                name="fee"
                value={fee}
                onChange={this._handleTextFieldChange}
                color="secondary"
                required
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <FormControl  style={{ padding: "10px", width: "95%" }}>
                <InputLabel id="demo-simple-select-label">Currency</InputLabel>
                <Select
                  id="demo-simple-select"
                  value={currency}
                  onChange={this.handleChange}
                >
                  {this.state.currencies.map((currency) => (
                    <MenuItem key={currency.id} value={currency}>{currency.currency}</MenuItem>
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
          message="Ticket created successfully"
          key={vertical + horizontal}
        />
      </div>
    );
  }
}
export default withRouter (CreationForm);
