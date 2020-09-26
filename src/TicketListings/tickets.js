import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import "./ticket.css";
export default class Tickets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tickets: [],
    };
  }

  componentDidMount() {
    this.setState(
      { tickets: JSON.parse(localStorage.getItem("tickets")) },
      () => console.log(this.state)
    );
  }
  render() {
    const { tickets } = this.state;

    return (
      <div>
        <h3>Ticket Listings</h3>
        {tickets.length
          ? tickets.map((ticket) => (
              <div style={{ paddingTop: "50px" }}>
                <div className="ticketContainer">
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <p>Mobile : {ticket.mobile}</p>
                      <p>Tel : {ticket.tel}</p>
                    </Grid>
                   
                  </Grid>
                </div>
                <Divider />
              </div>
            ))
          : "No data"}
      </div>
    );
  }
}
