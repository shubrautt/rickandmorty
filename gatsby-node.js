const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const res = await graphql(`
    query Count {
      rickandmorty {
        characters {
          info {
            count
          }
        }
      }
    }
  `)

  const count = res.data.rickandmorty.characters.info.count
  const charactersTemplatePath = path.resolve(
    "src/templates/characters-details.js"
  )

  for (let i = 0; i <= count; i++) {
    createPage({
      component: charactersTemplatePath,
      context: {
        idnum: i,
      },
      path: `/character/${i}`,
    })
  }
}
