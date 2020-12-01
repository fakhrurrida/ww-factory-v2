import React, { PureComponent } from 'react'
import '../style.css'
import { runInAction } from 'mobx'
import BahanStore from '../stores/BahanStore';
import InputField from '../InputField';
import SubmitButton from '../SubmitButton';
import axios from 'axios';
import Navbar from '../Navbar';

class SupplierScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            doneLoading: false,
            donePengajuan: false,
            buttonDisabled: false,
            hasil: [],
            saldo: 0,
            bahans: [],
            jumlahs: [],
            daftarBahan: []
        }
    }

    setInputValue(property, val){
        val = val.trim();
        if (property === 'jumlahs' || property === 'bahans'){
            val = val.split(",");
        }
        this.setState({
          [property]: val
        })
      }

    performTransaction(){
        console.log("performing transaction");
        var config = {
            headers: {'Access-Control-Allow-Origin': '*'}
        };
        this.setState({
            buttonDisabled: true
        });
        
        var i;
        var x = [];
        console.log("ini x sebelum" + x)
        for (i=0; i<this.state.jumlahs.length; i++){
            console.log(this.state.bahans[i])
            x.push({"nama": this.state.bahans[i], "jumlah": parseInt(this.state.jumlahs[i])})
            console.log(x[i].nama)
        }

        console.log("ini x sesudah" + x)
        console.log(x[0].nama)
        console.log(x[0].jumlah)
        this.setState({
            daftarBahan: x
        })
        console.log("ini daftarBahan pix sebelum" + this.state.daftarBahan)
        axios.post('http://localhost:4000/supplier-api/transaksi', {
            uang: parseInt(this.state.saldo),
            daftarBahan: x}
            ,{timeout: 1000000}, config)
            .then((response) => { 
            console.log(response);
            alert(response.data.pesan)
            }, (error) => {
            console.log(error);
            });
    }

    async componentDidMount(){
        console.log("masuk component did mount")
        console.log(this.state.loading)
        console.log(this.state.hasil)
        console.log(this.state.saldo)

        const res = await fetch('http://localhost:4000/supplier-api/tampil', {
            method: 'get',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            }
        });
        const result = await res.json();
        this.setState({
            hasil: result,
            doneLoading: true
        });
    }
    
    render(){
        return (
            <div  className="container" >
            <Navbar />
            <div className="daftar_bahan">
                { this.state.doneLoading === false ? (<div className="render_loading"> Loading... </div>) : 
                (<div className="render_bahan"> 
                    <b>Daftar Bahan:</b>
                    <table id="bahan_table">
                        <thead>
                            <tr id="table_top">
                                <th>Nama Bahan</th>
                                <th>Nama Supplier</th>
                                <th>Harga</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.hasil.map(bahan => {
                            return(
                                <tr>
                                <td>{bahan.nama_bahan}</td>
                                <td>{bahan.nama_supplier}</td>
                                <td>{bahan.harga_per_satuan} / {bahan.satuan}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                    {/* {console.log(this.state.hasil[0])}
                    {this.state.hasil[1].nama_bahan}  */}
                </div>) 
                }
            </div>
        <div className="form-pembelian">
        <br></br>
        <b>Form Pembelian:</b>
            <form>
                <div className="form-group">
                    <label htmlFor="saldo">Saldo</label>
                    <br></br>
                    <InputField type="number" 
                        className="form-control" 
                        id="saldo" 
                        aria-describedby="emailHelp" 
                        placeholder="Masukkan saldo anda" 
                        onChange={ (val) => this.setInputValue('saldo', val)} 
                    />
                    {console.log(this.state.saldo)}
                    </div>
                <div className="form-group">
                    <label htmlFor="bahan">Masukkan Bahan yang Ingin Dibeli</label>
                    <br></br>
                    <InputField 
                        type="text" 
                        className="form-control" 
                        id="bahan" placeholder="Daftar bahan, dipisah koma" 
                        onChange={ (val) => this.setInputValue('bahans', val)} 
                    />
                    {console.log(this.state.bahans)}
                </div>
                <div className="form-group">
                    <label htmlFor="jumlah">Masukkan Jumlah Setiap yang Ingin Dibeli</label>
                    <br></br>
                    <InputField 
                        type="text" 
                        className="form-control" 
                        id="jumlah" placeholder="Daftar jumlah bahan, dipisah koma" 
                        onChange={ (val) => this.setInputValue('jumlahs', val)} 
                    />
                    {console.log(this.state.jumlahs)}
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={ () => this.performTransaction() } 
                >Ajukan Pembelian</button>
            </form>
        </div>
    </div>
    );
    }
}

export default SupplierScreen;