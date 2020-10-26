import React from "react";
import "./home.css";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
import CreationForm from "./CreationForm/creationForm";
import Wrapper from "./Wrapper";
import Tickets from "./TicketListings/tickets";
import axios from "axios";

class Home extends React.Component {
  state = {
    creationForm: false,
    courier: false,
  };
  componentDidMount() {
   
    let query = localStorage.getItem("user");

    axios
      .get("/user", {
        params: {
          username: query,
        },
      })
      .then((response) => {
        if(response.data.authorities.length == 1 && response.data.authorities[0].roleName == "COURIER"){
          this.setState({courier: true})
        }
        else this.setState({courier: false})
       
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        <Wrapper>
          {!this.state.courier ?    <Fab
            style={{ float: "right" }}
            color="secondary"
            aria-label="add"
            onClick={() => {
              this.setState({ creationForm: !this.state.creationForm });
            }}
          >
            {!this.state.creationForm ? <AddIcon /> : <ClearIcon />}
          </Fab> : null}
       
          {this.state.creationForm ? <CreationForm /> : <Tickets />}
        </Wrapper>
      </div>
    );
  }
}

export default Home;
