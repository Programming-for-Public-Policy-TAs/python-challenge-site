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
        <title className="headline">Python Superstars</title>
        <meta name="description" content={site.siteMetadata.description} />
      </Helmet>
      <div className="two-grids -contact">
        <div className="post-thumbnail" >
          <h1 className="post-title">⭐ Python Superstars ⭐</h1>
        </div>
      </div>
      <div>
        <div>
          <h2>Challenge #1</h2>
          <hr></hr>
          <div>
            <ul>• Nobody yet....</ul>
          </div>
        </div>
        <br></br>
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