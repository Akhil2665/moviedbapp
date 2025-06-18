import React, {useState, useEffect, useCallback} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

const MovieDetails = ({match}) => {
  const [movie, setMovie] = useState(null)
  const [castData, setCastData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const movieId = match.params.id

  const fetchMovieDetails = useCallback(async () => {
    setLoading(true)
    setError(null)
    const TMDB_API_KEY = process.env.REACT_APP_MOVIEDB_API_KEY

    const castApiUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${TMDB_API_KEY}&language=en-US`
    const movieDetailsApiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US`

    try {
      const [movieResponse, castResponse] = await Promise.all([
        fetch(movieDetailsApiUrl),
        fetch(castApiUrl),
      ])

      if (!movieResponse.ok) {
        throw new Error(`Movie details API error: ${movieResponse.statusText}`)
      }
      if (!castResponse.ok) {
        throw new Error(`Cast details API error: ${castResponse.statusText}`)
      }

      const movieData = await movieResponse.json()
      const castJsonData = await castResponse.json()

      const updatedCastData = castJsonData.cast.map(eachObj => ({
        id: eachObj.id,
        knownForDepartment: eachObj.known_for_department,
        name: eachObj.name,
        profilePath: eachObj.profile_path,
        character: eachObj.character,
      }))

      const movieUpdatedData = {
        backdropPath: movieData.backdrop_path,
        budget: movieData.budget,
        title: movieData.title,
        posterPath: movieData.poster_path,
        releaseDate: movieData.release_date,
        runtime: movieData.runtime, // in minutes
        revenue: movieData.revenue,
        status: movieData.status,
        overview: movieData.overview,
        productionCompanies: movieData.production_companies.map(eachComp => ({
          id: eachComp.id,
          logoPath: eachComp.logo_path,
          name: eachComp.name,
          originCountry: eachComp.origin_country,
        })),
        spokenLanguages: movieData.spoken_languages.map(eachLang => ({
          englishName: eachLang.english_name,
          iso_639_1: eachLang.iso_639_1, // useful if you want to display the short code
        })),
      }

      setMovie(movieUpdatedData)
      setCastData(updatedCastData)
    } catch (err) {
      console.error('Error fetching movie details:', err)
      setError('Failed to load movie details. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [movieId]) // Depend on movieId to re-fetch when it changes

  useEffect(() => {
    fetchMovieDetails()
  }, [fetchMovieDetails]) // Depend on fetchMovieDetails memoized function

  // Helper for formatting currency
  const formatCurrency = value => {
    if (value === 0 || !value) return 'N/A'
    return `$ ${value}` // e.g., $1,234,567
  }

  if (loading) {
    return (
      <div className="loader-container">
        <Loader type="TailSpin" color="#032541" />
      </div>
    )
  }

  if (error) {
    return <p className="error-message">{error}</p>
  }

  if (!movie) {
    // This case should ideally be covered by loading/error, but as a fallback
    return <p className="error-message">No movie data found.</p>
  }

  // Set inline style for backdrop image
  const backdropStyle = movie.backdropPath
    ? {
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdropPath})`,
      }
    : {}

  return (
    <div className="movie-details-page">
      {/* Backdrop and Main Info Section */}
      <div className="backdrop-section" style={backdropStyle}>
        <img
          className="poster-image"
          src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
          alt={`${movie.title} Poster`}
        />
        <div className="main-content-area">
          <h1 className="movie-title">{movie.title}</h1>
          <p className="release-date">Release Date: {movie.releaseDate}</p>
          {/* Details Grid (Runtime, Budget, Revenue, Status) */}
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Runtime:</span>
              <span className="detail-value">{movie.runtime} min</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Budget:</span>
              <span className="detail-value">
                {formatCurrency(movie.budget)}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Revenue:</span>
              <span className="detail-value">
                {formatCurrency(movie.revenue)}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Status:</span>
              <span className="detail-value">{movie.status}</span>
            </div>
          </div>
          <p className="movie-overview">{movie.overview}</p>

          {/* Spoken Languages */}
          {movie.spokenLanguages && movie.spokenLanguages.length > 0 && (
            <>
              <h2 className="sub-heading">Spoken Languages</h2>
              <ul className="language-list">
                {movie.spokenLanguages.map(lang => (
                  <li className="language-item" key={lang.englishName}>
                    {lang.englishName}
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Production Companies */}
          {movie.productionCompanies && movie.productionCompanies.length > 0 && (
            <>
              <h2 className="sub-heading">Production Companies</h2>
              <ul className="production-companies-grid">
                {movie.productionCompanies.map(eachProductionComp => (
                  <li
                    className="production-company-card"
                    key={eachProductionComp.id}
                  >
                    {eachProductionComp.logoPath && (
                      <>
                        {console.log(
                          `https://image.tmdb.org/t/p/w200${eachProductionComp.logoPath}`,
                        )}
                        <img
                          className="company-logo"
                          src={`https://image.tmdb.org/t/p/w200${eachProductionComp.logoPath}`}
                          alt={eachProductionComp.name}
                        />
                      </>
                    )}
                    <p className="company-name">{eachProductionComp.name}</p>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      {/* Cast Details */}
      {castData && castData.length > 0 && (
        <>
          <h2 className="sub-heading">Cast Details</h2>
          <ul className="cast-grid">
            {castData.map(
              eachCastData =>
                eachCastData.profilePath && ( // Only render if profilePath exists
                  <li className="cast-card" key={eachCastData.id}>
                    <img
                      className="cast-profile-image"
                      src={`https://image.tmdb.org/t/p/w200${eachCastData.profilePath}`}
                      alt={eachCastData.name}
                    />
                    <p className="cast-name">{eachCastData.name}</p>
                    <p className="character-name">{eachCastData.character}</p>
                  </li>
                ),
            )}
          </ul>
        </>
      )}
    </div>
  )
}

export default MovieDetails
