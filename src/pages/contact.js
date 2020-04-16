import React from "react"
import Helmet from "react-helmet"
import { graphql } from 'gatsby'
import Layout from "../components/layout"

const ContactPage = ({
  data: {
    site
  },
}) => {
  return (
    <Layout>
      <Helmet>
        <title>Submit — {site.siteMetadata.title}</title>
        <meta name="description" content={site.siteMetadata.description} />
      </Helmet>
      <div className="two-grids -contact">
        <div className="post-thumbnail" style={{marginBottom: 0}}>
          <h1 className="post-title">Submit Your Solutions</h1>
          <p>Just enter your name and a link to your repo with solutions &rarr;</p>
        </div>
        <div>
          <form class="form-container" method="post" action="https://getform.io/f/2b432e36-852b-46e3-997d-4b8af3258460">
            <label>
              Full name
              <input type="text" name="name" id="name" />
            </label>
            <label>
              Challenge you're submitting for
              <input type="text" name="subject" id="subject" />
            </label>
            <label>
              Link to Github repository with your solution 
              <input type="text" name="message" id="message" />
            </label>
            <button type="submit" class="button -primary">Submit</button>
          </form>
        </div>
      </div>
    </Layout>
  )
}
export default ContactPage
export const pageQuery = graphql`
  query ContactPageQuery{
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`