import React, { Fragment } from "react";

import "./GalleryItem.css";

const GalleryItem = ({ image, title }) => {
  return (
    <Fragment>
        <div className="photo">
          <span className="screen">
            <h3 className="title">{title}</h3>
          </span>
          <img className="img" src={image} alt={title} />
        </div>
    </Fragment>
  );
};

export default GalleryItem;


