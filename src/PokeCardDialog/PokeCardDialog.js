import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import "./PokeCardDialog.css";

const PokeCardDialog = (props) => {
  const handleClose = () => {
    props.closeDialog();
  };

  const listItems = [];
  for (let dataPoint of props.data.stats) {
    listItems.push(
      <ListItem key={dataPoint.stat.name}>
        <ListItemText
          primary={dataPoint.stat.name}
          secondary={dataPoint.base_stat}
        />
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
        <DialogTitle id="simple-dialog-title">{props.data.name}</DialogTitle>
        <div className="PokeCardDialog-img-container"> {props.imgJSX}</div>
        <List>{listItems}</List>
      </Dialog>
    </div>
  );
};

export default PokeCardDialog;
