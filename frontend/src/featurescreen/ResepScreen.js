import React, { PureComponent } from 'react'
import { BrowserRouter as Router, Switch, Route, NavLink, BrowserRouter } from 'react-router-dom';

class ResepScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            doneLoading: false,
            hasil: []
        }
    }

    async componentDidMount(){
        console.log("masuk component did mount")
        console.log(this.state.loading)
        console.log(this.state.hasil)
        console.log(this.state.saldo)

        const res = await fetch('http://localhost:3000', {
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
        console.log(result);
        console.log(this.state.hasil[0].nama_bahan);
    }

    render(){
        return (
            <div  className="container" >
                <div className="daftar_bahan">
                    { this.state.doneLoading === false ? (<div className="render_loading"> Loading... </div>) : 
                    (<div className="render_bahan"> 
                        Daftar Resep:
                        <table id="bahan_table">
                            <thead>
                                <tr id="table_top">
                                    <th>Nama Bahan</th>
                                    <th>Nama Supplier</th>
                                    <th>Harga</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.hasil.map(resep => {
                                return(
                                    <tr>
                                    <td>{resep}</td>
                                    <td>{resep}</td>
                                    <td>{resep} / {resep}</td>
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
            </div>
        )}
}

export default ResepScreen;