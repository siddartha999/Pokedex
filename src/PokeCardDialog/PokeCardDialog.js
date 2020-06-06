import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import "./PokeCardDialog.css";
import PokemonAdvancedStats from "../PokemonAdvancedStats/PokemonAdvancedStats";

const PokeCardDialog = (props) => {
  const handleClose = () => {
    props.closeDialog();
  };

  const styleObj = {
    backgroundImage: `url(${props.imgSrc})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  return (
    <div className="PokeCardDialog" style={styleObj}>
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
        <div
          className="PokeCardDialog-inverted-chart-container"
          style={styleObj}
        >
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
