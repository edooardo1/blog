import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

import styles from './ArticlePage.module.scss'

function ArticlePage() {
  const { slug } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`https://blog-platform.kata.academy/api/articles/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setArticle(data.article)
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to load article')
        setLoading(false)
      })
  }, [slug])

  if (loading) return <p className={styles.status}>Loading...</p>
  if (error) return <p className={styles.status}>{error}</p>
  if (!article) return null

  const {
    title,
    body,
    tagList,
    createdAt,
    author,
    favoritesCount,
  } = article

  const formattedDate = new Date(createdAt).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.top}>
          <div className={styles.titleBlock}>
            <h1 className={styles.title}>{title}</h1>
            <span className={styles.likes}>❤️ {favoritesCount}</span>
          </div>
          <div className={styles.author}>
            <div className={styles.info}>
              <div className={styles.name}>{author.username}</div>
              <div className={styles.date}>{formattedDate}</div>
            </div>
            <img src={author.image} alt="avatar" className={styles.avatar} />
          </div>
        </div>

        <div className={styles.tags}>
          {tagList.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>

        <div className={styles.content}>
          <ReactMarkdown>{body}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

export default ArticlePage
