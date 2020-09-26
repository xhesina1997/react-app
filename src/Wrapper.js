import React from 'react';
import Navbar from "./Navbar/navbar";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    root: {
      padding: theme.spacing(1),
      [theme.breakpoints.down("sm")]: {
        margin: "0 10px",
      },
      [theme.breakpoints.up("md")]: {
        width: "900px",
        margin: "0 auto",
      },
      [theme.breakpoints.up("lg")]: {
        width: "900px",
        margin: "0 auto",
      },
    },
  }));
export default function Wrapper(props) {
    const classes = useStyles();
        return (
            <div className={props.class}>

                <Navbar />
                <div className="search-container" className={classes.root}>
                {props.children}
                </div>
            </div>
        )
    
}