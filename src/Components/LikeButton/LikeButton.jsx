import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import styles from './LikeButton.module.scss'

function LikeButton({ slug, favorited, favoritesCount, onChange }) {
  const { user } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const handleClick = async () => {
    if (!user) {
      history.push('/sign-in')
      return
    }

    setLoading(true)
    const method = favorited ? 'DELETE' : 'POST'

    try {
      const res = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}/favorite`, {
        method,
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      })

      const data = await res.json()
      if (res.ok && onChange) onChange(data.article)
    } catch (err) {
      err('Favorite toggle error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      type="button"
      className={`${styles.likeButton} ${favorited ? styles.active : ''}`}
      onClick={handleClick}
      disabled={loading}
    >
      {favorited ? '💖' : '🤍'} {favoritesCount}
    </button>
  )
}

export default LikeButton
