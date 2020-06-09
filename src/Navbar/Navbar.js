import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textDecoration: "none",
    color: "#fff",
    "&:hover": {
      color: "yellow",
    },
  },
  "active-link": {
    color: "darkOrange",
  },
}));

const NavBar = () => {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Typography
          variant="h6"
          className={classes.title}
          component={NavLink}
          to="/"
          exact
          activeClassName={classes["active-link"]}
        >
          Pokemons
        </Typography>

        <Typography
          variant="h6"
          className={classes.title}
          component={NavLink}
          to="/pokecardgame"
          exact
          activeClassName={classes["active-link"]}
        >
          PokeCardGame
        </Typography>

        <Typography
          variant="h6"
          className={classes.title}
          component={NavLink}
          to="/compare"
          exact
          activeClassName={classes["active-link"]}
        >
          Compare
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
