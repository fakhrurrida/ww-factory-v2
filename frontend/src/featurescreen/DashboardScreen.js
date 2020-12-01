import React, { PureComponent } from 'react'
import SubmitButton from '../SubmitButton';
import UserStore    from '../stores/UserStore';
import { Link } from 'react-router-dom';
import { runInAction } from 'mobx';

class DashboardScreen extends React.Component{
    async componentDidMount(){
        // try{
        //   let res = await fetch('http://localhost:5000/isLoggedIn', {
        //     method: 'post',
        //     headers: {
        //       'Accept': 'application/json',
        //       'Content-Type': 'application/json'
        //     }
        //   });
    
        //   let result = await res.json();
    
        //   if (result && result.success){
        //     runInAction(() => {
        //       UserStore.loading = false
        //       UserStore.isLoggedIn = true
        //       UserStore.username = result.username
        //     });
        //   }
        //   else{
        //     runInAction(() => {
        //       UserStore.loading = false
        //       // UserStore.isLoggedIn = false
        //     });
            
        //   }
        //   console.log(UserStore.loading);
        //   console.log(UserStore.username);
        //   console.log(UserStore.isLoggedIn);
        // }
        // catch(e){
        //   runInAction(() => {
        //     UserStore.loading = false
        //    // UserStore.isLoggedIn = false
        //   });
        // }
      }
    
      async doLogout(){
        console.log('Memanggil Logout.');
        try{
          let res = await fetch('http://localhost:5000/logout', {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          });
          let result = await res.json();
          console.log(result);
          if (result){
            runInAction(() => {
              UserStore.isLoggedIn = false;
              UserStore.username = '';
            });
          }
        }
        catch(e){
          console.log(e);
        }
      }
    render(){
        return (<div>
            <div className="container">
                
                Welcome, {UserStore.username}.
                <div className='tombol'>
                    <Link to={'/pemesanan'}>
                    <button className='btn'>Pemesanan Cokelat</button>
                    </Link>
                </div>
    
                <div className='tombol'>
                    <Link to={'/persediaan'}>
                    <button className='btn'>Persediaan Bahan</button>
                    </Link>
                </div>
    
                <div className='tombol'>
                    <Link to={'/supplier'}>
                    <button className='btn'>Halaman Supplier</button>
                    </Link>
                </div>
                
                <div className='tombol'>
                    <Link to={'/resep'}>
                    <button className='btn'>Resep</button>
                    </Link>
                </div>
    
                <div className='tombol'>
                    <Link to={'/stokcokelat'}>
                    <button className='btn'>Stok Cokelat</button>
                    </Link>
                </div>
    
                <div className='tombol'>
                    <Link to={'/keuangan'}>
                    <button className='btn'>Catatan Keuangan</button>
                    </Link>
                </div>
    
                <SubmitButton 
                text={'Log Out'}
                disabled = {false}
                onClick = {() => this.doLogout() }
                />
                </div>
        </div>);
    }
}

export default DashboardScreen;