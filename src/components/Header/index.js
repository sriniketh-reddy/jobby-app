import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <ul className="nav-bar">
      <li className="nav-logo">
        <Link to="/" className="nav-link nav-item">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="header-logo"
            alt="website logo"
          />
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/" className="nav-link">
          Home
        </Link>
      </li>
      <li className="nav-jobs nav-item">
        <Link to="/jobs" className="nav-link">
          Jobs
        </Link>
      </li>
      <li className="nav-item">
        <button className="logout-btn" type="button" onClick={onLogout}>
          Logout
        </button>
      </li>
    </ul>
  )
}

export default withRouter(Header)
