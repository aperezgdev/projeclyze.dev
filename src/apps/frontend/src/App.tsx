import './App.css'
import { Route, Switch } from 'wouter'
import { Login } from './pages/Login'

function App() {
  return (
    <>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </>
  )
}

export default App
