import React, { useState, useEffect, useRef, useCallback } from "react";
import useImageData from "../../utility/useImageData";
import Loader from "../Shared/Loader";
import GalleryItem from "./GalleryItem/GalleryItem";
import "./Gallery.css";

const Gallery = () => {
  const [pageNumber, setPageNumber] = useState(1);
  // eslint-disable-next-line
  const [favouriteImage, setFavouriteImage] = useState(true);

  let favouriteImages = [];
  useEffect(() => {
    if (!localStorage["favouriteImages"]) {
      localStorage["favouriteImages"] = JSON.stringify(favouriteImages);
    }
    // eslint-disable-next-line
  }, []);

  // getting image data from API
  const { images, hasMore, loading, error } = useImageData(pageNumber);

  const observer = useRef();
  // this function use for infinite scroll
  const lastImageElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => {
            return prevPageNumber + 1;
          });
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );
  // this function use Add and Remove Favourite image
  const addAndRemoveFavourite = (id) => {
    if (!localStorage["favouriteImages"]) {
      favouriteImages.push(id);
    } else {
      favouriteImages = JSON.parse(localStorage["favouriteImages"]);
      const index = favouriteImages.indexOf(id);
      // this the login for checking if images id is already present then remove it else add it
      index > -1 ? favouriteImages.splice(index, 1) : favouriteImages.push(id);
    }
    localStorage["favouriteImages"] = JSON.stringify(favouriteImages);
    setFavouriteImage((prevFav) => !prevFav);
  };

  return (
    <div className="photo-container">
      <ul>
        <GalleryItem
          images={images.images}
          lastImageElementRef={lastImageElementRef}
          addAndRemoveFavourite={addAndRemoveFavourite}
        />
      </ul>
      {loading && <Loader />}
      <div>{error && "Error"}</div>
    </div>
  );
};

export default Gallery;
