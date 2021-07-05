import { useEffect, useState } from "react";
const { REACT_APP_API_KEY, REACT_APP_URL } = process.env;

export default function useImageData(pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [images, setImages] = useState({ images: [] });
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    const fetchImageData = async () => {
      try {
        let response = await fetch(
          REACT_APP_URL +
            new URLSearchParams({
              page: pageNumber,
              api_key: REACT_APP_API_KEY,
              method: "flickr.photos.getRecent",
              per_page: 15,
              format: "json",
              tags: "random",
              nojsoncallback: 1,
            })
        );

        response = await response.json();

        setImages((prevImages) => {
          return {
            images: [
              ...new Set([...prevImages.images, ...response.photos.photo]),
            ],
          };
        });
        setHasMore(response.photos.photo.length > 0);
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };
    fetchImageData();
  }, [pageNumber]);

  return { loading, error, images, hasMore };
}
