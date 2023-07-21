import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import TrainsList from './Components/TrainsList';
import SingleTrain from './Components/SingleTrain';

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <Switch>
        <Route exact path="/" component={TrainsList} />
        <Route path="/trains/:trainId" component={SingleTrain} />
      </Switch>
    </Router>
  );
};

export default App;