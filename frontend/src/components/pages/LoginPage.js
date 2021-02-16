import React from 'react';
import './LoginPage.css';
import banner from '../../img/img-site-ban.png'

function LoginPage() {
    return (
        <div className="wrapper">
            <div className="col col-1 left">
                <div className="row row-1">
                    <img src={banner} alt="site-banner"/>
                </div>
                <div className="row row-2">
                    <button>Click Me</button>
                </div>
            </div>
            <div className="col col-2 right">
            </div>
        </div>
    )
}

export default LoginPage;