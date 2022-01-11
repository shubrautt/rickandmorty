import React from "react"

import PropTypes from "prop-types"

const SelectData = ({ HandleSelect }) => {
  return (
    <select onChange={HandleSelect}>
      <option defaultValue="Short">All</option>
      <option>Male</option>
      <option>Female</option>
      <option>Alive</option>
      <option>Dead</option>
    </select>
  )
}

export default SelectData

SelectData.propTypes = {
  HandleSelect: PropTypes.func,
}
