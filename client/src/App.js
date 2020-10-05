import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/layout/NavbarY';
import Home from './components/pages/HomeY'
import About from './components/pages/AboutY'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Alerts from './components/layout/AlertsY'
import PrivateRoute from './components/routing/PrivateRouteY'

import ContactState from './context/contact/ContactStateY'
import AuthState from './context/auth/AuthStateY'
import AlertState from './context/alert/AlertStateY'
import setAuthToken from './utils/setAuthToken'

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <ContactState>
          <AlertState>
            <Router>
              <Fragment className="App">
                <Navbar/>
                <div className="container">
                  <Alerts/>
                  <Switch>
                    <PrivateRoute exact path="/" component={Home}/>
                    <Route exact path="/about" component={About}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/login" component={Login}/>
                  </Switch>
                </div>
              </Fragment>
            </Router>
          </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;
