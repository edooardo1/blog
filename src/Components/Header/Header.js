import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { logout } from '../../store/authSlice'

import styles from './Header.module.scss'

function Header() {
  const dispatch = useDispatch()
  const { user, isAuthenticated } = useSelector((state) => state.auth)

  const handleLogout = () => {
    localStorage.removeItem('token')
    dispatch(logout())
  }

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        Realworld Blog
      </Link>
      {isAuthenticated ? (
        <div className={styles.user}>
          <Link to="/new-article" className={styles.newArticle}>
            Create article
          </Link>
          <Link to="/profile" className={styles.username}>
            {user.username}
          </Link>
          <img src={user.image} alt="avatar" className={styles.avatar} />
          <button onClick={handleLogout} className={styles.logoutBtn}>
            Log Out
          </button>
        </div>
      ) : (
        <div className={styles.authButtons}>
          <Link to="/sign-in" className={styles.link}>
            Sign In
          </Link>
          <Link to="/sign-up" className={styles.link}>
            Sign Up
          </Link>
        </div>
      )}
    </header>
  )
}

export default Header
