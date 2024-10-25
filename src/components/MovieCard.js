import { useSelector } from "react-redux"
import { IMG_CDN } from "../utils/constants"

const MovieCard = ({ movieId}) => {
  const metaData = useSelector((store) => store.movies?.metaData.find((movie) => movie.id === movieId))
  return (
    <div className="w-48 pr-1">
        <img src={IMG_CDN+metaData?.poster} alt="movie_poster" />
    </div>
  )
}

export default MovieCard