import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Components/Home/Home';
import LandingPage from './Components/LandingPage/LandingPage';
import Detail from './Components/Detail/Detail';
import DogCreate from './Components/DogCreate/DogCreate';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route path='/home' component={Home} />
          <Route exact path='/dogs' component={DogCreate} />
          <Route path='/dogs/:id' component={Detail}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
