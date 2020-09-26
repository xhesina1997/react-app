import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Snackbar from '@material-ui/core/Snackbar';

class CreationForm extends React.Component {
  state = {
    mobile: '',
    tel: '',
    address: '',
    city: '',
    state: '',
    price: '',
    open: false,
    vertical: 'top',
    horizontal: 'center',
  };
  handleReset = () => {};
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    var existingEntries = JSON.parse(localStorage.getItem("tickets")) || [] ;
    existingEntries.push(this.state)
    localStorage.setItem("tickets",JSON.stringify(existingEntries));
    this.setState({ open: true, vertical:"bottom",horizontal:"right" });
   

  };
  _handleTextFieldChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
   handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {mobile,tel,address,city,state,price,open,vertical,horizontal} = this.state;
    return (
    <div> 
      <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              style={{ padding: "10px", width: "40%" }}
              id="standard-secondary"
              label="Mobile"
              name="mobile"
              value={mobile}
              onChange={this._handleTextFieldChange}
              color="secondary"
            />
            <TextField
              style={{ padding: "10px", width: "40%" }}
              id="standard-secondary"
              label="Tel"
              name="tel"
              value={tel}
              onChange={this._handleTextFieldChange}
              color="secondary"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              style={{ padding: "10px", width: "40%" }}
              id="standard-secondary"
              label="Address"
              name="address"
              value={address}
              onChange={this._handleTextFieldChange}
              color="secondary"
              
            />
            <TextField
              style={{ padding: "10px", width: "40%" }}
              id="standard-secondary"
              label="City"
              name="city"
              value={city}
              onChange={this._handleTextFieldChange}
              color="secondary"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              style={{ padding: "10px", width: "40%" }}
              id="standard-secondary"
              label="State"
              color="secondary"
              name="state"
              value={state}
              onChange={this._handleTextFieldChange}
            />
            <TextField
              style={{ padding: "10px", width: "40%" }}
              id="standard-secondary"
              label="Price"
              name="price"
              value={price}
              onChange={this._handleTextFieldChange}
              color="secondary"
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
        onClose={this.handleClose}
        message="Ticket created successfully"
        key={vertical + horizontal}
      />
      </div>
    );
  }
}
export default CreationForm;
