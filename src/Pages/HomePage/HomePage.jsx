import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Pagination, Spin } from 'antd'

import ArticleCard from '../../Components/ArticleCard/ArticleCard'

import styles from './HomePage.module.scss'

function HomePage() {
  const { user } = useSelector((state) => state.auth)

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  const limit = 10
  const offset = (currentPage - 1) * limit

  const fetchArticles = () => {
    setLoading(true)

    const headers = user
      ? {
          Authorization: `Token ${localStorage.getItem('token')}`,
        }
      : {}

    fetch(`https://blog-platform.kata.academy/api/articles?limit=${limit}&offset=${offset}`, {
      headers,
    })
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.articles)
        setTotal(data.articlesCount)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    if (!user && localStorage.getItem('token')) return
    fetchArticles()
  }, [user, currentPage])

  const handleUpdate = (updatedArticle) => {
    setArticles((prev) => prev.map((a) => (a.slug === updatedArticle.slug ? updatedArticle : a)))
  }

  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loader}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} onUpdate={handleUpdate} />
          ))}
          <div className={styles.paginationWrapper}>
            <Pagination
              current={currentPage}
              total={total}
              pageSize={limit}
              onChange={(page) => setCurrentPage(page)}
              showSizeChanger={false}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default HomePage
