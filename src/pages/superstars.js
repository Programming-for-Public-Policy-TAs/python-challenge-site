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
          <h2>Challenge #1 Superstars</h2>
          <hr></hr>
          <div>
            <ul>• Ashu Tayal</ul>
            <ul>• Beth Karp</ul>
            <ul>• Bhavya Mishra</ul>
            <ul>• Cal Chengqi Fang</ul>
            <ul>• Haoxuan Liu</ul>
            <ul>• Ishan Nagpal</ul>
            <ul>• Masaaki Sato</ul>
            <ul>• Molly Blair</ul>
            <ul>• Shehryar Nabi</ul>
            <ul>• Wenxuan Tony Jia</ul>
            <ul>• Yuanqi Mao</ul>
            <ul>• Yuhang Ma</ul>
            <ul>• Yuqi Dong</ul>
            <ul>• Yuwen Xiong</ul>
            <ul>• Zimu Wan</ul>
          </div>
          <h2>Challenge #1 Honorable Mention</h2>
          <hr></hr>
          <div>
            <ul>• Grayson Clapp</ul>
            <ul>• Jingshuang Zhang</ul>
            <ul>• Mark Sheppard</ul>
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