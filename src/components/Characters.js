import React, { useState, useEffect } from "react"

import { gql, GraphQLClient } from "graphql-request"
import "bulma/css/bulma.min.css"

import Card from "./Card"
import Pagination from "./Pagination"

const Characters = () => {
  const [currentPage, setCurrentPage] = useState(40)
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedeData, setSelectedeData] = useState({ gender: "", status: "" })

  useEffect(() => {
    setLoading(true)
    const endpoint = "http://localhost:8000/___graphql?"
    const variables = {
      gender: selectedeData.gender,
      pagenum: currentPage,
      status: selectedeData.status,
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
    client
      .request(query, variables)
      .then((data) => {
        setCharacters(data.rickandmorty.characters.results)
        setLoading(false)
      })
      .catch(() => {
        setCharacters([])
        setLoading(false)
      })
  }, [currentPage, selectedeData])

  const handleSelect = (e) => {
    console.log(e.target.value)
    if (e.target.value === "Male") {
      setSelectedeData({ gender: "Male", status: "" })
    } else if (e.target.value === "Female") {
      setSelectedeData({ gender: "female", status: "" })
    } else if (e.target.value === "Alive") {
      setSelectedeData({ gender: "", status: "Alive" })
    } else if (e.target.value === "Dead") {
      setSelectedeData({ gender: "", status: "Dead" })
    } else if (e.target.value === "All") {
      setSelectedeData({ gender: "", status: "" })
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
        ) : characters.length === 0 ? (
          <div>Nothing To Show</div>
        ) : (
          characters.map((character) => {
            return <Card Character={character} key={character.idd} />
          })
        )}
      </div>
      <div className="py-5">
        <Pagination
          CurrentPage={currentPage}
          SetCurrentPage={setCurrentPage}
          Loading={loading}
        />
      </div>
    </div>
  )
}

export default Characters
