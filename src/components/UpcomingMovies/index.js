import * as React from 'react'

import Loader from 'react-loader-spinner'

import MovieCard from '../Moviecard'
import Pagination from '../Pagination'

import './index.css'

const UpcomingMovies = () => {
  const [movieData, setMovieData] = React.useState([])
  const [currentPage, setCurrentPage] = React.useState(1)
  const [isLoading, setIsLoading] = React.useState(true)
  const [totalPages, setTotalPages] = React.useState(1)

  const getResponse = async () => {
    const apiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US&page=${currentPage}`
    const response = await fetch(apiUrl)
    const jsonData = await response.json()
    setTotalPages(jsonData.total_pages)
    return jsonData.results
  }

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await getResponse()
      // console.log(data, 'data')
      const updatedData = data.map(eachData => ({
        id: eachData.id,
        originalTitle: eachData.original_title,
        overview: eachData.overview,
        posterPath: eachData.poster_path,
        releaseDate: eachData.release_date,
        title: eachData.title,
        backdropPath: eachData.backdrop_path,
        voteAverage: eachData.vote_average,
      }))
      if (data) {
        // console.log(updatedData)
        setIsLoading(false)
        setMovieData(updatedData)
      }
    }

    fetchData() // Call the async function
  }, [currentPage])

  const getResponseOfCurrentPage = pageNum => {
    console.log('pageNum', pageNum)
    setCurrentPage(pageNum)
  }

  return (
    <>
      {isLoading ? (
        <div className="loader-container">
          <Loader type="TailSpin" color="#032541" />
        </div>
      ) : (
        <div>
          <h1>Upcoming</h1>
          <ul className="movies-list">
            {movieData.map(eachMovie => (
              <MovieCard key={eachMovie.id} movieDetails={eachMovie} />
            ))}
          </ul>
          <div className="pagination-controller-container">
            <Pagination
              totalPages={totalPages}
              apiCallback={getResponseOfCurrentPage}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default UpcomingMovies
