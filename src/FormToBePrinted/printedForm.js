import React, { Component } from "react";
import Wrapper from "../Wrapper";
import Button from "@material-ui/core/Button";
import axios from "axios";
import logo from "../assets/Memslogo.svg";
class PrintedForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticket: {},
    };
    console.log(this.props);
    this.ticketRef = React.createRef();
  
  }
  componentDidMount() {
    if (this.props.history.location.state != null) {
        let query = this.props.history.location.state.ticket;
        axios
          .get("/ticket/ticket", {
            params: {
              id: query,
            },
          })
          .then((response) => {
            console.log(response.data);
            this.setState({ ticket: response.data });
            window.print();
          })
          .catch((error) => {
            console.log(error);
          });
      }
  }

  render() {
    const { ticket } = this.state;
    var Barcode = require("react-barcode");
    return (
      <div>
        <div style={{ display: "inline-flex" }}>
            <div style={{ margin: "auto" }}>
              <div
                style={{
                  width: "500px",
                  height: "auto",
                  border: "1px solid #adadad",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "inline-flex",
                    padding: "20px",
                  }}
                >
                  <div style={{ margin: "auto" }}>
                 <img width="100px" height="auto" src={logo} alt="MEMS"></img>
                  </div>
                  <div style={{ margin: "auto" }}>
                    <span style={{ fontWeight: "bold" }}> MEMS delivery</span>
                  </div>
                </div>
              </div>
              <div
                style={{
                  width: "500px",
                  height: "auto",
                  border: "1px solid #adadad",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "inline-flex",
                    padding: "20px",
                  }}
                >
                  <div style={{ margin: "auto", fontWeight: "bold" }}>
                    DERGUESI
                  </div>
                  <div style={{ margin: "auto", fontWeight: "bold" }}>
                    MARRESI
                  </div>
                </div>
              </div>
              <div
                style={{
                  width: "500px",
                  height: "auto",
                  border: "1px solid #adadad",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "inline-flex",
                    padding: "20px",
                  }}
                >
                  <div style={{ margin: "auto", fontWeight: "bold" }}>
                    <span style={{ color: "#717171" }}>SUBJEKTI </span>
                    <p>
                      {ticket?.users?.firstName} {ticket?.users?.lastName}
                    </p>
                  </div>
                  <div style={{ margin: "auto", fontWeight: "bold" }}>
                    <span style={{ color: "#717171" }}>SUBJEKTI </span>
                    <p>
                      {ticket?.firstName} {ticket?.lastName}
                    </p>{" "}
                  </div>
                </div>
              </div>
              <div
                style={{
                  width: "500px",
                  height: "auto",
                  border: "1px solid #adadad",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "inline-flex",
                    padding: "20px",
                  }}
                >
                  <div style={{ margin: "auto", fontWeight: "bold" }}>
                    <span style={{ color: "#717171" }}>KONTAKTI </span>
                  </div>
                  <div style={{ margin: "auto", fontWeight: "bold" }}>
                    <span style={{ color: "#717171" }}>KONTAKTI </span>
                  </div>
                </div>
              </div>
              <div
                style={{
                  width: "500px",
                  height: "auto",
                  border: "1px solid #adadad",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "inline-flex",
                    padding: "20px",
                  }}
                >
                  <div style={{ margin: "auto", fontWeight: "bold" }}>
                    <span style={{ color: "#717171" }}>RRUGA/FSHATI </span>
                    <p>{ticket?.users?.address}</p>
                  </div>
                  <div style={{ margin: "auto", fontWeight: "bold" }}>
                    <span style={{ color: "#717171" }}>RRUGA/FSHATI </span>
                    <p>{ticket?.address}</p>
                  </div>
                </div>
              </div>
              <div
                style={{
                  width: "500px",
                  height: "auto",
                  border: "1px solid #adadad",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "inline-flex",
                    padding: "20px",
                  }}
                >
                  <div
                    style={{
                      margin: "auto",
                      fontWeight: "bold",
                      display: "inline-flex",
                    }}
                  >
                    <div style={{ margin: "auto" }}>
                      <span style={{ color: "#717171" }}>Qyteti </span>
                      <p>TIRANE</p>
                    </div>
                    <div style={{ margin: "auto", marginLeft: "30px" }}>
                      <span style={{ color: "#717171" }}>KODI POSTAR </span>
                      <p>1001</p>
                    </div>
                  </div>
                  <div
                    style={{
                      margin: "auto",
                      fontWeight: "bold",
                      display: "inline-flex",
                    }}
                  >
                    <div style={{ margin: "auto" }}>
                      <span style={{ color: "#717171" }}>Qyteti </span>
                      <p>{ticket?.city?.city}</p>
                    </div>
                    <div style={{ margin: "auto", marginLeft: "30px" }}>
                      <span style={{ color: "#717171" }}>KODI POSTAR </span>
                      <p>100</p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  width: "500px",
                  height: "auto",
                  border: "1px solid #adadad",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "inline-flex",
                    padding: "20px",
                  }}
                >
                  <div style={{ margin: "auto", fontWeight: "bold" }}>
                    <span style={{ color: "#717171" }}>TELEFONI </span>
                    <p>{ticket?.users?.phone}</p>
                  </div>
                  <div style={{ margin: "auto", fontWeight: "bold" }}>
                    <span style={{ color: "#717171" }}>TELEFONI </span>
                    <p>{ticket?.mobile}</p>{" "}
                  </div>
                </div>
              </div>
              <div
                style={{
                  width: "500px",
                  height: "auto",
                  border: "1px solid #adadad",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "inline-flex",
                    padding: "20px",
                  }}
                >
                  <div style={{ margin: "auto", fontWeight: "bold" }}>
                    <span style={{ color: "#717171" }}>FIRMA DERGUESI</span>
                    <h3>...</h3>
                  </div>
                  <div style={{ margin: "auto", fontWeight: "bold" }}>
                    <span style={{ color: "#717171" }}>FIRMA MARRESI </span>
                    <h3>...</h3>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div
                style={{
                  width: "500px",
                  height: "auto",
                  border: "1px solid #adadad",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    padding: "20px",
                    height: "242px",
                  }}
                >
                  <div>
                    <h3>BARCODE</h3>
                    <Barcode value={ticket?.no} width="4" height="70" />,
                  </div>
                </div>
              </div>
              <div
                style={{
                  width: "500px",
                  height: "auto",
                  border: "1px solid #adadad",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "inline-flex",
                    padding: "10px",
                  }}
                >
                  <div style={{ margin: "auto", fontWeight: "bold" }}>
                    <span style={{ color: "#717171" }}>DATA E PRANIMIT </span>
                    <p>
                      {" "}
                      {new Date(ticket?.date).toLocaleDateString("en-US")}{" "}
                      {new Date(ticket?.date).toLocaleTimeString("en-US")}{" "}
                    </p>
                  </div>
                  <div style={{ margin: "auto", fontWeight: "bold" }}>
                    <span style={{ color: "#717171" }}>STATUSI </span>
                <p>{ ticket?.ticketProgress?.[
                      ticket?.ticketProgress?.length - 1
                    ].cargoState?.description}</p>
                  </div>
                </div>
              </div>
              <div
                style={{
                  width: "500px",
                  height: "auto",
                  border: "1px solid #adadad",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "inline-flex",
                    padding: "10px",
                  }}
                >
                  <div style={{ margin: "auto", fontWeight: "bold" }}>
                    <span style={{ color: "#717171" }}>TIPI I POROSISE </span>
                    <p>#</p>
                  </div>
                  <div style={{ margin: "auto", fontWeight: "bold" }}>
                    <span style={{ color: "#717171" }}>TIPI I SHERBIMIT </span>
                    <p>#</p>
                  </div>
                </div>
              </div>
              <div
                style={{
                  width: "500px",
                  height: "auto",
                  border: "1px solid #adadad",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "inline-flex",
                    padding: "10px",
                  }}
                >
                  <div style={{ margin: "auto", fontWeight: "bold" }}>
                    <span style={{ color: "#717171" }}>TIPI I PAKETES </span>
                    <p>PAKO</p>
                  </div>
                  <div style={{ margin: "auto", fontWeight: "bold" }}>
                    <span style={{ color: "#717171" }}>COPE </span>
                    <p>1</p>
                  </div>
                </div>
              </div>
              <div
                style={{
                  width: "500px",
                  height: "auto",
                  border: "1px solid #adadad",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "inline-flex",
                    padding: "10px",
                  }}
                >
                  <div style={{ margin: "auto", fontWeight: "bold" }}>
                    <span style={{ color: "#717171" }}>KOD REFERENCE </span>
                    <p>#</p>
                  </div>
                  <div style={{ margin: "auto", fontWeight: "bold" }}>
                    <span style={{ color: "#717171" }}>NR.FAT.TATIMORE </span>
                    <p>#</p>
                  </div>
                </div>
              </div>
              <div
                style={{
                  width: "500px",
                  height: "auto",
                  border: "1px solid #adadad",
                }}
              >
                <div
                  style={{
                    margin: "auto",
                    fontWeight: "bold",
                    padding: "10px",
                  }}
                >
                  <span style={{ color: "#717171" }}>PERSHKRIME </span>
                  <p>{ticket?.comment}</p>
                </div>
              </div>
              <div
                style={{
                  width: "500px",
                  height: "auto",
                  border: "1px solid #adadad",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "inline-flex",
                    padding: "10px",
                  }}
                >
                  <div style={{ margin: "auto", fontWeight: "bold" }}>
                    <span style={{ color: "#717171" }}>PESHA TOTALE </span>
                    <p>#</p>
                  </div>
                  <div style={{ margin: "auto", fontWeight: "bold" }}>
                    <span style={{ color: "#717171" }}>VLERA PER ARKETIM </span>
                    <p>
                      {ticket?.fee} {ticket?.currency?.currency}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
       
      </div>
    );
  }
}

export default PrintedForm;
