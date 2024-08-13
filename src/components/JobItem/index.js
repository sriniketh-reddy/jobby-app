import {Link} from 'react-router-dom'
import {BsStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const JobItem = props => {
  const {job} = props
  return (
    <li className="job-item">
      <Link className="job-link" to={`/jobs/${job.id}`}>
        <div className="job">
          <div className="job-top">
            <img
              src={job.companyLogoURL}
              alt="company logo"
              className="job-company-image"
            />
            <div className="job-top-title-container">
              <h1 className="job-title">{job.title}</h1>
              <div className="job-top-star-container">
                <BsStarFill className="star" />
                <p className="job-rating">{job.rating}</p>
              </div>
            </div>
          </div>
          <div className="job-bottom">
            <MdLocationOn className="job-icons" />
            <p className="job-location">{job.location}</p>
            <BsBriefcaseFill className="job-icons" />
            <p className="job-employment-type">{job.employmentType}</p>
            <p className="job-package">{job.packagePerAnnum}</p>
          </div>
          <hr className="hr" />
          <h1 className="des">Description</h1>
          <p>{job.jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobItem
