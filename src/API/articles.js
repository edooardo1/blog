const getArticles = async (page = 1, limit = 5) => {
  const offset = (page - 1) * limit
  const response = await fetch(`https://blog-platform.kata.academy/api/articles?limit=${limit}&offset=${offset}`)

  if (!response.ok) {
    throw new Error('Failed to fetch articles')
  }

  const data = await response.json()
  return data
}

export default getArticles
