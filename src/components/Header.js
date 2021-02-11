import React, { useEffect } from "react"
import { Container, TextField, makeStyles } from "@material-ui/core"
import Auth from "./Auth";
const useStyles = makeStyles((theme) => ({
  headerContainer: {
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
}));
export default function Header() {
  const classes = useStyles();

  return (
    <nav className={classes.headerContainer}>
      <Container>
        <Auth />
      </Container>
    </nav>
  );
}
