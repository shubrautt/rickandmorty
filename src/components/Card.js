import React from "react"

import { Link } from "gatsby"

import PropTypes from "prop-types"

const Card = ({ Character }) => {
  const { id, image, name, gender } = Character

  return (
    <Link to={`/character/${id}`}>
      <div className="card mx-3 my-3">
        <div className="card-image">
          <img
            src={image}
            alt="img"
            loading="lazy"
            style={{ height: "300px", width: "300px" }}
          />
        </div>
        <div className="card-header">
          <div className="card-header-title">
            {name} <div className="has-text-grey"> ({gender})</div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Card

Card.propTypes = {
  Character: PropTypes.object,
}
