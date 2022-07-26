import LineChart from './LineChart';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/'  />
          <Route path='/reports'  />
          <Route path='/products'  />
        </Switch>
      </Router>
    </>
  );
}

export default App;
