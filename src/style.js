export const useStyles = makeStyles((theme) => ({
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