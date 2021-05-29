import React from 'react'
import Link from '../partials/Link'
import contextTypes from '../../contextTypes'
import logo from '../../../assets/img/logo.png'
import LeftBar from '../partials/LeftBar'
import './Articles.css'
import { parseMixedText } from '../../utils'
// END IMPORT SECTION

export default class Articles extends React.Component {

  static contextTypes = contextTypes

  constructor(props, context) {
    super(props, context)
    this.state = {
    // BEGIN STATE VARIABLES
    articles: context.getStore('ArticleStore').getState().articles
    // END STATE VARIABLES
    }
  }

  componentDidMount() {

  }

  // BEGIN ONCHANGE HANDLERS

  // END ONCHANGE HANDLERS

  // BEGIN RENDER METHODS
  renderArticles = (argument) => {
    if (this.state.articles) {
      console.log(this.state.articles[0].categories)
      let filteredArticles = this.state.articles.filter(article => article.categories.indexOf(argument) != -1 )
      let mappedArticles = filteredArticles.map((article, index) => {
        return (
          <div className='article' key={index}>
            <p className='article-title'>{parseMixedText(article.title)}</p>
            {article.imageUrl && <img className='article-img' src={article.imageUrl} />}
            { article.authors && <div className='article-authors'>
              {article.authors}
            </div>
          }
            <p className='article-details'>{parseMixedText(article.details)}</p>
            <div className='article-buttons'>
              {article.actions.map((action, index2) => {
                if (action.link) {
                  return (<a href={action.link} key={index2} style={{textDecoration: 'none'}}>
                    <div className='action-button'>
                      {action.title}
                    </div>
                  </a>)
                }
                else {
                  return (
                    <div className='action-button' key={index2}>
                      {action.title}
                    </div>
                  )
                }
              })}
            </div>
          </div>
        )
      })
      return (
        <div className='articles-container' >
          {mappedArticles.length > 0 ? mappedArticles :
          <p className='no-articles'>No articles to display at this time</p>}
        </div>
      )
    }
  }
  // END RENDER METHODS

  render() {
    return (
      <div className='articles'>
        <LeftBar />
        <div className='articles-main-container'>
          <div className='articles-title-container'>
            <p className='articles-title'>Blog Posts</p>
          </div>
          {this.renderArticles('blog')}
          {
            // <div className='articles-title-container'>
            //   <p className='articles-title'>Industry News</p>
            // </div>
            // {this.renderArticles('news')}
          }
          <div className='articles-title-container'>
            <p className='articles-title'>Quantum Papers</p>
          </div>
          {this.renderArticles('paper')}
        </div>
      </div>
    )
  }
}
