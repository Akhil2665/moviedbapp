import React, {useState} from 'react'
import {NavLink as RouterNavLink, useHistory, Link} from 'react-router-dom'

// Import your CSS file
import './index.css' // Make sure this path is correct for your CSS file

const Navbar = () => {
  const [searchInput, setSearchInput] = useState('')
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const history = useHistory()

  const handleSearchInput = e => {
    setSearchInput(e.target.value)
  }

  const handleSearchClick = () => {
    if (searchInput.trim() !== '') {
      history.push(`/search?query=${encodeURIComponent(searchInput.trim())}`)
      setSearchInput('') // Clear search input after navigating
      setShowMobileMenu(false)
    }
  }

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleSearchClick()
    }
  }

  const toggleMobileMenu = () => {
    setShowMobileMenu(prevState => !prevState)
  }

  const handleNavLinkClick = path => {
    history.push(path)
    setShowMobileMenu(false) // Close mobile menu after navigation
  }

  return (
    <nav className="navbar-container">
      <Link to="/" className="nav-link">
        <h1 className="logo-heading">movieDB</h1>
      </Link>

      <nav className="nav-items-list">
        <Link to="/" className="nav-link">
          <h1 className="nav-item">Popular</h1>
        </Link>
        <Link to="/top-rated" className="nav-link">
          <h1 className="nav-item">Top Rated</h1>
        </Link>
        <Link to="/upcoming" className="nav-link">
          <h1 className="nav-item">Upcoming</h1>
        </Link>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchInput}
            onChange={handleSearchInput}
            className="search-input"
          />
          <button
            onClick={handleSearchClick}
            type="button"
            className="search-button"
          >
            Search
          </button>
        </div>
      </nav>
    </nav>
  )
}

export default Navbar
