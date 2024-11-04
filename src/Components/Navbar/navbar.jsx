import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {

    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light px-4">
            <a class="navbar-brand" href="/">Ecommerce</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                <li  class="nav-item nav-link"><Link style={{textDecoration: 'none'}} to= '/iphone'>Iphone</Link></li>
                <li  class="nav-item nav-link"><Link style={{textDecoration: 'none'}} to= '/ipad'>Ipad</Link></li>
                </ul>
                
             </div>
            <div className="nav-item d-flex flex-row-reverse">
                <Link style={{textDecoration: 'none'}} to= '/login'><button className="nav-link p-2">Login</button></Link>
            </div>
        </nav>
    )
}

export default Navbar