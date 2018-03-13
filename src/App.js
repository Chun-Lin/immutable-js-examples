import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

class App extends Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.list.map(listValue => {
            return <li>{listValue}</li>
          })}
        </ul>
      </div>
    )
  }
}

export default App
