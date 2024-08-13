import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

export default class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  onLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify({username, password}),
    }
    const response = await fetch(url, options)
    const jsonResponse = await response.json()

    if (response.ok) {
      this.onSuccessLogin(jsonResponse.jwt_token)
    } else {
      this.onFailLogin(jsonResponse.error_msg)
    }
  }

  onSuccessLogin = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 3})
    const {history} = this.props
    history.replace('/')
  }

  onFailLogin = errorMsg => {
    this.setState({errorMsg, showErrorMsg: true})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, showErrorMsg, errorMsg} = this.state
    if (Cookies.get('jwt_token') !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-form-container">
        <form className="login-form" onSubmit={this.onLogin}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo"
          />
          <label htmlFor="username">USERNAME</label>
          <input
            id="username"
            type="text"
            value={username}
            className="input"
            placeholder="Username"
            onChange={this.onChangeUsername}
          />
          <label htmlFor="password">PASSWORD</label>
          <input
            id="password"
            type="password"
            value={password}
            placeholder="Password"
            className="input"
            onChange={this.onChangePassword}
          />
          <button type="submit" className="login-btn">
            Login
          </button>
          {showErrorMsg ? <p className="error-msg">{errorMsg}</p> : ''}
        </form>
      </div>
    )
  }
}
