import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import Profile from '../Profile'
import JobItem from '../JobItem'
import Filters from '../Filters'
import './index.css'

const jobsRenderingStates = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
  noJobs: 'NOJOBS',
}

export default class Jobs extends Component {
  state = {
    employmentTypes: [],
    salaryRange: '',
    jobsList: [],
    renderJobsStatus: jobsRenderingStates.initial,
    searchInput: '',
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({renderJobsStatus: jobsRenderingStates.inProgress})
    const {employmentTypes, salaryRange, searchInput} = this.state
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypes.join(
      ',',
    )}&minimum_package=${salaryRange}&search=${searchInput}`
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
      const jobsList = [
        ...jsonResponse.jobs.map(job => ({
          companyLogoURL: job.company_logo_url,
          employmentType: job.employment_type,
          id: job.id,
          jobDescription: job.job_description,
          location: job.location,
          packagePerAnnum: job.package_per_annum,
          rating: job.rating,
          title: job.title,
        })),
      ]
      if (jobsList.length === 0) {
        this.setState({renderJobsStatus: jobsRenderingStates.noJobs})
      } else {
        this.setState({jobsList, renderJobsStatus: jobsRenderingStates.success})
      }
    } else {
      this.setState({renderJobsStatus: jobsRenderingStates.failure})
    }
  }

  changeSalaryRange = salaryRange => this.setState({salaryRange}, this.getJobs)

  changeEmploymentTypes = type => {
    const {employmentTypes} = this.state
    if (employmentTypes.includes(type)) {
      this.setState(
        prev => ({
          employmentTypes: [...prev.employmentTypes.filter(t => t !== type)],
        }),
        this.getJobs,
      )
    } else {
      this.setState(
        prev => ({
          employmentTypes: [...prev.employmentTypes, type],
        }),
        this.getJobs,
      )
    }
  }

  changeSearchInput = event => this.setState({searchInput: event.target.value})

  onSearch = () => this.getJobs()

  renderLoadingView = () => (
    <div className="job-list-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="jobs-failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-view-img"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button
        type="button"
        onClick={this.getJobs}
        className="jobs-failure-view-btn"
      >
        Retry
      </button>
    </div>
  )

  renderJobs = () => {
    const {jobsList} = this.state
    return (
      <ul className="jobs-list">
        {jobsList.map(job => (
          <JobItem key={job.id} job={job} />
        ))}
      </ul>
    )
  }

  renderNoJobs = () => (
    <div className="no-jobs-conatiner">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-conatiner-img"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters.</p>
    </div>
  )

  renderJobsList = () => {
    const {renderJobsStatus} = this.state
    switch (renderJobsStatus) {
      case jobsRenderingStates.inProgress:
        return this.renderLoadingView()
      case jobsRenderingStates.success:
        return this.renderJobs()
      case jobsRenderingStates.failure:
        return this.renderFailureView()
      case jobsRenderingStates.noJobs:
        return this.renderNoJobs()
      default:
        return ''
    }
  }

  render() {
    const {employmentTypesList, salaryRangesList} = this.props
    const {searchInput} = this.state
    return (
      <div className="jobs-container">
        <Header />
        <div className="jobs-filters-container">
          <div className="profile-filters-conatiner">
            <Profile />
            <Filters
              changeSalaryRange={this.changeSalaryRange}
              changeEmploymentTypes={this.changeEmploymentTypes}
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
            />
          </div>
          <div className="jobs-conatiner">
            <div className="search-container">
              <input
                type="search"
                value={searchInput}
                className="search-input"
                onChange={this.changeSearchInput}
                placeholder="Search"
              />
              <button
                type="button"
                data-testid="searchButton"
                onClick={this.onSearch}
                className="search-btn"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderJobsList()}
          </div>
        </div>
      </div>
    )
  }
}
