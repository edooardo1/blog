import React from 'react'
import { Link } from 'react-router-dom'

import styles from './Header.module.scss'

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          Realworld Blog
        </Link>
        <div className={styles.auth}>
          <Link to="/login" className={styles.link}>
            Sign in
          </Link>
          <Link to="/register" className={styles.link}>
            Sign up
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
