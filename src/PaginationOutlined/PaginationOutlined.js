import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const ITEMS_PER_PAGE_TITLE = "Items";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
      display: "inline-block",
      width: "70%",
      height: "100%",
    },
  },
  ul: {
    "& .MuiPagination-ul": {
      justifyContent: "space-evenly",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "120px",
    display: "inline-block",
    float: "left",
    width: "20%",
    height: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const PaginationOutlined = (props) => {
  const classes = useStyles();

  const handlePageChange = (event, pgNo) => {
    props.pageChanged(pgNo);
  };

  const handleItemsPerPageChange = (event, no) => {
    props.itemsPerPageChanged(no.props.value);
  };

  const selectJSX = (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-label">
        {props.menuTitle || ITEMS_PER_PAGE_TITLE} Per Page
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={props.itemsPerPage}
        onChange={handleItemsPerPageChange}
      >
        {props.menuValues.map((menuItem) => (
          <MenuItem value={menuItem} key={menuItem}>
            {menuItem}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  return (
    <div className={classes.root}>
      {props.includeItemsPerPage && selectJSX}
      <Pagination
        className={classes.ul}
        count={props.count}
        variant="outlined"
        color="secondary"
        page={props.page}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default PaginationOutlined;
