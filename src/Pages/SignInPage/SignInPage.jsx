import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'

import { signIn } from '../../store/authSlice'

import styles from './SignInPage.module.scss'

function SignInPage() {
  const dispatch = useDispatch()
  const history = useHistory()
  const serverError = useSelector((state) => state.auth.error)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    dispatch(signIn(data)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        history.push('/')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container} noValidate>
      <h2 className={styles.title}>Sign In</h2>

      <div className={styles.field}>
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Invalid email format',
            },
          })}
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>

      <div className={styles.field}>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          {...register('password', {
            required: 'Password is required',
          })}
        />
        {errors.password && <p className={styles.error}>{errors.password.message}</p>}
      </div>

      {serverError && <p className={styles.error}>{JSON.stringify(serverError)}</p>}

      <button type="submit">Login</button>
      <p className={styles.footer}>
        Don’t have an account? <Link to="/sign-up">Sign Up.</Link>
      </p>
    </form>
  )
}

export default SignInPage
