// React
import React, { Component } from "react";
import { connect } from "react-redux";
import { authLogin } from "../../store/actions/auth";

import {Button} from "semantic-ui-react";
import banner from '../../assets/img/img-site-ban.png'
import SignInForm from '../../components/SignInForm'
import '../../css/pages/SignIn.css'

class SignIn extends Component {
    state = {
        token: "",
    };

    render() {
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
                    <SignInForm />
                </div>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.token !== null
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (username, password) => dispatch(authLogin(username, password)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);