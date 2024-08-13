import {BsStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const SimilarJobItem = props => {
  const {job} = props
  return (
    <li className="similar-job">
      <div className="similar-job-top">
        <img
          src={job.companyLogoURL}
          alt="similar job company logo"
          className="similar-job-company-logo"
        />
        <div>
          <h1 className="similar-job-type">{job.title}</h1>
          <div className="similar-job-star-container">
            <BsStarFill className="similar-job-star" />
            <p className="similar-job-rating">{job.rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similar-job-des">Description</h1>
      <p>{job.jobDescription}</p>
      <div className="similar-job-extra-detials-container">
        <MdLocationOn className="similar-job-icons" />
        <p className="similar-job-extra-p">{job.location}</p>
        <BsBriefcaseFill className="similar-job-icons" />
        <p className="similar-job-extra-p">{job.employmentType}</p>
      </div>
    </li>
  )
}

export default SimilarJobItem
