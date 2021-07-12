import React from "react";

const TableHeader = (props) => {
  const attrProps = {
    className: props.classes,
    title: props.title,
    ...(props.setSorting && {
      onClick: () => props.setSorting()
    })
  };
  return <span {...attrProps}>{props.code}</span>;
};

export default TableHeader;
