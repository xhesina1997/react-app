import React, { Component } from "react";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/styles";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const styles = (theme) => ({
  table: {
    minWidth: 650,
  },
});
class UserListings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      searchValue: "",
    };
    this._handleTextFieldChange = this._handleTextFieldChange.bind(this);
  }
  _handleTextFieldChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  componentDidMount() {
    axios
      .get("/user/users")
      .then((response) => {
        console.log(response);
        this.setState({ users: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    let users = this.state.users.filter((user) => {
      return (
        user.username
          .toLowerCase()
          .indexOf(this.state.searchValue.toLowerCase()) !== -1 ||
        user.address
          .toLowerCase()
          .indexOf(this.state.searchValue.toLowerCase()) !== -1 ||
        user.firstName
          .toLowerCase()
          .indexOf(this.state.searchValue.toLowerCase()) !== -1 ||
        user.lastName
          .toLowerCase()
          .indexOf(this.state.searchValue.toLowerCase()) !== -1
      );
    });
    let searchValue = this.state.searchValue;
    const { classes } = this.props;
    return (
      <div style={{ height: "100%" }}>
        <h3>User Listings</h3>
        <div>
          {" "}
          <TextField
            style={{ width: "100%" }}
            id="standard-basic"
            label="Search"
            variant="outlined"
            name="searchValue"
            value={searchValue}
            onChange={this._handleTextFieldChange}
          />
        </div>
        <TableContainer component={Paper} style={{ marginTop: "20px",marginBottom:"100px" }}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell align="right">First name</TableCell>
                <TableCell align="right">Last name</TableCell>
                <TableCell align="right">Username</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Address</TableCell>
                <TableCell align="right">Phone</TableCell>
                <TableCell align="right">Authorities</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.length
                ? users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell component="th" scope="row">
                        {new Date(user.date).toLocaleDateString("en-US")}{" "}
                        {new Date(user.date).toLocaleTimeString("en-US")}
                      </TableCell>
                      <TableCell align="right">{user.firstName}</TableCell>
                      <TableCell align="right">{user.lastName}</TableCell>
                      <TableCell align="right">{user.username}</TableCell>
                      <TableCell align="right">{user.email}</TableCell>
                      <TableCell align="right">{user.address}</TableCell>
                      <TableCell align="right">{user.phone}</TableCell>
                      <TableCell align="right">
                        <Grid
                          container
                          spacing={1}
                          style={{ paddingTop: "10px" }}
                        >
                          {user.authorities.map((auth) => (
                            <Grid key={auth.id} item xs={12} sm={12}>
                              <Chip
                                color="primary"
                                label={auth.authority}
                                variant="default"
                              />
                            </Grid>
                          ))}
                        </Grid>
                      </TableCell>
                    </TableRow>
                  ))
                : "No data"}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

export default withStyles(styles)(UserListings);
