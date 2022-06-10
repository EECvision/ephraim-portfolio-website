import './App.css'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Welcome from './pages/Welcome/Welcome'
import About from './pages/About/About'
import Project from './pages/Project/Project'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/project/:id" component={Project} />
          <Route exact path="/about" component={About} /> 
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
