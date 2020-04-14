import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"
export default () => (
  <StaticQuery
    query={graphql`
      query HeadingQuery {
        site {
          siteMetadata {
            home {
              title
              description
            }
          }
        }
      }
    `}
    render={data => (
      <div className="hero-header">
        <div className="headline">{data.site.siteMetadata.home.title}</div>
        <br></br>
        <div className="primary-content">
          <p>Your friendly TAs have devised some extra hard practice problems for you to test your python coding skills and explore datasets that you won't see in class.
          Submit a correct answer to a weekly challenge and your name will be added to the <b>Python Superstars</b> section of this website. Challenges will be posted weekly.</p>
        </div>
        <Link to='/contact' className="button -primary">Submit your Solutions</Link>
        <Link to='/superstars' className="button -primary">⭐ Python Superstars ⭐</Link>
      </div>
    )}
  />
)