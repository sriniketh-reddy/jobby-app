import './index.css'

const Filters = props => {
  const {
    employmentTypesList,
    salaryRangesList,
    changeEmploymentTypes,
    changeSalaryRange,
  } = props
  const onChnageTypeOfJob = event => changeEmploymentTypes(event.target.value)
  const onChnageSalaryRange = event => changeSalaryRange(event.target.value)

  return (
    <>
      <hr className="hr" />
      <form onChange={onChnageTypeOfJob}>
        <h1 className="filters-h1">Type of Employment</h1>
        <ul className="filter-lists">
          {employmentTypesList.map(type => (
            <li className="filters-li" key={type.employmentTypeId}>
              <input
                type="checkbox"
                name="types"
                value={type.employmentTypeId}
                id={type.employmentTypeId}
              />
              <label htmlFor={type.employmentTypeId}>{type.label}</label>
            </li>
          ))}
        </ul>
      </form>
      <hr className="hr" />
      <form onChange={onChnageSalaryRange}>
        <h1 className="filters-h1">Salary Range</h1>
        <ul className="filter-lists">
          {salaryRangesList.map(range => (
            <li className="filters-li" key={range.salaryRangeId}>
              <input
                type="radio"
                name="range"
                value={range.salaryRangeId}
                id={range.salaryRangeId}
              />
              <label htmlFor={range.salaryRangeId}>{range.label}</label>
            </li>
          ))}
        </ul>
      </form>
    </>
  )
}

export default Filters
