import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import './App.css';
import React, { useState, useEffect } from 'react';
import UserStore from './stores/UserStore';

class InputField extends React.Component {
  render() {
    return (
      <div className="inputField">
        
        <input
          className='input'
          type={this.props.type}
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={(e) => this.props.onChange(e.target.value)}
        />

      </div>
    );
  }
}

export default InputField;
