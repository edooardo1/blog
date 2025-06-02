import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'

import { signUp } from '../../store/authSlice'

import styles from './SignUpPage.module.scss'

function SignUpPage() {
  const dispatch = useDispatch()
  const history = useHistory()
  const serverError = useSelector((state) => state.auth.error)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const passwordValue = watch('password')

  const onSubmit = (data) => {
    dispatch(signUp(data)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        history.push('/')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container} noValidate>
      <h2 className={styles.title}>Sign Up</h2>

      <div className={styles.field}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          {...register('username', {
            required: 'Username is required',
            minLength: { value: 3, message: 'Min 3 characters' },
            maxLength: { value: 20, message: 'Max 20 characters' },
          })}
        />
        {errors.username && <p className={styles.error}>{errors.username.message}</p>}
      </div>

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
            minLength: { value: 6, message: 'Min 6 characters' },
            maxLength: { value: 40, message: 'Max 40 characters' },
          })}
        />
        {errors.password && <p className={styles.error}>{errors.password.message}</p>}
      </div>

      <div className={styles.field}>
        <label htmlFor="repeatPassword">Repeat Password</label>
        <input
          id="repeatPassword"
          type="password"
          {...register('repeatPassword', {
            validate: (val) => val === passwordValue || 'Passwords do not match',
          })}
        />
        {errors.repeatPassword && <p className={styles.error}>{errors.repeatPassword.message}</p>}
      </div>

      <div className={styles.checkbox}>
        <input id="agree" type="checkbox" {...register('agree', { required: 'You must agree' })} />
        <label htmlFor="agree">I agree to the processing of my personal data</label>
      </div>

      {serverError && <p className={styles.error}>{JSON.stringify(serverError)}</p>}

      <button type="submit">Register</button>
      <p className={styles.footer}>
        Already have an account? <Link to="/sign-in">Sign In.</Link>
      </p>
    </form>
  )
}

export default SignUpPage
