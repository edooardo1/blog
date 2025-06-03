import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import ArticleForm from '../../Components/ArticleForm/ArticleForm'

function EditArticlePage() {
  const { slug } = useParams()
  const history = useHistory()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}`)
        const data = await res.json()
        setArticle(data.article)
      } catch {
        setError('Failed to load article')
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [slug])

  const handleSubmit = async (formData) => {
    const res = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        article: {
          ...formData,
        },
      }),
    })

    if (res.ok) {
      history.push(`/articles/${slug}`)
    } else {
      alert('Failed to update article')
    }
  }

  if (loading) return <p style={{ padding: '2rem' }}>Loading...</p>
  if (error) return <p style={{ padding: '2rem', color: 'red' }}>{error}</p>

  return <ArticleForm onSubmit={handleSubmit} initialValues={article} submitLabel="Save" />
}

export default EditArticlePage
