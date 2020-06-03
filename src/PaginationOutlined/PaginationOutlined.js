import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
  ul: {
    "& .MuiPagination-ul": {
      justifyContent: "space-evenly",
    },
  },
}));

const PaginationOutlined = (props) => {
  const classes = useStyles();

  const handlePageChange = (event, pgNo) => {
    props.pageChanged(pgNo);
  };

  return (
    <div className={classes.root}>
      <Pagination
        className={classes.ul}
        count={props.count}
        variant="outlined"
        color="secondary"
        onChange={handlePageChange}
      />
    </div>
  );
};

export default PaginationOutlined;
