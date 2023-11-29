import React from "react";
import "./Marker.css";

const MarkerItem = (props: any) => {
  const { color, name, zIndex } = props;
  return (
    <>
      <div
        className="pin bounce"
        style={{ backgroundColor: color, cursor: "pointer", zIndex: zIndex }}
        title={name}
      />
      <div className="pulse" />
    </>
  );
};

export default MarkerItem;
