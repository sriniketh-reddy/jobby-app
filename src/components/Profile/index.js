import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'

const profileStates = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

export default class Profile extends Component {
  state = {
    profileStatus: profileStates.initial,
    userDetails: null,
  }

  componentDidMount() {
    this.getUserDetails()
  }

  getUserDetails = async () => {
    this.setState({profileStatus: profileStates.loading})
    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const jsonResponse = await response.json()
      const userDetails = {
        name: jsonResponse.profile_details.name,
        profileImageURL: jsonResponse.profile_details.profile_image_url,
        shortBio: jsonResponse.profile_details.short_bio,
      }
      this.setState({profileStatus: profileStates.success, userDetails})
    } else {
      this.setState({profileStatus: profileStates.failure})
    }
  }

  renderProfile = () => {
    const {userDetails} = this.state
    return (
      <div className="profile-conatiner">
        <img
          className="profile-img"
          src={userDetails.profileImageURL}
          alt="profile"
        />
        <h1 className="profile-h1">{userDetails.name}</h1>
        <p className="profile-p">{userDetails.shortBio}</p>
      </div>
    )
  }

  renderLoading = () => (
    <div className="profile-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="profile-failure-view">
      <button
        type="button"
        className="profile-failure-retry-btn"
        onClick={this.getUserDetails}
      >
        Retry
      </button>
    </div>
  )

  render() {
    const {profileStatus} = this.state
    switch (profileStatus) {
      case profileStates.loading:
        return this.renderLoading()
      case profileStates.success:
        return this.renderProfile()
      case profileStates.failure:
        return this.renderFailureView()
      default:
        return ''
    }
  }
}
