import React, { useEffect }  from 'react';
import Menu from './components/Navbar'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import axios from'axios';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import './App.css'

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {

    useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  

  return (
    <Provider store={store}>
    <Router>
    <div className="App">
      <Menu className= "mb-5" />
      <section className='container'>
        <Switch>
          <Route exact path='/' component={Register} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
        </Switch>
      </section>
      </div>

    </Router>
    </Provider>
  );
}

export default App;
