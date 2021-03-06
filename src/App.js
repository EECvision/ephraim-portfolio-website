import './App.css'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Welcome from './pages/Welcome/Welcome'
import About from './pages/About/About'
import Home from './pages/Home/Home'
import Project from './pages/Project/Project'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/project/:id" component={Project} />
          <Route exact path="/about" component={About} /> 
          <Route exact path="/home" component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
