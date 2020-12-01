import React, { PureComponent } from 'react'

class PersediaanScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            doneLoading: false,
            hasil: []
        }
    }

    async componentDidMount(){
        console.log("masuk component did mount")
        console.log(this.state.doneLoading)
        console.log(this.state.hasil)

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
                        Daftar Cokelat:
                        <table id="bahan_table">
                            <thead>
                                <tr id="table_top">
                                    <th>ID Cokelat</th>
                                    <th>Nama Cokelat</th>
                                    <th>Jumlah</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.hasil.map(cokelat => {
                                return(
                                    <tr>
                                    <td>{cokelat}</td>
                                    <td>{cokelat}</td>
                                    <td>{cokelat} / {cokelat}</td>
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

export default PersediaanScreen;