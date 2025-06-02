import React from 'react'
import { Link } from 'react-router-dom'

import styles from './ArticleCard.module.scss'

function ArticleCard({ article }) {
  const { title, slug, description, createdAt, author, favoritesCount, tagList } = article

  const formattedDate = new Date(createdAt).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className={styles.card}>
      <div className={styles.topRow}>
        <div>
          <Link to={`/articles/${slug}`} className={styles.title}>
            {title}
          </Link>
          <span className={styles.likes}>❤️ {favoritesCount}</span>
        </div>
        <div className={styles.authorBlock}>
          <div className={styles.user}>
            <div className={styles.username}>{author.username}</div>
            <div className={styles.date}>{formattedDate}</div>
          </div>
          <img className={styles.avatar} src={author.image} alt="avatar" />
        </div>
      </div>

      <p className={styles.description}>{description}</p>

      <div className={styles.tags}>
        {tagList.map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export default ArticleCard
