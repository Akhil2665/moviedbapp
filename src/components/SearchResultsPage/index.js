import {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'

import './index.css'

import MovieCard from '../Moviecard'

const SearchResultsPage = () => {
  const location = useLocation()
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const fetchSearchResults = async query => {
    if (!query) {
      setSearchResults([])
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)
    const TMDB_API_KEY = process.env.REACT_APP_MOVIEDB_API_KEY

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
          query,
        )}&language=en-US&page=1`,
      )

      if (!response.ok) {
        throw new Error(`Search API error: ${response.statusText}`)
      }

      const data = await response.json()
      const updatedData = data.results.map(eachData => ({
        id: eachData.id,
        originalTitle: eachData.original_title,
        overview: eachData.overview,
        posterPath: eachData.poster_path,
        releaseDate: eachData.release_date,
        title: eachData.title,
        backdropPath: eachData.backdrop_path,
        voteAverage: eachData.vote_average,
      }))
      console.log('jsondata:', updatedData)
      setSearchResults(updatedData || [])
    } catch (err) {
      console.error('Error fetching search results:', err)
      setError('Failed to fetch search results. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const query = queryParams.get('query')
    setSearchQuery(query || '') // Set the query state

    fetchSearchResults(query)
  }, [location.search])

  if (loading) {
    return <p className="loading-state">Searching for {searchQuery}...</p>
  }

  if (error) {
    return <p className="error-message">{error}</p>
  }

  return (
    <div className="search-results-page">
      <h1 className="search-results-heading">
        Search Results for {searchQuery}
      </h1>
      {searchResults.length > 0 ? (
        <ul className="search-results-list">
          {searchResults.map(movie => (
            <MovieCard key={movie.id} movieDetails={movie} />
          ))}
        </ul>
      ) : (
        <p className="no-results-message">
          No results found for {searchQuery}. Please try a different search
          term.
        </p>
      )}
    </div>
  )
}

export default SearchResultsPage
