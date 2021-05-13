import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import List from './list';
import Create from './create';
import './list.css';
import logo from './ClipartKey_1177679.jpg'

class App extends Component {
  render() {
    return (
      <Router>
        <div className='link'>        
          <img src={logo} alt='Check Box logo' />
          <h1>Task App  </h1>
          <div id='appButton'>            
            <button className='button'><span><Link to='/list'>Tasks To Do</Link></span></button>
            <button className='button'><span><Link to='/create'>New Task</Link></span></button>
          </div>
        </div>
        <Switch>
          <Route path='/list' exact component={List} />
          <Route path='/create' exact component={Create} />
        </Switch>
      </Router>
    )
  }
}

export default App;
