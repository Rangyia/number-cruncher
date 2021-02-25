// React
import React, { Component } from "react";
import { connect } from "react-redux";
import { authLogin } from "../../store/actions/auth";

import { Button } from "semantic-ui-react";
import banner from '../../assets/img/img-site-ban.png'
import SignUpForm from '../../components/SignUpForm'

import '../../css/pages/SignIn.css'

class SignUp extends Component {
    state = {
        token: "",
    };

    render() {
        return (
            <div className="wrapper">

                {/* Left Column */}
                <div className="site-col site-col-1 left">
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
                <div className="site-col site-col-2 right">
                    <SignUpForm />
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);