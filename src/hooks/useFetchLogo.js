import { addLogo } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useCallback, useMemo } from "react";
import { TMDB_BASE_URL, FETCH_MOVIE_TITLE_LOGO_END } from "../utils/constants";

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
        `${TMDB_BASE_URL}${id}${FETCH_MOVIE_TITLE_LOGO_END}`,
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
