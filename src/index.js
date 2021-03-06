/*
入口JS
 */
import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import {Provider} from 'react-redux'

import Login from './containers/login/login'
import Register from './containers/register/register'
import Dashboard from './containers/dashboard/dashboard'
import store from './redux/store'

import './assets/css/index.less'

// import './test/ioTest'

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        <Route component={Dashboard}/>
      </Switch>
    </BrowserRouter>
  </Provider>
  ),document.getElementById('root'))
