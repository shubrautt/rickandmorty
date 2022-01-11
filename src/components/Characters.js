import React, { useState, useEffect } from "react"

import { Link } from "gatsby"

import { gql, GraphQLClient } from "graphql-request"
import "bulma/css/bulma.min.css"

import Pagination from "./Pagination"

const Characters = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)
  const [shortData, setShortData] = useState({ gender: "", status: "" })

  useEffect(() => {
    setLoading(true)
    const endpoint = "http://localhost:8000/___graphql?"
    const variables = {
      gender: shortData.gender,
      pagenum: currentPage,
      status: shortData.status,
    }

    const query = gql`
      query getCharacters($gender: String, $status: String, $pagenum: Int!) {
        rickandmorty {
          characters(
            filter: { gender: $gender, status: $status }
            page: $pagenum
          ) {
            results {
              name
              image
              status
              gender
              id
            }
          }
        }
      }
    `
    const client = new GraphQLClient(endpoint, { headers: {} })
    client.request(query, variables).then((data) => {
      setCharacters(data.rickandmorty.characters.results)
      setLoading(false)
    })
  }, [currentPage, shortData])

  const handleSelect = (e) => {
    console.log(e.target.value)
    if (e.target.value === "Male") {
      setShortData({ gender: "Male", status: "" })
    } else if (e.target.value === "Female") {
      setShortData({ gender: "female", status: "" })
    } else if (e.target.value === "Alive") {
      setShortData({ gender: "", status: "Alive" })
    } else if (e.target.value === "Dead") {
      setShortData({ gender: "", status: "Dead" })
    } else if (e.target.value === "All") {
      setShortData({ gender: "", status: "" })
    }
  }

  return (
    <div className="conatiner is-flex is-flex-direction-column is-align-items-center">
      <div className="select my-5">
        <select onChange={handleSelect}>
          <option defaultValue="Short">All</option>
          <option>Male</option>
          <option>Female</option>
          <option>Alive</option>
          <option>Dead</option>
        </select>
      </div>
      <div className="is-flex is-flex-wrap-wrap is-justify-content-center pt-2">
        {loading ? (
          <p>
            <button className="button is-white is-loading is-size-1">
              Loading
            </button>
          </p>
        ) : (
          characters.map((character) => {
            return (
              <Link to={`/character/${character.id}`} key={character.id}>
                <div className="card mx-3 my-3">
                  <div className="card-image">
                    <img
                      src={character.image}
                      alt="img"
                      loading="lazy"
                      style={{ height: "300px", width: "300px" }}
                    />
                  </div>
                  <div className="card-header">
                    <div className="card-header-title">
                      {character.name}{" "}
                      <div className="has-text-grey"> ({character.gender})</div>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })
        )}
      </div>
      <div className="py-5">
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  )
}

export default Characters
