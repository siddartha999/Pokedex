import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const handlePageChange = (event, pgNo) => {
  console.log(event.target, pgNo);
};

const PaginationOutlined = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Pagination
        count={props.count}
        variant="outlined"
        color="secondary"
        onChange={handlePageChange}
      />
    </div>
  );
};

export default PaginationOutlined;
