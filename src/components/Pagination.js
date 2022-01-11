import React, { useEffect, useState } from "react"

import { gql, GraphQLClient } from "graphql-request"
import PropTypes from "prop-types"

const Pagination = ({ CurrentPage, SetCurrentPage, IsLoading }) => {
  const [totalPages, setTotalPages] = useState()

  console.log(CurrentPage === 42 && IsLoading)

  useEffect(() => {
    const endpoint = "http://localhost:8000/___graphql"
    const variables = {
      pagenum: CurrentPage,
    }

    const query = gql`
      query {
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
  }, [CurrentPage])

  return (
    <div className="is-flex is-align-items-center">
      <button
        className="button mx-2"
        disabled={CurrentPage === 1 || IsLoading}
        onClick={() => {
          SetCurrentPage(CurrentPage - 1)
        }}
      >
        Prev
      </button>
      <p>{`${CurrentPage} of ${totalPages || " "}`}</p>
      <button
        className="button mx-2"
        disabled={CurrentPage === 42 || IsLoading}
        onClick={() => {
          SetCurrentPage(CurrentPage + 1)
        }}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination

Pagination.propTypes = {
  CurrentPage: PropTypes.number,
  IsLoading: PropTypes.bool,
  SetCurrentPage: PropTypes.func,
}
