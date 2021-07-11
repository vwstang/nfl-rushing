import React from "react";

const TableHeader = (props) => {
  const attrProps = {
    className: props.classes,
    ...(props.setSorting && {
      onClick: () => {
        console.log("hello");
        props.setSorting();
      }
    })
  };
  return <span {...attrProps}>{props.code}</span>;
};

export default TableHeader;
