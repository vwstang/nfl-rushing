import React from "react";

const TableHeader = (props) => {
  return (
    <>
      {props.colOrder.map((stat, idx) => {
        const rKey = `Header-${stat.code}`;
        let classes = "rushStats__header";
        if (idx === 0) {
          classes += " rushStats__header--name";
        } else if (idx === props.colOrder.length - 1) {
          classes += " rushStats__header--last";
        }
        return (
          <span key={rKey} className={classes} title={stat.desc}>
            {stat.code}
          </span>
        );
      })}
    </>
  );
};

export default TableHeader;
