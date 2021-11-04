import React from 'react';
import {Link} from "react-router-dom";

function Footer() {
    return (
        <div className="text-center py-3" style={{backgroundColor:'#f3f3f3'}}>
            <Link className="nav-link" to ="/">
                <img src="logo.svg" style={{width:'100px'}}/>
            </Link>
        </div>
    );
}

export default Footer;