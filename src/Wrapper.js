import React from "react";
import Navbar from "./Navbar/navbar";
import { makeStyles } from "@material-ui/core/styles";
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import SmartphoneIcon from '@material-ui/icons/Smartphone';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  
    [theme.breakpoints.up("md")]: {
      width: "1200px",
      margin: "0 auto",
    },
    [theme.breakpoints.up("lg")]: {
      width: "1200px",
      margin: "0 auto",
    },
  },
}));
export default function Wrapper(props) {
  const classes = useStyles();
  return (
    <div className={props.class} >
  
      <Navbar />
      <div className={classes.root}>{props.children}</div>
      <div 
        style={{ position:"fixed", left: "0", bottom: "0", width: "100%",
        overflowX:"auto",
        height:"auto",
        color:"white",
        display:"inline-flex",
        background: "rgb(0,129,117)",
        fontSize:"15px",
        background: "linear-gradient(169deg, rgba(0,129,117,1) 20%, rgba(6,247,120,1) 100%)" }}
      >
        <div className={classes.root} style={{  display: "inline-flex"}}>
        <InstagramIcon/>
        <span style={{marginTop:"4px"}}>INSTAGRAM : memsdelivery</span>
        <FacebookIcon style={{marginLeft:"50px"}} /> 
        <span style={{marginTop:"4px"}}>FACEBOOK : MEMS Delivery</span>
        <SmartphoneIcon style={{marginLeft:"50px"}}/>
        <span style={{marginTop:"4px"}}> Kontakt : 0682180900</span>
        </div>
        
        
   
      </div>
    
    </div>
  );
}
