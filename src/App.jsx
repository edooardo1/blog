import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Header from './Components/Header/Header'
import HomePage from './Pages/HomePage/HomePage'
import ArticlePage from './Pages/ArticlePage/ArticlePage'
import SignInPage from './Pages/SignInPage/SignInPage'
import SignUpPage from './Pages/SignUpPage/SignUpPage'
import ProfilePage from './Pages/ProfilePage/ProfilePage'
import { fetchCurrentUser } from './store/authSlice'

function App() {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      dispatch(fetchCurrentUser())
    }
  }, [dispatch])

  return (
    <Router>
      <Header />
      <main>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/articles/:slug" component={ArticlePage} />
          <Route path="/sign-in" component={SignInPage} />
          <Route path="/sign-up" component={SignUpPage} />
          {isAuthenticated && <Route path="/profile" component={ProfilePage} />}
          <Route render={() => <h2>404 — Page Not Found</h2>} />
        </Switch>
      </main>
    </Router>
  )
}

export default App
