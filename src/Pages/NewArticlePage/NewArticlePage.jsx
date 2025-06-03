import React from 'react'
import { useHistory } from 'react-router-dom'

import ArticleForm from '../../Components/ArticleForm/ArticleForm'

function NewArticlePage() {
  const history = useHistory()

  const handleSubmit = async (data) => {
    const res = await fetch('https://blog-platform.kata.academy/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        article: {
          title: data.title,
          description: data.description,
          body: data.body,
          tagList: data.tagList,
        },
      }),
    })

    const result = await res.json()

    if (res.ok) {
      history.push(`/articles/${result.article.slug}`)
    } else {
      alert('Failed to create article')
    }
  }

  return <ArticleForm onSubmit={handleSubmit} submitLabel="Create" />
}

export default NewArticlePage
