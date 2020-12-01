import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import './App.css';
import React, { useState, useEffect } from 'react';
import UserStore from './stores/UserStore';

class SubmitButton extends React.Component {
  render() {
    return (
      <div className="submitButton">
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

export default SubmitButton;
