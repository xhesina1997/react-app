import React from "react";
import "./home.css";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import CreationForm from "./CreationForm/creationForm";
import Wrapper from "./Wrapper";
import Tickets from "./TicketListings/tickets";

class Home extends React.Component {
  state = {
    creationForm: false,
  };

  render() {
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
            {!this.state.creationForm ?  <AddIcon /> : <RemoveIcon/>}
          </Fab>
          {this.state.creationForm ? <CreationForm /> : <Tickets/>}
        </Wrapper>
      </div>
    );
  }
}

export default Home;
