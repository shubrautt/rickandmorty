import React, { useState, useEffect } from "react"

import { gql, GraphQLClient } from "graphql-request"
import "bulma/css/bulma.min.css"

import Card from "./Card"
import Pagination from "./Pagination"
import SelectData from "./SelectData"

const Characters = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [characters, setCharacters] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedData, setSelectedData] = useState({ gender: "", status: "" })

  useEffect(() => {
    setIsLoading(true)
    const endpoints = "https://rickandmortyapi.com/graphql"
    const variables = {
      gender: selectedData.gender,
      pagenum: currentPage,
      status: selectedData.status,
    }

    const query = gql`
      query getChar($gender: String, $status: String, $pagenum: Int!) {
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
    `
    const client = new GraphQLClient(endpoints)
    client
      .request(query, variables)
      .then((data) => {
        setCharacters(data.characters.results)
        setIsLoading(false)
      })
      .catch(() => {
        setCharacters([])
        setIsLoading(false)
      })
  }, [currentPage, selectedData])

  const handleSelect = (e) => {
    console.log(e.target.value)
    if (e.target.value === "Male") {
      setSelectedData({ gender: "Male", status: "" })
      setCurrentPage(1)
    } else if (e.target.value === "Female") {
      setSelectedData({ gender: "female", status: "" })
      setCurrentPage(1)
    } else if (e.target.value === "Alive") {
      setSelectedData({ gender: "", status: "Alive" })
      setCurrentPage(1)
    } else if (e.target.value === "Dead") {
      setSelectedData({ gender: "", status: "Dead" })
      setCurrentPage(1)
    } else if (e.target.value === "All") {
      setSelectedData({ gender: "", status: "" })
      setCurrentPage(1)
    }
  }

  return (
    <div className="conatiner is-flex is-flex-direction-column is-align-items-center">
      <div className="select my-5">
        <SelectData HandleSelect={handleSelect} />
      </div>
      <div className="is-flex is-flex-wrap-wrap is-justify-content-center pt-2">
        {isLoading ? (
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
          IsLoading={isLoading}
        />
      </div>
    </div>
  )
}

export default Characters
