module.exports = {
  siteMetadata: {
    title: `The Rick And Morty`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "rickandmorty",
        fieldName: "rickandmorty",
        url: "https://rickandmortyapi.com/graphql",
      },
    },
  ],
}
