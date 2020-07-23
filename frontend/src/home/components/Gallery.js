import React, { useEffect, useState, Fragment } from "react";

import "./Gallery.css";

import useHttpRequest from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/Modal/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import GalleryItem from "./GalleryItem";

const Gallery1 = () => {
  const [GalleryData, setGalleryData] = useState([]);
  const { isLoading, error, clearError, sendRequest } = useHttpRequest();

  const fetchPlaces = async () => {
    setGalleryData([]);
    const url = "/api/places";
    try {
      const responseData = await sendRequest(url);

      getRandomElements(responseData, 4);
    } catch (err) {
      console.log("Error in fetching places!", err);
    }
  };

  const getRandomElements = (sourceArray, neededElements) => {
    let result = [];
    for (var i = 0; i < neededElements; i++) {
      result.push(sourceArray[Math.floor(Math.random() * sourceArray.length)]);
    }
    setGalleryData(result);
    return result;
  };

  useEffect(() => {
    fetchPlaces();
  }, [sendRequest]);


  return (
    <Fragment>
    <div className="gallery">
      <h1 className="gallery-title">Gallery</h1>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading &&
        GalleryData.map((place, i) => (
          <GalleryItem
            key={i}
            image={place.image}
            title={place.title}
          />
        ))}
      </div>
    </Fragment>
  );
};

export default Gallery1;
