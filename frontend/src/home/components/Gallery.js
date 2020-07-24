import React, { useEffect, useState } from "react";

import "./Gallery.css";

import useHttpRequest from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/Modal/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import GalleryItem from "./GalleryItem";
import EmptyGallery from "./EmptyGallery";

const Gallery = () => {
  const [galleryData, setGalleryData] = useState([]);
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
    for (let i = 0; i < neededElements; i++) {
      result.push(sourceArray[Math.floor(Math.random() * sourceArray.length)]);
    }
    /*  i commit this to make the array length zerro __ Naji pleace don not forget to delet this commit */

    // setGalleryData(result);
  };

  useEffect(() => {
    fetchPlaces();
  }, [sendRequest]);

  return (
    <div className="gallery">
      <h1 className="gallery-title">Gallery</h1>

      <ErrorModal error={error} onClear={clearError} />

      {isLoading && <LoadingSpinner asOverlay />}

      {!isLoading && galleryData.length > 0 ? (
        galleryData.map((place, i) => (
          <GalleryItem key={i} image={place.image} title={place.title} />
        ))
      ) : (
        <EmptyGallery />
      )}
    </div>
  );
};

export default Gallery;
