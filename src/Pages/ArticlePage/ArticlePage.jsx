import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Modal, Button } from 'antd'
import ReactMarkdown from 'react-markdown'

import styles from './ArticlePage.module.scss'

function ArticlePage() {
  const { slug } = useParams()
  const history = useHistory()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { user } = useSelector((state) => state.auth)

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

  const isOwner = user?.username === article?.author?.username

  const showDeleteConfirm = () => {
    Modal.confirm({
      title: 'Are you sure to delete this article?',
      okText: 'Yes',
      cancelText: 'No',
      okType: 'danger',
      centered: true,
      width: 400,
      onOk() {
        return fetch(`https://blog-platform.kata.academy/api/articles/${slug}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
        }).then((res) => {
          if (res.ok) {
            history.push('/')
          } else {
            Modal.error({
              title: 'Error',
              content: 'Failed to delete article.',
            })
          }
        })
      },
    })
  }

  if (loading) return <p className={styles.status}>Loading...</p>
  if (error) return <p className={styles.status}>{error}</p>
  if (!article) return null

  const { title, body, tagList, createdAt, author, favoritesCount, description } = article

  const formattedDate = new Date(createdAt).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <span className={styles.likes}>❤️ {favoritesCount}</span>
      </div>

      <div className={styles.tags}>
        {tagList.map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>

      <p className={styles.description}>{description}</p>

      <div className={styles.user}>
        <div className={styles.info}>
          <span className={styles.username}>{author.username}</span>
          <span className={styles.date}>{formattedDate}</span>
        </div>
        <img className={styles.avatar} src={author.image} alt="avatar" />
      </div>

      {isOwner && (
        <div className={styles.actions}>
          <Button type="primary" onClick={() => history.push(`/articles/${slug}/edit`)}>
            Edit
          </Button>
          <Button danger onClick={showDeleteConfirm}>
            Delete
          </Button>
        </div>
      )}

      <div className={styles.body}>
        <ReactMarkdown>{body}</ReactMarkdown>
      </div>
    </div>
  )
}

export default ArticlePage
