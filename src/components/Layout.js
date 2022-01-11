import React from "react"

import PropTypes from "prop-types"

import Footer from "./Footer"
import Header from "./Header"

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout

Layout.propTypes = {
  children: PropTypes.any,
}
