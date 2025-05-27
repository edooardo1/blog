import React from 'react'
import { Link } from 'react-router-dom'
import { HeartOutlined } from '@ant-design/icons'

import styles from './ArticleCard.module.scss'

function ArticleCard({ title, slug, description, tagList, author, createdAt, favoritesCount }) {
  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <Link to={`/articles/${slug}`} className={styles.title}>
          {title}
        </Link>
        <button type="button" className={styles.likeButton}>
          <HeartOutlined className={styles.heartIcon} /> {favoritesCount}
        </button>
      </div>

      <div className={styles.tags}>
        {(tagList || []).map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>

      <div className={styles.description}>{description}</div>

      <div className={styles.footer}>
        <div className={styles.authorInfo}>
          <div className={styles.authorName}>{author?.username || 'No name'}</div>
          <div className={styles.date}>{createdAt ? new Date(createdAt).toLocaleDateString() : 'Unknown date'}</div>
        </div>
        {author?.image && <img src={author.image} alt={author.username} className={styles.avatar} />}
      </div>
    </div>
  )
}

export default ArticleCard
