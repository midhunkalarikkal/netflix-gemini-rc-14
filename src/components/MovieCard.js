import { IMG_CDN } from "../utils/constants"

const MovieCard = ({posterPath}) => {
  return (
    <div className="w-48 pr-1">
        <img src={IMG_CDN+posterPath} alt="movie_poster" />
    </div>
  )
}

export default MovieCard