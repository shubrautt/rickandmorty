import React from "react"

import { graphql } from "gatsby"

import PropTypes from "prop-types"
import "bulma/css/bulma.min.css"

const CharactersDeatils = ({ data }) => {
  const result = data.rickandmorty.character
  return (
    <div className="container pt-6 is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
      <img src={result.image} loading="lazy" alt={result.name} />
      <p className="is-size-3 my-2 has-text-weight-bold">
        {result.name + " "}{" "}
      </p>
      {result.status === "Alive" ? (
        <div className="">
          <span
            className="has-background-primary"
            style={{
              borderRadius: "50px",
              display: "inline-block",
              height: "6px",
              width: "6px",
            }}
          ></span>
          <span> Alive</span>
        </div>
      ) : (
        <div className="">
          <span
            className="has-background-danger"
            style={{
              borderRadius: "50px",
              display: "inline-block",
              height: "6px",
              width: "6px",
            }}
          ></span>
          <span> Dead</span>
        </div>
      )}
      <div className="mb-2">
        <span className="has-text-primary">Gender:</span>
        {result.name}
        {" / "} <span className="has-text-primary">Species:</span>
        {result.species}
      </div>
      <div className="mb-2">
        <span className="has-text-primary">Type: </span>
        {result.type || "NA"}
      </div>
      <div className="mb-2">
        <span className="has-text-primary">location: </span>
        {result.location.name || "NA"}
      </div>
      <p className="mb-2">{result.created}</p>
    </div>
  )
}

export default CharactersDeatils

export const query = graphql`
  query getCharacters($idnum: ID!) {
    rickandmorty {
      character(id: $idnum) {
        created
        image
        gender
        species
        status
        type
        name
        location {
          name
        }
      }
    }
  }
`

CharactersDeatils.propTypes = {
  data: PropTypes.object,
}
