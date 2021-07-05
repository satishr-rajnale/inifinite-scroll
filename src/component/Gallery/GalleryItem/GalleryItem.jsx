import React from "react";

const GalleryItem = ({
  images,
  lastImageElementRef,
  addAndRemoveFavourite,
}) => {
  return images.map((image, index) => {
    if (images.length === index + 1) {
      return (
        <li>
          <img
            ref={lastImageElementRef}
            key={image.id}
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
        <li>
          <img
            key={image.id}
            src={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`}
            alt={image.title}
          />
          <div className="textdiv1">
            <p className="p1">
              {image.title ? image.title.substr(0, 11) : "No title"}
            </p>
          </div>
          <div className="textdiv2">
            <hr />
          </div>
          <div className="textdiv3">
            {/* {image.title ? image.title.substr(0, 11) : "No author"} */}
            {"No author"}
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
