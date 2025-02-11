export const LOGO = "https://cdn.usbrandcolors.com/images/logos/netflix-logo.svg";

export const USER_LOGO = "https://wallpapers.com/images/high/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.webp";

export const API_OPTIONS = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNTAwZjQ1ODFiODNhNzgzNTVjMjdkNTQ2ZDI4ODkyYiIsIm5iZiI6MTcyOTYxOTIwMi44MzI0MDMsInN1YiI6IjY3MTdlM2IzODY3MjM0YzJlMzE2ZjY4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.auwJfDn1iTyfuy3y_jbuoxubxRCHXf_8wHJSbaWjvIA'
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