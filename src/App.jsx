import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { fetchCurrentUser } from './store/authSlice'
import PrivateRoute from './Components/PrivateRoute/PrivateRoute'
import Header from './Components/Header/Header'
import HomePage from './Pages/HomePage/HomePage'
import ArticlePage from './Pages/ArticlePage/ArticlePage'
import SignInPage from './Pages/SignInPage/SignInPage'
import SignUpPage from './Pages/SignUpPage/SignUpPage'
import ProfilePage from './Pages/ProfilePage/ProfilePage'
import NewArticlePage from './Pages/NewArticlePage/NewArticlePage'
import EditArticlePage from './Pages/EditArticlePage/EditArticlePage'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      dispatch(fetchCurrentUser())
    }
  }, [dispatch])

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/articles/:slug" component={ArticlePage} />
        <PrivateRoute exact path="/articles/:slug/edit" component={EditArticlePage} />
        <PrivateRoute path="/new-article" component={NewArticlePage} />
        <PrivateRoute path="/profile" component={ProfilePage} />
        <Route path="/sign-in" component={SignInPage} />
        <Route path="/sign-up" component={SignUpPage} />
        {}
        {}
      </Switch>
    </Router>
  )
}

export default App
