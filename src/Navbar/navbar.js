import React, { useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";
import { useHistory } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import logo from "../assets/MemsLogowhite.svg";
import HomeIcon from '@material-ui/icons/Home';
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      margin: "0 10px",
      width: "100%",
    },
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

function Navbar() {
  const classes = useStyles();
  const [user, setUser] = React.useState(null);
  const username = localStorage.getItem("user");
  const logOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    history.push("/login");
    window.location.reload();
  };
  const history = useHistory();
  const redirectToUsers = () => {
    history.push("/users");
  };
  const redirectToHome = (e) => {
    history.push("/");
    e.preventDefault();
  };
  const redirectToProfile = () => {
    history.push("/profile");
  };
  const redirectToRaports = () => {
    history.push("/reports");
  }
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    let query = localStorage.getItem("user");

    axios
      .get("/user", {
        params: {
          username: query,
        },
      })
      .then((response) => {
        localStorage.setItem("userData",JSON.stringify(response.data))
        response.data.authorities.forEach((auth) => {
          if (auth.roleName === "ADMIN") {
            setUser("ADMIN");
          } else setUser(null);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <div>
      <AppBar position="static" title="MEMS">
        <Toolbar variant="dense">
          <div className={classes.root} style={{ display: "flex" }}>
            <Typography
              variant="h6"
              color="inherit"
              style={{
                flex: "2",
                textAlign: "left",
                alignSelf: "center",
                display: "inline-flex",
              }}
            >
              <img width="60px" height="70px" src={logo} alt="MEMS"></img>
              <Breadcrumbs aria-label="breadcrumb"></Breadcrumbs>
              <div
                style={{ cursor: "pointer", marginLeft: "20px",   alignSelf: "center" }}
                onClick={redirectToHome}
              >
                <span style={{fontSize:"18px"}}>Home</span>
              </div>
              {user != null ? (
                <div
                  style={{ cursor: "pointer", marginLeft: "20px",alignSelf: "center"  }}
                  onClick={redirectToUsers}
                >
                  <span style={{fontSize:"18px"}}>Users</span>
                </div>
              ) : (
                ""
              )}
              <div
                  style={{ cursor: "pointer", marginLeft: "20px",alignSelf: "center"  }}
                  onClick={redirectToRaports}
                >
                  <span style={{fontSize:"18px"}}>Reports</span>
                </div>
            </Typography>
            <div
              style={{
                flex: "1",
                textAlign: "right",
                alignSelf: "center",
                
              }}
            >
              <div
                style={{
                  textAlign:"right",
                  display: "inline-flex",
                  cursor: "pointer",
                }}
                onClick={handleClick}
              >
                <PersonIcon style={{ fontSize: "18px" }} />
                {username}
              </div>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={redirectToProfile}>My Profile</MenuItem>
                <MenuItem onClick={logOut}>Log out</MenuItem>
              </Menu>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
