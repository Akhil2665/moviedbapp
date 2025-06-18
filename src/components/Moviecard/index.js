import React from 'react'
import {Link, useHistory} from 'react-router-dom'
import './index.css'

const MovieCard = props => {
  const {movieDetails} = props
  const {title, releaseDate, posterPath, id, voteAverage} = movieDetails
  const history = useHistory()

  const imageUrl = posterPath
    ? `https://image.tmdb.org/t/p/w300${posterPath}`
    : 'https://via.placeholder.com/300x450?text=No+Image'

  const formattedVoteAverage = voteAverage
    ? `${voteAverage.toFixed(1)} `
    : 'N/A'
  const onClickedViewDetails = () => {
    console.log('onClickedViewDetails')
    history.push(`/movieDetails/${id}`)
  }

  return (
    <Link to={`/movieDetails/${id}`} className="movie-card-link">
      <li className="movie-card-container">
        <img src={imageUrl} alt={title} className="movie-poster-image" />
        <h3 className="movie-card-title">
          {title}
          {voteAverage !== undefined && (
            <span className="movie-rating">{formattedVoteAverage}</span>
          )}
        </h3>
        {releaseDate && (
          <p className="movie-release-date">{releaseDate.substring(0, 4)}</p>
        )}
        <button
          className="view-details-btn"
          type="button"
          onClick={onClickedViewDetails}
        >
          View Details
        </button>
      </li>
    </Link>
  )
}

export default MovieCard
