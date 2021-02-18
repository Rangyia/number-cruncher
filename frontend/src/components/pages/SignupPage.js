import React from 'react';

// CSS
import '../../App.css'
import './SignupPage.css';
import {
    Button
} from "semantic-ui-react";

// Img
import banner from '../../img/img-site-ban.png'

// Components
import SignupForm from '../signup/SignupForm'

function SignupPage() {
    return (
        <div className="wrapper">

            {/* Left Column */}
            <div className="col col-1 left">
                <div className="row row-1">
                    <img src={banner} alt="site-banner" />
                </div>
                <div className="row row-2">
                    <Button color="black" fluid size="large" padding="10px 10px">
                        <i class="question circle outline icon"></i>
                        Need Help?
                    </Button>
                </div>
            </div>

            {/* Right Column */}
            <div className="col col-2 right">
                <SignupForm />
            </div>
        </div>
    )
}

export default SignupPage;