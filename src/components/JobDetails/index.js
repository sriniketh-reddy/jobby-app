import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {FaExternalLinkAlt} from 'react-icons/fa'
import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'
import './index.css'

const states = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
}

export default class JobDetails extends Component {
  state = {
    status: states.initial,
    jobDetails: null,
    similarJobs: null,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({status: states.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
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
      const jobDetails = jsonResponse.job_details
      const similarJobs = jsonResponse.similar_jobs
      const upDatedDetails = {
        companyLogoURL: jobDetails.company_logo_url,
        companyWebsiteURL: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        skills: [
          ...jobDetails.skills.map(skill => ({
            imageURL: skill.image_url,
            name: skill.name,
          })),
        ],
        lifeAtCompany: {
          description: jobDetails.life_at_company.description,
          imageURL: jobDetails.life_at_company.image_url,
        },
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        title: jobDetails.title,
      }
      const upDatedSimilarJobs = [
        ...similarJobs.map(job => ({
          companyLogoURL: job.company_logo_url,
          employmentType: job.employment_type,
          id: job.id,
          jobDescription: job.job_description,
          location: job.location,
          rating: job.rating,
          title: job.title,
        })),
      ]
      this.setState({
        status: states.success,
        similarJobs: upDatedSimilarJobs,
        jobDetails: upDatedDetails,
      })
    } else {
      this.setState({status: states.failure})
    }
  }

  renderLoadingView = () => (
    <div className="job-d-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderDetails = () => {
    const {jobDetails, similarJobs} = this.state
    return (
      <>
        <div className="job-details">
          <div className="job-d-top">
            <img
              src={jobDetails.companyLogoURL}
              alt="job details company logo"
              className="job-d-company-image"
            />
            <div className="job-d-top-title-container">
              <h1 className="job-d-title">{jobDetails.title}</h1>
              <div className="job-d-top-star-container">
                <BsStarFill className="star" />
                <p className="job-d-rating">{jobDetails.rating}</p>
              </div>
            </div>
          </div>
          <div className="job-d-bottom">
            <MdLocationOn className="job-d-icons" />
            <p className="job-d-location">{jobDetails.location}</p>
            <BsBriefcaseFill className="job-d-icons" />
            <p className="job-d-employment-type">{jobDetails.employmentType}</p>
            <p className="job-d-package">{jobDetails.packagePerAnnum}</p>
          </div>
          <hr className="hr" />
          <div className="job-d-link-container">
            <h1 className="job-d-des">Description</h1>
            <a
              className="web-link"
              target="_blank"
              rel="noreferrer"
              href={jobDetails.companyWebsiteURL}
            >
              <p>Visit</p>
              <FaExternalLinkAlt className="link-icon" />
            </a>
          </div>
          <p>{jobDetails.jobDescription}</p>
          <h1 className="job-d-sk">Skills</h1>
          <ul className="skills-list">
            {jobDetails.skills.map(skill => (
              <li className="skill" key={skill.name}>
                <img
                  src={skill.imageURL}
                  alt={skill.name}
                  className="skill-img"
                />
                <p>{skill.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="job-d-lc">Life at Company</h1>
          <div className="job-d-lac-des-container">
            <p className="job-d-lac-des">
              {jobDetails.lifeAtCompany.description}
            </p>
            <img
              src={jobDetails.lifeAtCompany.imageURL}
              alt="life at company"
              className="lac-img"
            />
          </div>
        </div>
        <h1 className="job-deatils-sim-jobs">Similar Jobs</h1>
        <ul className="similar-jobs-list">
          {similarJobs.map(job => (
            <SimilarJobItem job={job} key={job.id} />
          ))}
        </ul>
      </>
    )
  }

  renderFailureView = () => (
    <div className="details-failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button
        type="button"
        onClick={this.getJobDetails}
        className="details-failure-view-btn"
      >
        Retry
      </button>
    </div>
  )

  renderJobDetails = () => {
    const {status} = this.state
    switch (status) {
      case states.inProgress:
        return this.renderLoadingView()
      case states.success:
        return this.renderDetails()
      case states.failure:
        return this.renderFailureView()
      default:
        return ''
    }
  }

  render() {
    return (
      <div className="job-details-main-container">
        <Header />
        <div className="job-details-container">{this.renderJobDetails()}</div>
      </div>
    )
  }
}
