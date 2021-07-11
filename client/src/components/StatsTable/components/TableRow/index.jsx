import React from "react";

const TableRow = (props) =>
  props.colOrder.map((stat, idx) => {
    const rKey = `${props.playerStat.Player.replace(/\s/g, "")}-${stat.code}`;
    let classes = `${props.altBG ? "tableRowAlt " : ""}rushStats__item`;
    if (idx === 0) {
      classes += " rushStats__item--name";
    } else if (idx === props.colOrder.length - 1) {
      classes += " rushStats__item--last";
    }
    return (
      <span key={rKey} className={classes}>
        {props.playerStat[stat.code]}
      </span>
    );
  });

export default TableRow;
