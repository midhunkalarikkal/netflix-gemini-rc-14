import { useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLogo } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constants";

const useFetchLogo = (id) => {
  const dispatch = useDispatch();
  const logos = useSelector((store) => store.movies.logos);

  const logo = useMemo(
    () => logos.find((logo) => logo.id === id),
    [logos, id]
  );

  const fetchLogo = useCallback(async () => {
    if (!id || logo) return;

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/images?language=en-US&include_image_language=en,null`,
        API_OPTIONS
      );
      const json = await response.json();

      const movieId = json?.id;
      const foundLogo =
        json?.logos.find((poster) => poster?.iso_639_1 === "en") || json?.logos[0];

      dispatch(addLogo({ id: movieId, logoPath: foundLogo?.file_path || "" }));
    } catch (error) {
      console.error("Error fetching logo:", error);
    }
  }, [dispatch, id, logo]);

  useEffect(() => {
    fetchLogo();
  }, [fetchLogo]);

  return logo;
};

export default useFetchLogo;
