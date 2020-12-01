import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import './App.css';
import React, { useState, useEffect } from 'react';
import UserStore from './stores/UserStore';

class RedirectButton extends React.Component {
  render() {
    return (
      <div className="redirectButton">
        <button
          className='btn'
          disabled={this.props.disabled}
          onClick={ () => this.props.onClick()}
        >
          {this.props.text}
        </button>
      </div>
    );
  }
}

export default RedirectButton;
