import React from 'react'
import { Link } from 'react-router-dom'

import LikeButton from '../LikeButton/LikeButton'

import styles from './ArticleCard.module.scss'

function ArticleCard({ article, onUpdate }) {
  const { slug, title, description, tagList, createdAt, author, favorited, favoritesCount } = article

  const formattedDate = new Date(createdAt).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <Link to={`/articles/${slug}`} className={styles.title}>
            {title}
          </Link>
        </div>
        <LikeButton slug={slug} favorited={favorited} favoritesCount={favoritesCount} onChange={onUpdate} />
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
        <img src={author.image} alt="avatar" className={styles.avatar} />
      </div>
    </div>
  )
}

export default ArticleCard
