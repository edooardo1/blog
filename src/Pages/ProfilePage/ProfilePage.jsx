import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { updateUser } from '../../store/authSlice'

import styles from './ProfilePage.module.scss'

function ProfilePage() {
  const dispatch = useDispatch()
  const { user, error } = useSelector((state) => state.auth)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: user?.username || '',
      email: user?.email || '',
      password: '',
      image: user?.image || '',
    },
  })

  const onSubmit = (data) => {
    dispatch(updateUser(data))
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className={styles.title}>Edit Profile</h2>

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
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email format' },
          })}
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>

      <div className={styles.field}>
        <label htmlFor="password">New Password</label>
        <input
          id="password"
          type="password"
          {...register('password', {
            minLength: { value: 6, message: 'Min 6 characters' },
            maxLength: { value: 40, message: 'Max 40 characters' },
          })}
        />
        {errors.password && <p className={styles.error}>{errors.password.message}</p>}
      </div>

      <div className={styles.field}>
        <label htmlFor="image">Avatar image (url)</label>
        <input
          id="image"
          type="url"
          {...register('image', {
            pattern: {
              value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp|bmp|ico|tiff|avif|jfif|pjpeg|pjp))$/i,
              message: 'Invalid image URL',
            },
          })}
        />
        {errors.image && <p className={styles.error}>{errors.image.message}</p>}
      </div>

      {error && <p className={styles.error}>{JSON.stringify(error)}</p>}

      <button type="submit" className={styles.saveBtn}>
        Save
      </button>
    </form>
  )
}

export default ProfilePage
