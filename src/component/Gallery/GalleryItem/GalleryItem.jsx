import React from "react";

// addAndRemoveFavourite i am using for track the last images loaded
const GalleryItem = ({
  images,
  lastImageElementRef,
  addAndRemoveFavourite,
}) => {
  return images.map((image, index) => {
    if (images.length === index + 1) {
      return (
        <li key={image.id}>
          <img
            ref={lastImageElementRef}
            src={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`}
            alt={image.title}
          />
          <div>
            <p>{image.title}</p>
          </div>
        </li>
      );
    } else {
      return (
        <li key={image.id}>
          <img
            src={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`}
            alt={image.title}
          />
          <div className="title">
            <p className="p1">
              {image.title ? image.title.substr(0, 11) : "No title"}
            </p>
          </div>
          <div className="hrdiv">
            <hr />
          </div>
          <div className="author">
            {image.title ? image.title.substr(3, 11) : "No author"}
          </div>
          <div
            onClick={() => {
              addAndRemoveFavourite(image.id);
            }}
            className={`textdiv ${
              JSON.parse(localStorage["favouriteImages"]).includes(image.id)
                ? "favourite"
                : "notfavourite"
            }`}
          >
            {"Favourite"}
          </div>
        </li>
      );
    }
  });
};

export default GalleryItem;
