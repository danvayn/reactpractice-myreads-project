import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

//BrowserRouter added here just to add a bit of functionality to the app.

ReactDOM.render(
  <BrowserRouter><App /></BrowserRouter>,
  document.getElementById('root'));
