import React, { Fragment } from "react";

import "./Banner.css";
import header from "../../images/header.png";

const Banner = () => {
  return (
    <Fragment>
      <div className="banner__container">
        <img className="banner__header" src={header} alt="header"></img>
        <div className="indecator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </Fragment>
  );
};

export default Banner;
