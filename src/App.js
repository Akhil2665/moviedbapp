import {Switch, Route, Redirect} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import UpcomingMovies from './components/UpcomingMovies'
import TopRatedMovies from './components/TopRatedMovies'
import MovieDetails from './components/MovieDetails'
import SearchResultsPage from './components/SearchResultsPage'

import './App.css'

// write your code here
const App = () => (
  <div className="app-container">
    <Navbar />
    <div className="main-content">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/upcoming" component={UpcomingMovies} />
        <Route exact path="/top-rated" component={TopRatedMovies} />
        <Route exact path="/movieDetails/:id" component={MovieDetails} />
        <Route exact path="/search" component={SearchResultsPage} />
        <Redirect to="/" />
      </Switch>
    </div>
  </div>
)

export default App
