import React, { useEffect, useState } from "react"

import { gql, GraphQLClient } from "graphql-request"
import PropTypes from "prop-types"

const Pagination = ({ currentPage, setCurrentPage }) => {
  const [totalPages, setTotalPages] = useState()

  useEffect(() => {
    const endpoint = "http://localhost:8000/___graphql?"
    const variables = {
      pagenum: currentPage,
    }

    const query = gql`
      query getInfo {
        rickandmorty {
          characters {
            info {
              pages
            }
          }
        }
      }
    `
    const client = new GraphQLClient(endpoint, { headers: {} })
    client.request(query, variables).then((data) => {
      setTotalPages(data.rickandmorty.characters.info.pages)
    })
  }, [currentPage])

  return (
    <div className="is-flex is-align-items-center">
      <button
        className="button mx-2"
        disabled={currentPage === 1}
        onClick={() => {
          setCurrentPage(currentPage - 1)
        }}
      >
        Prev
      </button>
      <p>{`${currentPage} of ${totalPages || " "}`}</p>
      <button
        className="button mx-2"
        disabled={currentPage === 42}
        onClick={() => {
          setCurrentPage(currentPage + 1)
        }}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination

Pagination.propTypes = {
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
}
