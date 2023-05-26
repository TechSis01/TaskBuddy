import React from "react";

function TopHeader({ style, text, emoji }) {
  return (
    <h3 className={style}>
      {text} <span>{emoji}</span>
    </h3>
  );
}

export default TopHeader;
