/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

// below from https://www.gatsbyjs.org/docs/adding-markdown-pages/
const path = require(`path`)
const {
  createFilePath,
  createRemoteFileNode,
} = require(`gatsby-source-filesystem`)

const mediumCDNUrl = `https://cdn-images-1.medium.com/max/800/`
const mediumUrl = `https://medium.com/enemies-studio/`

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      featuredImage: File @link(from: "featuredImage___NODE")
      slug: String
    }
    type MediumPost implements Node {
      frontmatter: Frontmatter
      featuredImage: File @link(from: "featuredImage___NODE")
      externalUrl: String
    }
    type Frontmatter {
      title: String!
      motivator: String
      featuredImageUrl: String
      featuredImageAlt: String
    }
  `)
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage, createNodeField } = actions

  const blogPostTemplate = path.resolve(`src/templates/blogpost.js`)
  const projectTemplate = path.resolve(`src/templates/project.js`)

  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
      allMediumPost(sort: { fields: [createdAt], order: DESC }) {
        edges {
          node {
            createdAt
            uniqueSlug
            virtuals {
              previewImage {
                imageId
              }
            }
          }
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    const contentType = node.frontmatter.path.match(/^\/([^\/]*).*$/, "$1")[1]
    // const fileNode = getNode(node.parent)
    let template = null

    switch (contentType) {
      case "blog":
        template = blogPostTemplate
        break
      case "project":
        template = projectTemplate
        break
      default:
        template = blogPostTemplate
        break
    }

    createPage({
      path: node.frontmatter.path,
      component: template,
      context: {}, // additional data can be passed via context
    })
  })
}

exports.onCreateNode = async ({
  node,
  actions: { createNode, createNodeField },
  getNode,
  store,
  cache,
  createNodeId,
}) => {
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
  if (node.internal.type === `MediumPost`) {
    console.log("url", `${mediumUrl}${node.uniqueSlug}`)
    createNodeField({
      name: `externalUrl`,
      node,
      value: `${mediumUrl}${node.uniqueSlug}`,
    })
    if (node.virtuals.previewImage.imageId) {
      console.log(
        "image url",
        `${mediumCDNUrl}${node.virtuals.previewImage.imageId}`
      )
      let fileNode = await createRemoteFileNode({
        url: `${mediumCDNUrl}${node.virtuals.previewImage.imageId}`, // string that points to the URL of the image
        // if necessary!
        ext: ".jpg",
        name: "image",
        parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
        createNode, // helper function in gatsby-node to generate the node
        createNodeId, // helper function in gatsby-node to generate the node id
        cache, // Gatsby's cache
        store, // Gatsby's redux store
      })

      // if the file was created, attach the new node to the parent node
      if (fileNode) {
        node.featuredImage___NODE = fileNode.id
      }
    }
  }
}

// exports.onCreateNode = ({ node, getNode }) => {
//   if (node.internal.type === `MarkdownRemark`) {
//     const fileNode = getNode(node.parent)
//     console.log(`\n`, fileNode)
//     console.log(`\n`, fileNode.relativePath)
//   }
// }
