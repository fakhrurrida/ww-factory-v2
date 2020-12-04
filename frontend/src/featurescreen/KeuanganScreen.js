import React, { PureComponent } from 'react'
import axios from 'axios'
import xml2json from 'xml-js'
// const XMLParser = require('XMLParser')

class KeuanganScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            doneLoading: false,
            saldo: 0
        }
    }

    soap() {   
        var xmlhttp = new XMLHttpRequest();            
        xmlhttp.open("POST", "http://localhost:9999/wsfactory/ws/saldo", true);
        xmlhttp.setRequestHeader("SOAPAction", "http://tempuri.org/ICourses/GetCountries");
        // build SOAP request
        var sr =`<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
                    <soapenv:Body>
                        <com:getSaldo xmlns:com="http://example.com/">
                    
                        </com:getSaldo>
                    </soapenv:Body>
                </soapenv:Envelope>`

        xmlhttp.onerror = function(e) {
        alert("Error ocurred. Error = " + e.message);
        }

        xmlhttp.ontimeout = function(e) {
        alert("Timeout error!");
        }

        xmlhttp.onreadystatechange = function () {  
            if (xmlhttp.readyState  == 4) {
                if (xmlhttp.status == 200 || xmlhttp.status == 0) {
                console.log(xmlhttp.responseText);
                alert(xmlhttp.status);

                    }
                    else{
                     alert(xmlhttp.status);
                     }
                }   
                else{
                 alert('error in response');
            }

          } 

        xmlhttp.setRequestHeader("Content-Length", sr.length);
        xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");

        xmlhttp.send(sr);
    }

    // fetchSaldo() {
    //     const config = {headers: {'Content-Type': 'text/xml'}}
    //     const body = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    //                     <soapenv:Body>
    //                         <com:getSaldo xmlns:com="http://example.com/">
                        
    //                         </com:getSaldo>
    //                     </soapenv:Body>
    //                 </soapenv:Envelope>`

    //     Axios.post("http://localhost:9999/wsfactory/ws/saldo", body, config)
    //     .then(res => res.data)
    //     .then(data => new XMLParser().parseFromString(data))
    //     .then(xml => {
    //         this.setState ( {
    //             saldo: xml.getElementsByTagName('return')[0].value
    //         })
    //     })

    //     .catch(e => console.log(e))
    // }

    componentDidMount(){
        console.log("masuk component did mount")
        console.log(this.state.doneLoading)
        console.log(this.state.saldo)

        this.soap();

        // axios.get('soap_endpoint'
        //     ,{timeout: 1000000}, {headers:
        //     {'Content-Type': 'text/xml'}
        //       })
        //     .then((response) => { 
        //     console.log(response);
        //     }, (error) => {
        //     console.log(error);
        //     });
        // // const res = await fetch('http://localhost:3000', {
        // //     method: 'get',
        // //     headers: {
        // //     'Accept': 'application/json',
        // //     'Content-Type': 'application/json'
        // //     }
        // // });
        // const result2 = res.json();
        // const result = xml2json(result2, {compact: true});
        // this.setState({
        //     saldo: result,
        //     doneLoading: true
        // });
        // console.log(result);
        // console.log(this.state.hasil[0].nama_bahan);
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