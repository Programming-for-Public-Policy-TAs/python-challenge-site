import React from "react"
import Helmet from "react-helmet"
import { graphql } from 'gatsby'
import Layout from "../components/layout"

const SuperstarsPage = ({
  data: {
    site
  },
}) => {
  return (
    <Layout>
      <Helmet>
        <title>Python Superstars</title>
        <meta name="description" content={site.siteMetadata.description} />
      </Helmet>
      <div className="two-grids -contact">
        <div className="post-thumbnail" style={{backgroundImage: `url('/assets/alexander-andrews-HgUDpaGPTEA-unsplash.jpg')`, marginBottom: 0}}>
          <h1 className="post-title">Python Superstars</h1>

        </div>
      </div>
    </Layout>
  )
}
export default SuperstarsPage
export const pageQuery = graphql`
  query SuperstarsPageQuery{
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`