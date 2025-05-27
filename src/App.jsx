import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import HomePage from './Pages/HomePage/HomePage'
import ArticlePage from './Pages/ArticlePage/ArticlePage'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/articles" />
        </Route>
        <Route exact path="/articles" component={HomePage} />
        <Route path="/articles/:slug" component={ArticlePage} />
      </Switch>
    </Router>
  )
}

export default App
