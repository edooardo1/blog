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
    const fetchArticle = async () => {
      try {
        const response = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}`)
        if (!response.ok) {
          throw new Error('Ошибка загрузки статьи')
        }
        const data = await response.json()
        setArticle(data.article)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [slug])

  if (loading) return <p className={styles.message}>Загрузка статьи...</p>
  if (error) return <p className={styles.message}>Ошибка: {error}</p>
  if (!article) return <p className={styles.message}>Статья не найдена</p>

  const { title, body, tagList, author, createdAt, favoritesCount, description } = article

  return (
    <div className={styles.article}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.tags}>
            {(tagList || []).map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.likes}>
          <button type="button" className={styles.likeButton}>
            ♥ {favoritesCount}
          </button>
        </div>
      </div>

      <p className={styles.description}>{description}</p>

      <div className={styles.footer}>
        <div className={styles.authorInfo}>
          <div className={styles.authorName}>{author?.username || 'No name'}</div>
          <div className={styles.date}>{createdAt ? new Date(createdAt).toLocaleDateString() : 'Unknown date'}</div>
        </div>
        {author?.image && <img src={author.image} alt={author.username} className={styles.avatar} />}
      </div>

      <div className={styles.body}>
        <ReactMarkdown>{body}</ReactMarkdown>
      </div>
    </div>
  )
}

export default ArticlePage
