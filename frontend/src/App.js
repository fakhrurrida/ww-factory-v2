 
import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink, BrowserRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import { runInAction } from 'mobx';
import LoginForm    from './LoginForm';
import SubmitButton from './SubmitButton';
import UserStore    from './stores/UserStore';
import PersediaanScreen from './featurescreen/PersediaanScreen';
import PemesananScreen from './featurescreen/PemesananScreen';
import SupplierScreen from './featurescreen/SupplierScreen';
import ResepScreen from './featurescreen/ResepScreen';
import StokCokelatScreen from './featurescreen/StokCokelatScreen';
import KeuanganScreen from './featurescreen/KeuanganScreen';
import DashboardScreen from './featurescreen/DashboardScreen';

class App extends React.Component {

  async componentDidMount(){
    try{
      let res = await fetch('http://localhost:5000/isLoggedIn', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      let result = await res.json(); 
      if (result && result.success){
        runInAction(() => {
          UserStore.loading = false
          UserStore.isLoggedIn = true
          UserStore.username = result.username
        })
      }
      else{
        runInAction(() => {
          UserStore.loading = false
          // UserStore.isLoggedIn = false
        })
      }
    }
    catch(e){
      runInAction(() => {
        UserStore.loading = false
        // UserStore.isLoggedIn = false
      })
    }
  }

  async doLogout(){
    try{
      let res = await fetch('http://localhost:5000/logout', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      let result = await res.json();

      if (result && result.success){
        runInAction(() => {
          UserStore.isLoggedIn = false
          UserStore.username = ''
        })
      }
    }
    catch(e){
      console.log(e);
    }
  }

  render() {
    if (UserStore.loading){
      console.log("masuk loading");
      return(
        <div className="app">
          <div className="container">
            Loading, please wait...
          </div>
        </div>
      );
    }
    else{
      console.log("lepas loading");
      // Soon to be deleted: only for testing
      // UserStore.isLoggedIn = true;
      // UserStore.username = 'Test User'
      // Soon to be deleted: only for testing
      if (UserStore.isLoggedIn){
        console.log("masuk atas");
        return(
          <BrowserRouter>
            <div className="app">
              <div className="container">
              <Route path="/" exact={true} component={DashboardScreen} />
              <Route path="/pemesanan" component={PemesananScreen} />
              <Route path="/persediaan" component={PersediaanScreen} />
              <Route path="/supplier" component={SupplierScreen} />
              <Route path="/resep" component={ResepScreen} />
              <Route path="/stokcokelat" component={StokCokelatScreen} />
              <Route path="/keuangan" component={KeuanganScreen} />
              </div>
          </div>
         </BrowserRouter>
        );
      }else{
        console.log("masuk bawah");
        console.log(UserStore.isLoggedIn);
        return (
          <BrowserRouter>
          <div className="app">
            <div className="container">
              <LoginForm />
            </div>
          </div>
          </BrowserRouter>
        );
      }
    }
  }
}

export default observer(App);
