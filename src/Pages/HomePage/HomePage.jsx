import React, { useEffect, useState } from 'react'
import { Pagination, Spin, Alert } from 'antd'

import getArticles from '../../API/articles'
import ArticleCard from '../../Components/ArticleCard/ArticleCard'
import Header from '../../Components/Header/Header'

import styles from './HomePage.module.scss'

const ARTICLES_PER_PAGE = 5

function HomePage() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await getArticles(currentPage, ARTICLES_PER_PAGE)
        setArticles(data.articles)
        setTotal(data.articlesCount)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [currentPage])

  const renderContent = () => {
    if (loading) {
      return (
        <div className={styles.spinner}>
          <Spin tip="Загрузка..." />
        </div>
      )
    }

    if (error) {
      return <Alert message="Ошибка" description={error} type="error" showIcon />
    }

    return (
      <>
        {articles.map((article) => (
          <ArticleCard
            key={article.slug}
            title={article.title}
            description={article.description}
            author={article.author}
            slug={article.slug}
            tagList={article.tagList}
            createdAt={article.createdAt}
            favorited={article.favorited}
            favoritesCount={article.favoritesCount}
          />
        ))}
        <Pagination
          current={currentPage}
          total={total}
          pageSize={ARTICLES_PER_PAGE}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
          className={styles.pagination}
        />
      </>
    )
  }

  return (
    <div>
      <Header />
      <div className={styles.container}>{renderContent()}</div>
    </div>
  )
}

export default HomePage
