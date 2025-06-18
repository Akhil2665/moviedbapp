import * as React from 'react'
// import Pagination from '@mui/material/Pagination'
import Loader from 'react-loader-spinner'

import MovieCard from '../Moviecard'

import './index.css'

const Home = () => {
  const [movieData, setMovieData] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [currentPage, setCurrentPage] = React.useState(1)

  const getResponse = async () => {
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US&page=${currentPage}`
    const response = await fetch(apiUrl)
    const jsonData = await response.json()
    console.log(jsonData)
    return jsonData.results
  }

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await getResponse()
      console.log(data, 'data')
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
        console.log(updatedData)
        setIsLoading(false)
        setMovieData(updatedData)
      }
    }

    fetchData() // Call the async function
  }, [currentPage])

  const incrementPageCount = () => {
    setCurrentPage(prevState => prevState + 1)
  }
  const decrementPageCount = () => {
    if (currentPage > 1) {
      setCurrentPage(prevState => prevState - 1)
    }
  }

  return (
    <>
      {isLoading ? (
        <div className="loader-container">
          <Loader type="TailSpin" color="#032541" />
        </div>
      ) : (
        <div>
          <h1>Popular</h1>
          <ul className="movies-list">
            {movieData.map(eachMovie => (
              <MovieCard key={eachMovie.id} movieDetails={eachMovie} />
            ))}
          </ul>
          <div className="pagination-controller-container">
            <button
              className="pagination-btn"
              type="button"
              onClick={decrementPageCount}
            >
              {`<`}
            </button>
            <span>{currentPage}</span>
            <button
              className="pagination-btn"
              type="button"
              onClick={incrementPageCount}
            >
              {`>`}
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Home
