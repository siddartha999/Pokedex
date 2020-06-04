import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import "./PokeCardDialog.css";
import InvertedBarChart from "../InvertedBarChart/InvertedBarChart";

const PokeCardDialog = (props) => {
  const chartInput = [];

  const handleClose = () => {
    props.closeDialog();
  };

  const listItems = [];

  for (let dataPoint of props.data.stats) {
    const name = dataPoint.stat.name;
    const value = dataPoint.base_stat;
    chartInput.push({
      name: name,
      value: value,
    });
    listItems.push(
      <ListItem key={name}>
        <ListItemText primary={name} secondary={value} />
      </ListItem>
    );
  }

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={props.open}
      >
        <DialogTitle
          id="simple-dialog-title"
          className="PokeCardDialog-dialog-title-container"
        >
          {props.data.name}
        </DialogTitle>
        <div className="PokeCardDialog-img-container"> {props.imgJSX}</div>
        <div className="PokeCardDialog-inverted-chart-container">
          <InvertedBarChart data={chartInput} />
        </div>
      </Dialog>
    </div>
  );
};

export default PokeCardDialog;
