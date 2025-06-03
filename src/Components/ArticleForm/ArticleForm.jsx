import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'

import styles from './ArticleForm.module.scss'

function ArticleForm({ onSubmit, initialValues = {}, submitLabel = 'Send' }) {
  const [tags, setTags] = useState(
    (initialValues.tagList || ['']).map((tag) => ({
      id: uuidv4(),
      value: tag,
    }))
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: initialValues.title || '',
      description: initialValues.description || '',
      body: initialValues.body || '',
    },
  })

  const handleAddTag = () => {
    setTags([...tags, { id: uuidv4(), value: '' }])
  }

  const handleDeleteTag = (id) => {
    setTags(tags.filter((tag) => tag.id !== id))
  }

  const handleChangeTag = (id, value) => {
    setTags(tags.map((tag) => (tag.id === id ? { ...tag, value } : tag)))
  }

  const submitHandler = (data) => {
    const trimmedTags = tags.map((tag) => tag.value.trim()).filter(Boolean)
    onSubmit({ ...data, tagList: trimmedTags })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(submitHandler)} noValidate>
      <h2 className={styles.title}>Create New Article</h2>

      <div className={styles.field}>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" {...register('title', { required: 'Title is required' })} placeholder="title" />
        {errors.title && <p className={styles.error}>{errors.title.message}</p>}
      </div>

      <div className={styles.field}>
        <label htmlFor="description">Short description</label>
        <input
          id="description"
          type="text"
          {...register('description', { required: 'Description is required' })}
          placeholder="Short description"
        />
        {errors.description && <p className={styles.error}>{errors.description.message}</p>}
      </div>

      <div className={styles.field}>
        <label htmlFor="body">Text</label>
        <textarea id="body" rows={8} {...register('body', { required: 'Text is required' })} placeholder="text" />
        {errors.body && <p className={styles.error}>{errors.body.message}</p>}
      </div>

      <div className={styles.field}>
        <label htmlFor="tag">Tags</label>
        {tags.map((tag, index) => (
          <div key={tag.id} className={styles.tagRow}>
            <input
              type="text"
              value={tag.value}
              onChange={(e) => handleChangeTag(tag.id, e.target.value)}
              placeholder="tag"
            />
            <button type="button" className={styles.deleteBtn} onClick={() => handleDeleteTag(tag.id)}>
              Delete
            </button>
            {index === tags.length - 1 && (
              <button type="button" className={styles.addBtn} onClick={handleAddTag}>
                Add tag
              </button>
            )}
          </div>
        ))}
      </div>

      <button type="submit" className={styles.button}>
        {submitLabel}
      </button>
    </form>
  )
}

export default ArticleForm
