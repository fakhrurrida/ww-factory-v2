import React, { PureComponent } from 'react'
import axios from 'axios'
import xml2json from 'xml-js'
import { XMLBuilder } from 'XMLBuilder'
const XMLParser = require('XMLParser')

class KeuanganScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            doneLoading: false,
            saldo: 0
        }
    }

    fetchSaldo() {
        const config = {headers: {'Content-Type': 'text/xml'}}
        const body = XMLBuilder("getSaldo");

        Axios.post("http://localhost:9999/wsfactory/ws/saldo", body, config)
        .then(res => res.data)
        .then(data => new XMLParser().parseFromString(data))
        .then(xml => {
            this.setState ( {
                saldo: xml.getElementsByTagName('return')[0].value
            })
        })

        .catch(e => console.log(e))
    }

    componentDidMount(){
        console.log("masuk component did mount")
        console.log(this.state.doneLoading)
        console.log(this.state.saldo)

        axios.get('soap_endpoint'
            ,{timeout: 1000000}, {headers:
            {'Content-Type': 'text/xml'}
              })
            .then((response) => { 
            console.log(response);
            }, (error) => {
            console.log(error);
            });
        // const res = await fetch('http://localhost:3000', {
        //     method: 'get',
        //     headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json'
        //     }
        // });
        const result2 = res.json();
        const result = xml2json(result2, {compact: true});
        this.setState({
            saldo: result,
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
                        Saldo Perusahaan adalah sebesar: <br></br>
                            {this.state.saldo}
                    </div>) 
                    }
                </div>
            </div>
        )}
}

export default KeuanganScreen;