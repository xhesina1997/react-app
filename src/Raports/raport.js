import React, { Component } from "react";
import Wrapper from "../Wrapper";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import DateFnsUtils from "@date-io/date-fns";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import RefreshIcon from "@material-ui/icons/Refresh";
import TablePagination from "@material-ui/core/TablePagination";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const styles = (theme) => ({
  table: {
    minWidth: 1000,
  },
});
class Raports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      size: 5,
      count:0,
      tickets: [],
      selectedFromCreatedDate: null,
      selectedToCreatedDate: null,
      selectedFromDeliveryDate: null,
      selectedToDeliveryDate: null,
      selectedFromAcceptedDate: null,
      selectedToAcceptedDate: null,
      selectedFromPaymentDate: null,
      selectedToPaymentDate: null,
      selectedDate: null,
      cargoStates: [],
      ticketStatus: null,
      customer: "",
    };

    this.filterTicketData = this.filterTicketData.bind(this);
    this.cleanFilters = this.cleanFilters.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
  }

  getCargoStates() {
    axios
      .get("/cargoState")
      .then((response) => {
        this.setState({ cargoStates: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getTickets() {
      console.log("Page"+this.state.page)
      console.log(this.state.size)
    axios
      .post(
        "/report",
        {
          page: this.state.page,
          size: this.state.size,
          ticketStatus: this.state.ticketStatus,
          userClient: this.state.customer == "" ? this.state.customer = null : this.state.customer,
          creationStartDate: this.state.creationStartDate,
          creationEndDate: this.state.creationEndDate,
          acceptedStartDate: this.state.acceptedStartDate,
          acceptedEndDate: this.state.acceptedEndDate,
          deliveredStartDate: this.state.deliveredStartDate,
          deliveredEndDate: this.state.deliveredEndDate,
          liquidatedStartDate: this.state.liquidatedStartDate,
          liquidatedEndDate: this.state.liquidatedEndDate,
        },
        { "Content-Type": "application/json" }
      )
      .then((response) => {
        console.log(response);
        this.setState({ tickets: response });
        this.setState({size: response.data.pageable.pageSize})
      })
      .catch((error) => {
        console.log("login error", error);
      });
  }

  componentDidMount() {
    this.getCargoStates();
    this.getTickets();
  }

  handleCreatedFromDateChange = (date) => {
    this.setState({
      selectedFromCreatedDate: date,
    });
  };
  handleCreatedToDateChange = (date) => {
    this.setState({
      selectedToCreatedDate: date,
    });
  };
  handleDeliveryFromDateChange = (date) => {
    this.setState({
      selectedFromDeliveryDate: date,
    });
  };
  handleDeliveryToDateChange = (date) => {
    this.setState({
      selectedToDeliveryDate: date,
    });
  };
  handleAcceptedFromDateChange = (date) => {
    this.setState({
      selectedFromAcceptedDate: date,
    });
  };
  handleAcceptedToDateChange = (date) => {
    this.setState({
      selectedToAcceptedDate: date,
    });
  };
  handlePaymentFromDateChange = (date) => {
    this.setState({
      selectedFromPaymentDate: date,
    });
  };
  handlePaymentToDateChange = (date) => {
    this.setState({
      selectedToPaymentDate: date,
    });
  };
  handleStatusChange = (event) => {
    this.setState({ ticketStatus: event.target.value });
  };
  _handleTextFieldChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage },
        () => {
            this.getTickets();
        }
    )
   
  };
   handleChangeRowsPerPage = (event) => {
    this.setState({page:0})
    this.setState({size:event.target.value},
        () => {
            this.getTickets();
        }
        );
  
    
  };
  /**
   * Resete Filters
   */
  cleanFilters() {
    this.setState({selectedFromCreatedDate : null})
    this.setState({selectedToCreatedDate : null})
    this.setState({selectedFromDeliveryDate : null})
    this.setState({selectedToDeliveryDate : null});
    this.setState({selectedFromAcceptedDate : null});
    this.setState({selectedToAcceptedDate : null});
    this.setState({selectedFromPaymentDate : null});
    this.setState({selectedToPaymentDate : null});
    this.setState({ticketStatus : null});
    this.setState({page:0})
    this.setState({customer : ""},
    () => {
        this.getTickets();
    }
    );
    
  
  }

  // Filter Params
  filterTicketData() {
    
    axios
    .post(
      "/report",
      {page: 0,
        size: this.state.size,
        ticketStatus: this.state.ticketStatus?.state,
      userClient: this.state.customer == "" ? this.state.customer=null : this.state.customer,
      creationStartDate:
        this.state.selectedFromCreatedDate != null
          ? new Date(this.state.selectedFromCreatedDate).toISOString(
              "yyyy-MM-dd'T'HH:mm:ss.SSSSSS"
            )
          : null,
      creationEndDate:
        this.state.selectedToCreatedDate != null
          ? new Date(this.state.selectedToCreatedDate).toISOString(
              "yyyy-MM-dd'T'HH:mm:ss.SSSSSS"
            )
          : null,
      acceptedStartDate:
        this.state.selectedFromAcceptedDate != null
          ? new Date(this.state.selectedFromAcceptedDate).toISOString(
              "yyyy-MM-dd'T'HH:mm:ss.SSSSSS"
            )
          : null,
      acceptedEndDate:
        this.state.selectedToAcceptedDate != null
          ? new Date(this.state.selectedToAcceptedDate).toISOString(
              "yyyy-MM-dd'T'HH:mm:ss.SSSSSS"
            )
          : null,
      deliveredStartDate:
        this.state.selectedFromDeliveryDate != null
          ? new Date(this.state.selectedFromDeliveryDate).toISOString(
              "yyyy-MM-dd'T'HH:mm:ss.SSSSSS"
            )
          : null,
      deliveredEndDate:
        this.state.selectedToDeliveryDate != null
          ? new Date(this.state.selectedToDeliveryDate).toISOString(
              "yyyy-MM-dd'T'HH:mm:ss.SSSSSS"
            )
          : null,
      liquidatedStartDate:
        this.state.selectedFromPaymentDate != null
          ? new Date(this.state.selectedFromPaymentDate).toISOString(
              "yyyy-MM-dd'T'HH:mm:ss.SSSSSS"
            )
          : null,
      liquidatedEndDate:
        this.state.selectedToPaymentDate != null
          ? new Date(this.state.selectedToPaymentDate).toISOString(
              "yyyy-MM-dd'T'HH:mm:ss.SSSSSS"
            )
          : null,
   
      },
      { "Content-Type": "application/json" }
    )
    .then((response) => {
      console.log(response);
      this.setState({ tickets: response });
      this.setState({size: response.data.pageable.pageSize})
    })
    .catch((error) => {
      console.log("login error", error);
    });
     
    
  }

  render() {
    const {
      page,
      size,
      tickets,
      selectedFromCreatedDate,
      selectedToCreatedDate,
      selectedFromDeliveryDate,
      selectedToDeliveryDate,
      selectedFromAcceptedDate,
      selectedToAcceptedDate,
      selectedFromPaymentDate,
      selectedToPaymentDate,
      selectedDate,
      cargoStates,
      ticketStatus,
      customer,
    } = this.state;
    const { classes } = this.props;
    return (
      <Wrapper>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={4} sm={4} md={4} style={{ marginTop: "40px" }}>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={ticketStatus}
                label="Status"
                onChange={this.handleStatusChange}
                style={{ width: "100%" }}
              >
                {cargoStates.map((state) => (
                  <MenuItem key={state.id} value={state}>
                    {state.description}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={4} sm={4} md={4} style={{ marginTop: "30px" }}>
              <TextField
                style={{ padding: "10px", width: "100%" }}
                id="standard-secondary"
                label="Customer"
                name="customer"
                value={customer}
                onChange={this._handleTextFieldChange}
                color="secondary"
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={2} md={2}>
              <div style={{ padding: "39px 30px" }}>Data e krijimit</div>
            </Grid>
            <Grid item xs={6} sm={2} md={2}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Nga data"
                  value={selectedFromCreatedDate}
                  onChange={this.handleCreatedFromDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={6} sm={2} md={2}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Deri ne daten"
                  value={selectedToCreatedDate}
                  onChange={this.handleCreatedToDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid item xs={12} sm={2} md={2}>
              <div style={{ padding: "39px 30px" }}> Data e dorezimit</div>
            </Grid>
            <Grid item xs={6} sm={2} md={2}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Nga data"
                  value={selectedFromDeliveryDate}
                  onChange={this.handleDeliveryFromDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid item xs={6} sm={2} md={2}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Deri ne daten"
                  value={selectedToDeliveryDate}
                  onChange={this.handleDeliveryToDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={2} md={2}>
              <div style={{ padding: "39px 30px" }}>Data e pranimit</div>
            </Grid>
            <Grid item xs={6} sm={2} md={2}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Nga data"
                  value={selectedFromAcceptedDate}
                  onChange={this.handleAcceptedFromDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid item xs={6} sm={2} md={2}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Deri ne daten"
                  value={selectedToAcceptedDate}
                  onChange={this.handleAcceptedToDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid item xs={12} sm={2} md={2}>
              <div style={{ padding: "39px 30px" }}>Data e pageses</div>
            </Grid>
            <Grid item xs={6} sm={2} md={2}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Nga data"
                  value={selectedFromPaymentDate}
                  onChange={this.handlePaymentFromDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid item xs={6} sm={2} md={2}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Deri ne daten"
                  value={selectedToPaymentDate}
                  onChange={this.handlePaymentToDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
          <Grid item xs={12} md={12} m={12} style={{ marginTop: "20px" }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.filterTicketData}
              style={{ alignSelf: "center" }}
            >
              Filtro
            </Button>
          </Grid>
        </div>

        <div style={{ marginTop: "40px" }}>
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={this.cleanFilters}
              style={{ alignSelf: "center" }}
            >
              <RefreshIcon /> Pastro filtrat
            </Button>
          </div>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Assigned</TableCell>
                  <TableCell>Courier Email</TableCell>
                  <TableCell>Courier Phone</TableCell>
                  <TableCell>Created by</TableCell>
                  <TableCell>Creation date</TableCell>
                  <TableCell>Currency</TableCell>
                  <TableCell>Delivery Date</TableCell>
                  <TableCell>Destination city</TableCell>
                  <TableCell>Distributor</TableCell>
                  <TableCell>Fee</TableCell>
                  <TableCell>Liquidated date</TableCell>
                  <TableCell>Receiver Address</TableCell>
                  <TableCell>Receiver City</TableCell>
                  <TableCell>Receiver Name</TableCell>
                  <TableCell>Receiver Phone</TableCell>
                  <TableCell>Sender Address</TableCell>
                  <TableCell>Sender Email</TableCell>
                  <TableCell>Sender Name</TableCell>
                  <TableCell>Sender Phone</TableCell>
                  <TableCell>Service Fee</TableCell>
                  <TableCell>State</TableCell>
                  <TableCell>Stored date</TableCell>
                  <TableCell>Value to be paid</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tickets?.data?.content?.length
                  ? 
                  tickets?.data?.content
                  .map((ticket) => (
                      <TableRow key={ticket.id} style={{ cursor: "pointer" }}>
                        <TableCell component="th" scope="row">
                          {ticket.assigned}
                        </TableCell>
                        <TableCell align="right">
                          {ticket.courierEmail}
                        </TableCell>
                        <TableCell align="right">
                          {ticket.courierPhone}
                        </TableCell>
                        <TableCell align="right">{ticket.createdBy}</TableCell>
                        <TableCell align="right">
                          {new Date(ticket.creationDate).toLocaleDateString(
                            "en-US"
                          )}{" "}
                          {new Date(ticket.creationDate).toLocaleTimeString(
                            "en-US"
                          )}
                        </TableCell>
                        <TableCell align="right">
                          {ticket.currency}
                        </TableCell>
                        <TableCell align="right">
                          {new Date(ticket.deliveryDate).toLocaleDateString(
                            "en-US"
                          )}{" "}
                          {new Date(ticket.deliveryDate).toLocaleTimeString(
                            "en-US"
                          )}
                        </TableCell>
                        <TableCell align="right">
                          {ticket.destinationCity}
                        </TableCell>
                        <TableCell align="right">
                          {ticket.distributor}
                        </TableCell>
                        <TableCell align="right">
                          {ticket.fee}
                        </TableCell>
                        <TableCell align="right">
                          {new Date(ticket.liquidatedDate).toLocaleDateString(
                            "en-US"
                          )}{" "}
                          {new Date(ticket.liquidatedDate).toLocaleTimeString(
                            "en-US"
                          )}
                        </TableCell>
                        <TableCell align="right">
                          {ticket.receiverAddress}
                        </TableCell>
                        <TableCell align="right">
                          {ticket.receiverCity}
                        </TableCell>
                        <TableCell align="right">
                          {ticket.receiverName}
                        </TableCell>
                        <TableCell align="right">
                          {ticket.receiverPhone}
                        </TableCell>
                        <TableCell align="right">
                          {ticket.senderAddress}
                        </TableCell>
                        <TableCell align="right">
                          {ticket.senderEmail}
                        </TableCell>
                        <TableCell align="right">
                          {ticket.senderName}
                        </TableCell>
                        <TableCell align="right">
                          {ticket.senderPhone}
                        </TableCell>
                        <TableCell align="right">
                          {ticket.serviceFee}
                        </TableCell>
                        <TableCell align="right">
                        <Chip
                          label={
                            ticket.state
                          }
                          variant="default"
                          style={{
                            backgroundColor:
                              ticket.state === "CREATED"
                                ? "#c0bdc1e3"
                                : ticket.state === "STORED"
                                ? "#ff7100"
                                : ticket.state === "DISTRIBUTING"
                                ? "#4959bf"
                                : ticket.state === "DELIVERED"
                                ? "#00bf40"
                                : ticket.state === "REJECTED"
                                ? "#ff2424"
                                : "",
                                fontWeight:"bold"
                          }}
                        />
                        </TableCell>
                        <TableCell align="right">
                          {new Date(ticket.storedDate).toLocaleDateString(
                            "en-US"
                          )}{" "}
                          {new Date(ticket.storedDate).toLocaleTimeString(
                            "en-US"
                          )}
                        </TableCell>
                        <TableCell align="right">
                          {ticket.valueToBePaid}
                        </TableCell>
                      </TableRow>
                    ))
                  : "No data"}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={tickets?.data?.totalElements}
            rowsPerPage={size}
            page={tickets?.data?.pageable.pageNumber}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
          <Grid
            container
            style={{ width: "auto", float: "right", marginBottom: "100px" }}
          >
            <Grid item xs={12} sm={12} md={6} spacing={2}>
              <Grid item xs={12} sm={12} md={12} style={{ marginTop: "40px" }}>
                <h4>Kundrejt Pagesa:</h4>
              </Grid>

              <Grid container>
                <Grid item xs={6} sm={6} md={6}>
                  {" "}
                  <span style={{ fontWeight: "bold" }}>Total LEK:</span>
                </Grid>
                <Grid item xs={6} sm={6} md={6}>
                  {" "}
                  <span>1,532,040.00 </span> LEK
                </Grid>
              </Grid>
              <Grid container style={{ marginTop: "20px" }}>
                <Grid item xs={6} sm={6} md={6}>
                  {" "}
                  <span style={{ fontWeight: "bold" }}>Total EUR:</span>
                </Grid>
                <Grid item xs={6} sm={6} md={6}>
                  {" "}
                  <span>1,532,040.00 </span> EUR
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={6} spacing={2}>
              <Grid item xs={12} sm={12} md={12} style={{ marginTop: "40px" }}>
                <h4>Sherbimi:</h4>
              </Grid>

              <Grid container>
                <Grid item xs={6} sm={6} md={6}>
                  {" "}
                  <span style={{ fontWeight: "bold" }}>Total LEK:</span>
                </Grid>
                <Grid item xs={6} sm={6} md={6}>
                  {" "}
                  <span>1,532,040.00 </span> LEK
                </Grid>
              </Grid>
              <Grid container style={{ marginTop: "20px" }}>
                <Grid item xs={6} sm={6} md={6}>
                  {" "}
                  <span style={{ fontWeight: "bold" }}>Total EUR:</span>
                </Grid>
                <Grid item xs={6} sm={6} md={6}>
                  {" "}
                  <span>1,532,040.00 </span> EUR
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Wrapper>
    );
  }
}

export default withRouter(withStyles(styles)(Raports));
