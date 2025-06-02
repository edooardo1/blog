import React, { useEffect, useState } from 'react'
import { Pagination } from 'antd'

import ArticleCard from '../../Components/ArticleCard/ArticleCard'

function HomePage() {
  const [articles, setArticles] = useState([])
  const [totalArticles, setTotalArticles] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const pageSize = 5
  const offset = (currentPage - 1) * pageSize

  useEffect(() => {
    setLoading(true)
    fetch(`https://blog-platform.kata.academy/api/articles?limit=${pageSize}&offset=${offset}`)
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.articles)
        setTotalArticles(data.articlesCount)
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to load articles')
        setLoading(false)
      })
  }, [currentPage])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <div style={{ padding: '40px 120px' }}>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && articles.map((article) => <ArticleCard key={article.slug} article={article} />)}

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={totalArticles}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  )
}

export default HomePage
