import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
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

function Navbar() {
  const classes = useStyles();
    return (
      <div>
        <AppBar position="static" title="Xhesina's App">
          <Toolbar variant="dense">
            <div className={classes.root}>
              <Typography variant="h6" color="inherit">
                Service Delivery App
                <Breadcrumbs aria-label="breadcrumb"></Breadcrumbs>
              </Typography>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  
}

export default Navbar;