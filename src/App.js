import React, { Component } from 'react'
import {Routes, Route } from 'react-router-dom'
import Pokemon from "./views/Pokemon.js"

import 'bootstrap/dist/css/bootstrap.min.css'


export default class App extends Component {
  
  
  render() {
    return (
      <div>             
        <Routes>
          <Route path = '/' element = {<Pokemon />}/>
        </Routes>
      </div>
    )
  }
}

//export default App;
