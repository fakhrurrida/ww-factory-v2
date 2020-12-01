import './App.css';
import React, { useState, useEffect } from 'react';

class Navbar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-primary">
                    <div className="nav-home">
                        <a className="nav-link" href="/">Home</a>
                    </div>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/pemesanan">Pemesanan</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/persediaan">Persediaan</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/supplier">Supplier</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/resep">Resep</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/stokcokelat">Stok Cokelat</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/keuangan">Keuangan</a>
                        </li>
                    </ul>
            </nav>
        )
    }
}
export default Navbar;