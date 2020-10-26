import React, { Component } from "react";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Chip from "@material-ui/core/Chip";
import Select from "@material-ui/core/Select";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import PrintIcon from "@material-ui/icons/Print";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";

const styles = (theme) => ({
  table: {
    minWidth: 1000,
  },
});

class Tickets extends Component {
  static contextTypes = {
    router: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.state = {
      tickets: [],
      open: false,
      openStatusDialog: false,
      selectedValue: {},
      selectedTicketStatus: {},
      searchValue: "",
      cargoStates: [],
      status: {},
      distributingState: false,
      couriers: [],
      courier: "",
      comment: "",
      rejectedModal: false,
      client: false,
      liquidated: false,
      admin: false,
      vertical: "bottom",
      horizontal: "center",
      openSnackBar: false,
      message: "",
    };
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this._handleTextFieldChange = this._handleTextFieldChange.bind(this);
    this.changeCargoStatus = this.changeCargoStatus.bind(this);
    this.confirmRejection = this.confirmRejection.bind(this);
  }

  goToPrintedForm = (e, ticket) => {
    e.stopPropagation();
    this.props.history.push({
      pathname: `/print?ticket=${ticket.id}`,
      state: { ticket: ticket.id },
    });
    window.location.reload();
  };
  _handleTextFieldChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  checkIfUserisOnlyClient() {
    let user = JSON.parse(localStorage.getItem("userData"));
    if (user != null) {
      if (
        user.authorities.length == 1 &&
        user.authorities[0].roleName == "CLIENT"
      ) {
        this.setState({
          openSnackBar: true,
          vertical: "bottom",
          horizontal: "center",
          message: "Skeni akses",
        });
        return true;
      } else {
        this.setState({ openSnackBar: false });
        return false;
      }
    } else return false;
  }

  changeStatus = (e, ticket) => {
    this.setState({ selectedTicketStatus: ticket });
    e.stopPropagation();
    if (
      ticket.ticketProgress[ticket.ticketProgress.length - 1].cargoState
        .state == "REJECTED" && ticket.rejected == false
    ) {
      if (ticket.users.username === localStorage.getItem("user")) {
        this.setState({ rejectedModal: true });
        this.setState({ openSnackBar: false });
      }
    
    } 
    else if ( ticket.ticketProgress[ticket.ticketProgress.length - 1].cargoState
      .state == "REJECTED" && ticket.rejected == true){
        console.log("TESt")
        this.setState({
          openSnackBar: true,
          vertical: "bottom",
          horizontal: "center",
          message: "Refuzimi eshte konfirmuar nga clienti" + ticket.firstName + ticket.lastName,
        }); 
      }else {
      this.setState({ rejectedModal: false });

      if (!this.checkIfUserisOnlyClient()) {
        this.setState({ openStatusDialog: true });
        this.setState({ selectedTicketStatus: ticket });
        this.setState({ comment: "" });
        this.setState({ distributingState: false });
      } else {
        this.setState({ client: true });
      }
      if (
        ticket.ticketProgress[ticket.ticketProgress.length - 1].cargoState
          .state == "LIQUIDATED"
      ) {
        this.setState({ liquidated: true });
      } else this.setState({ liquidated: false });

      axios
        .get("/cargoState")
        .then((response) => {
          console.log(response);
          this.setState({ cargoStates: response.data });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  confirmRejection(){
    console.log(this.state.selectedTicketStatus)
    var formData = new FormData();
    formData.append("rejected", true);
    formData.append("ticketId", this.state.selectedTicketStatus.id);
    
    axios
    .post("/ticket/confirmRejectedTicket",  formData,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log(response)
      this.handleClose();
      axios
      .get("/ticket")
      .then((responseTi) => {
        this.setState({ tickets: responseTi.data });
      })
      .catch((error) => {
        console.log(error);
      });
  
    })
    .catch((error) => {
      console.log("login error", error);
    });
  }
  componentDidMount() {
    axios
      .get("/ticket")
      .then((response) => {
        console.log(response.data)
        this.setState({ tickets: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  handleClickOpen = (ticket) => {
    this.setState({ open: true });
    this.setState({ selectedValue: ticket });
  };

  handleClose = (value) => {
    this.setState({ open: false });
    this.setState({ openStatusDialog: false });
    this.setState({ rejectedModal: false });
  };
  handleChange = (event) => {
    this.setState({ status: event.target.value });
    if (event.target.value.state === "DISTRIBUTING") {
      this.setState({ distributingState: true });
      axios
        .get("/user/authority")
        .then((response) => {
          console.log(response);
          this.setState({ couriers: response.data });
        })
        .catch((error) => {
          console.log(error);
        });
    } else this.setState({ distributingState: false });
  };
  handleCourierChange = (event) => {
    this.setState({ courier: event.target.value });
  };
  changeCargoStatus(event) {
    const { comment, courier, selectedTicketStatus, status } = this.state;
    let body = {
      cargoStateId: status.id,
      comment: comment,
      ticketId: selectedTicketStatus.id,
      assignedId: courier.id,
    };
    axios
      .post("/ticketProgress", body, { "Content-Type": "application/json" })
      .then((response) => {
        console.log(response);
        this.setState({ openStatusDialog: false });
        axios
          .get("/ticket")
          .then((response) => {
            this.setState({ tickets: response.data });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log("login error", error);
      });
  }
  render() {
    const {
      open,
      selectedValue,
      openStatusDialog,
      selectedTicketStatus,
      status,
      cargoStates,
      distributingState,
      couriers,
      courier,
      comment,
      rejectedModal,
      client,
      liquidated,
      admin,
      vertical,
      horizontal,
      openSnackBar,
      message,
    } = this.state;
    const { classes } = this.props;
    let tickets = this.state.tickets.filter((ticket) => {
      return (
        ticket.users.username
          .toLowerCase()
          .indexOf(this.state.searchValue.toLowerCase()) !== -1 ||
        ticket.address
          .toLowerCase()
          .indexOf(this.state.searchValue.toLowerCase()) !== -1 ||
        ticket.firstName
          .toLowerCase()
          .indexOf(this.state.searchValue.toLowerCase()) !== -1 ||
        ticket.lastName
          .toLowerCase()
          .indexOf(this.state.searchValue.toLowerCase()) !== -1 ||
        ticket.city.city
          .toLowerCase()
          .indexOf(this.state.searchValue.toLowerCase()) !== -1 ||
        ticket.state
          .toLowerCase()
          .indexOf(this.state.searchValue.toLowerCase()) !== -1 ||
        ticket.ticketProgress[ticket.ticketProgress.length - 1].cargoState.state
          .toLowerCase()
          .indexOf(this.state.searchValue.toLowerCase()) !== -1
      );
    });
    let searchValue = this.state.searchValue;
    return (
      <div style={{ height: "100%" }}>
        <h3>Ticket Listings</h3>
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
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="simple-dialog-title"
          open={open}
          maxWidth={"lg"}
          fullWidth={true}
        >
          <DialogTitle id="simple-dialog-title">Ticket progress</DialogTitle>
          <Divider />
          <DialogContent style={{ padding: "30px" }}>
            <TableContainer component={Paper} style={{ marginTop: "20px" }}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Status</TableCell>
                    <TableCell align="left">Date</TableCell>
                    <TableCell align="left">Name</TableCell>
                    <TableCell align="left">Assigned to</TableCell>
                    <TableCell align="left">Comment</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedValue.ticketProgress?.length
                    ? selectedValue?.ticketProgress?.map((progress) => (
                        <TableRow key={progress.id}>
                          <TableCell align="left">
                            <Chip 
                              label={progress.cargoState.description}
                              variant="default"
                              style={{
                                backgroundColor:
                                  progress.cargoState.state === "CREATED"
                                    ? "#c0bdc1e3"
                                    : progress.cargoState.state === "STORED"
                                    ? "#ff7100"
                                    : progress.cargoState.state ===
                                      "DISTRIBUTING"
                                    ? "#4959bf"
                                    : progress.cargoState.state === "DELIVERED"
                                    ? "#00bf40"
                                    : "",
                                    fontWeight:"bold"
                              }}
                            />
                          </TableCell>
                          <TableCell align="left">
                            {" "}
                            {new Date(progress.date).toLocaleDateString(
                              "en-US"
                            )}{" "}
                            {new Date(progress.date).toLocaleTimeString(
                              "en-US"
                            )}{" "}
                          </TableCell>
                          <TableCell align="left">
                            {progress.users.firstName} {progress.users.lastName}
                          </TableCell>
                          <TableCell align="left">
                            {progress?.assigned?.firstName}
                          </TableCell>
                          <TableCell align="left">{progress.comment}</TableCell>
                        </TableRow>
                      ))
                    : "No data"}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
        </Dialog>
        <TableContainer component={Paper} style={{ marginTop: "20px",marginBottom:"100px"}}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>NO</TableCell>
                <TableCell>State</TableCell>
                <TableCell align="right">First name</TableCell>
                <TableCell align="right">Mobile</TableCell>
                <TableCell align="right">City</TableCell>
                <TableCell align="right">State</TableCell>
                <TableCell align="right">Fee</TableCell>
                <TableCell align="right">Curreny</TableCell>
                <TableCell align="right">Last name</TableCell>
                <TableCell align="right">Comment</TableCell>
                <TableCell align="right">Address</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tickets?.length
                ? tickets.map((ticket) => (
                    <TableRow
                      key={ticket.id}
                      onClick={() => this.handleClickOpen(ticket)}
                      style={{ cursor: "pointer" }}
                    >
                      <TableCell align="right">{ticket.no}</TableCell>
                      <TableCell
                        align="right"
                        onClick={(e) => {
                          this.changeStatus(e, ticket);
                        }}
                      >
                        {" "}
                        <Chip
                          label={
                            ticket.ticketProgress[
                              ticket.ticketProgress.length - 1
                            ].cargoState.description
                          }
                          variant="default"
                          style={{
                            backgroundColor:
                              ticket.ticketProgress[
                                ticket.ticketProgress.length - 1
                              ].cargoState.state === "CREATED"
                                ? "#c0bdc1e3"
                                : ticket.ticketProgress[
                                    ticket.ticketProgress.length - 1
                                  ].cargoState.state === "STORED"
                                ? "#ff7100"
                                : ticket.ticketProgress[
                                    ticket.ticketProgress.length - 1
                                  ].cargoState.state === "DISTRIBUTING"
                                ? "#4959bf"
                                : ticket.ticketProgress[
                                    ticket.ticketProgress.length - 1
                                  ].cargoState.state === "DELIVERED"
                                ? "#00bf40"
                                : ticket.ticketProgress[
                                    ticket.ticketProgress.length - 1
                                  ].cargoState.state === "REJECTED"
                                ? "#ff2424"
                                : "",
                                fontWeight:"bold"
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">{ticket.firstName}</TableCell>
                      <TableCell align="right">{ticket.mobile}</TableCell>
                      <TableCell align="right">{ticket.city.city}</TableCell>
                      <TableCell align="right">{ticket.state}</TableCell>
                      <TableCell align="right">{ticket.fee}</TableCell>
                      <TableCell align="right">{ticket.currency.currency}</TableCell>
                      <TableCell align="right">{ticket.lastName}</TableCell>
                      <TableCell align="right">{ticket.comment}</TableCell>
                      <TableCell align="right">{ticket.address}</TableCell>
                      <TableCell align="right" component="th" scope="row">
                        {new Date(ticket.date).toLocaleDateString("en-US")}{" "}
                        {new Date(ticket.date).toLocaleTimeString("en-US")}
                      </TableCell>
                      <TableCell align="right">
                        <PrintIcon
                          style={{ color: "#4c4a4adb" }}
                          onClick={(e) => {
                            this.goToPrintedForm(e, ticket);
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                : "No data"}
            </TableBody>
          </Table>
        </TableContainer>

        {liquidated == false ? (
          <div>
            <Dialog
              onClose={this.handleClose}
              aria-labelledby="simple-dialog-title"
              open={rejectedModal}
              maxWidth={"sm"}
              fullWidth={true}
            >
              <DialogTitle id="simple-dialog-title">
                <p>Confirm rejection</p>
              </DialogTitle>
              <Divider />
              <DialogContent style={{ padding: "20px", textAlign: "center" }}>
                <h4>Konfirmo refuzimin e ticket</h4>
                <div style={{ display: "inline-flex" }}>
                  <Button variant="contained" color="primary" onClick={this.confirmRejection}>
                    Konfirmo
                  </Button>
                  <Button style={{marginLeft:"10px"}}variant="contained" color="secondary" onClick={this.handleClose}>
                    Anullo
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog
              onClose={this.handleClose}
              aria-labelledby="simple-dialog-title"
              open={openStatusDialog}
              maxWidth={"sm"}
              fullWidth={true}
            >
              <DialogTitle id="simple-dialog-title">
                <p>Change ticket Status</p>
              </DialogTitle>
              <Divider />
              <DialogContent style={{ padding: "30px", textAlign: "center" }}>
                <Chip
                  label={
                    selectedTicketStatus?.ticketProgress?.[
                      selectedTicketStatus?.ticketProgress?.length - 1
                    ].cargoState?.description
                  }
                  variant="default"
                  style={{
                    backgroundColor:
                      selectedTicketStatus?.ticketProgress?.[
                        selectedTicketStatus?.ticketProgress?.length - 1
                      ].cargoState.state === "CREATED"
                        ? "#c0bdc1e3"
                        : selectedTicketStatus?.ticketProgress?.[
                            selectedTicketStatus?.ticketProgress?.length - 1
                          ].cargoState.state === "STORED"
                        ? "#ff7100"
                        : selectedTicketStatus?.ticketProgress?.[
                            selectedTicketStatus?.ticketProgress?.length - 1
                          ].cargoState.state === "DISTRIBUTING"
                        ? "#4959bf"
                        : selectedTicketStatus?.ticketProgress?.[
                            selectedTicketStatus?.ticketProgress?.length - 1
                          ].cargoState.state === "DELIVERED"
                        ? "#00bf40"
                        : selectedTicketStatus?.ticketProgress?.[
                            selectedTicketStatus?.ticketProgress?.length - 1
                          ].cargoState.state === "REJECTED"
                        ? "#ff2424"
                        : "",
                        fontWeight:"bold"
                  }}
                />
                <div>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status}
                    onChange={this.handleChange}
                    style={{ width: "100%", marginTop: "40px" }}
                  >
                    {cargoStates.map((state) => (
                      <MenuItem key={state.id} value={state}>
                        {state.description}
                      </MenuItem>
                    ))}
                  </Select>

                  {distributingState ? (
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={courier}
                      onChange={this.handleCourierChange}
                      style={{ width: "100%", marginTop: "40px" }}
                    >
                      {couriers.map((courier) => (
                        <MenuItem key={courier.id} value={courier}>
                          {courier.username}
                        </MenuItem>
                      ))}
                    </Select>
                  ) : (
                    ""
                  )}
                  <TextField
                    style={{ padding: "10px", width: "95%" }}
                    id="standard-secondary"
                    label="Comment"
                    name="comment"
                    value={comment}
                    onChange={this._handleTextFieldChange}
                    color="secondary"
                    required
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={this.changeCargoStatus}
                  >
                    Submit
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Snackbar
              anchorOrigin={{ vertical, horizontal }}
              open={openSnackBar}
              message={message}
              key={vertical + horizontal}
            />
          </div>
        ) : (
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open="true"
            message="Status i likuiduar"
            key={vertical + horizontal}
          />
        )}
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(Tickets));
