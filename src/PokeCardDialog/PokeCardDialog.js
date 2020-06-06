import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import "./PokeCardDialog.css";
import PokemonAdvancedStats from "../PokemonAdvancedStats/PokemonAdvancedStats";

const PokeCardDialog = (props) => {
  const handleClose = () => {
    props.closeDialog();
  };
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
          <PokemonAdvancedStats
            stats={props.data.stats}
            invertedChart={props.invertedChart}
          />
        </div>
      </Dialog>
    </div>
  );
};

export default PokeCardDialog;
