export const LOGO = "https://cdn.usbrandcolors.com/images/logos/netflix-logo.svg";

export const USER_LOGO = "https://wallpapers.com/images/high/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.webp";

export const API_OPTIONS = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer '+process.env.REACT_APP_TMDB_KEY
    }
  };

export const IMG_CDN = "https://image.tmdb.org/t/p/w500/";

export const LOGIN_BG_IMAGE = "https://assets.nflxext.com/ffe/siteui/vlv3/74d734ca-0eab-4cd9-871f-bca01823d872/web/IN-en-20241021-TRIFECTA-perspective_2277eb50-9da3-4fdf-adbe-74db0e9ee2cf_large.jpg";

export const supportedLanguages = [
  {identifier: "en", name : "English"},
  {identifier: "hi", name : "Hindi"},
  {identifier: "es", name : "Spanish"},
  {identifier: "ml", name : "Mlayalam"},
  {identifier: "ta", name : "Tamil"}
]

export const GEMINI_QUERY_INITAL = "Act a as movie recommendation system and suggest some movies for the query"

export const GEMINI_QUERY_END = ".only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Inception, Zindagi Na Milegi Dobara, Drishyam, Vikram, RRR, Kantara"

export const GEMINI_SEARCH_API_INITIAL = "https://api.themoviedb.org/3/search/movie?query="

export const GEMINI_SEARCH_API_END = "&include_adult=false&language=en-US&page=1"

export const IFRAME_URL_START = "https://www.youtube.com/embed/"

export const IFRAME_URL_END = "?autoplay=1&controls=0&mute=1&loop=1&playlist="

export const IFRAME_URL_END_BIGTRAILER = "?autoplay=1&controls=0&mute=0"

export const HAMBURGER_IMG = "https://img.icons8.com/ios-filled/50/e50914/menu--v1.png"

export const TMDB_BASE_URL = "https://api.themoviedb.org/3/movie/"

export const FETCH_MOVIE_TITLE_LOGO_END = "/images?language=en-US&include_image_language=en,null"

export const FETCH_MOVIE_TRAILER_END = "/videos?language=en-US"

