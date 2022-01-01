import './App.css'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Welcome from './pages/Welcome/Welcome'
import ProjectOne from './pages/Project_1/Project_1'
import ProjectTwo from './pages/Project_2/Project_2'
import ProjectThree from './pages/Project_3/Project_3'
import About from './pages/About/About'
import Home from './pages/Home/Home'
import ProjectFour from './pages/project_4/Project_4'
import Landing from './pages/Landing/Landing'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/project-1" component={ProjectOne} />
          <Route exact path="/project-2" component={ProjectTwo} />
          <Route exact path="/project-3" component={ProjectThree} /> 
          <Route exact path="/project-4" component={ProjectFour} /> 
          <Route exact path="/about" component={About} /> 
          <Route exact path="/home" component={Home} />
          <Route exact path="/landing" component={Landing} />    
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
