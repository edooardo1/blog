import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import styles from './ArticleForm.module.scss'

function ArticleForm({ onSubmit, initialValues = {}, submitLabel = 'Send' }) {
  const [tags, setTags] = useState(initialValues.tagList || [''])

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
    setTags([...tags, ''])
  }

  const handleDeleteTag = (index) => {
    const updatedTags = tags.filter((_, i) => i !== index)
    setTags(updatedTags)
  }

  const handleChangeTag = (index, value) => {
    const updatedTags = [...tags]
    updatedTags[index] = value
    setTags(updatedTags)
  }

  const submitHandler = (data) => {
    const trimmedTags = tags.map((tag) => tag.trim()).filter(Boolean)
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
          <div key={index} className={styles.tagRow}>
            <input type="text" value={tag} onChange={(e) => handleChangeTag(index, e.target.value)} placeholder="tag" />
            <button type="button" className={styles.deleteBtn} onClick={() => handleDeleteTag(index)}>
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
