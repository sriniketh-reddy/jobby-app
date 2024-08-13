import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const Home = props => {
  const {history} = props
  const findJobs = () => history.replace('/jobs')
  return (
    <>
      <Header />
      <div className="home">
        <div className="home-ic">
          <h1 className="home-h1">Find The Job That Fits Your Life</h1>
          <p className="home-p">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <Link to="/jobs">
            <button type="button" className="home-button" onClick={findJobs}>
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home
