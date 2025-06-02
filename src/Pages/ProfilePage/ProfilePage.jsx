import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { updateUser } from '../../store/authSlice'

function ProfilePage() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const serverError = useSelector((state) => state.auth.error)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: user?.username || '',
      email: user?.email || '',
      image: user?.image || '',
    },
  })

  const username = register('username', { required: 'Username is required' })
  const email = register('email', {
    required: 'Email is required',
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: 'Invalid email',
    },
  })
  const newPassword = register('newPassword', {
    minLength: { value: 6, message: 'Min 6 characters' },
    maxLength: { value: 40, message: 'Max 40 characters' },
  })
  const image = register('image', {
    pattern: {
      value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i,
      message: 'Invalid image URL',
    },
  })

  const onSubmit = (data) => {
    const payload = {
      username: data.username,
      email: data.email,
      image: data.image,
    }
    if (data.newPassword) payload.password = data.newPassword
    dispatch(updateUser(payload))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2>Edit Profile</h2>

      <div className="formGroup">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name={username.name}
          type="text"
          ref={username.ref}
          onChange={username.onChange}
          onBlur={username.onBlur}
        />
        {errors.username && <p>{errors.username.message}</p>}
      </div>

      <div className="formGroup">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name={email.name}
          type="email"
          ref={email.ref}
          onChange={email.onChange}
          onBlur={email.onBlur}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div className="formGroup">
        <label htmlFor="newPassword">New Password</label>
        <input
          id="newPassword"
          name={newPassword.name}
          type="password"
          ref={newPassword.ref}
          onChange={newPassword.onChange}
          onBlur={newPassword.onBlur}
        />
        {errors.newPassword && <p>{errors.newPassword.message}</p>}
      </div>

      <div className="formGroup">
        <label htmlFor="image">Avatar URL</label>
        <input
          id="image"
          name={image.name}
          type="url"
          ref={image.ref}
          onChange={image.onChange}
          onBlur={image.onBlur}
        />
        {errors.image && <p>{errors.image.message}</p>}
      </div>

      {serverError && <p>{JSON.stringify(serverError)}</p>}
      <button type="submit">Save</button>
    </form>
  )
}

export default ProfilePage
