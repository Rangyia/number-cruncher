// React
import React, { Component } from 'react'
import { Link } from "react-router-dom";

// Redux
import { connect } from 'react-redux'
import * as actionTypes from "../../store/actions/auth";

// Components
import {
    Container,
    Menu,
    Image
} from "semantic-ui-react";

// Styles
import './TopBar.css'

// Images
import logo from '../../assets/images/site-logo-topbar.png'

export class TopBar extends Component {
    componentDidMount() {
        this.props.onTryAutoSignin();
    }

    render() {
        return (
            <div>
                <Menu inverted className="top-bar" fixed="top">
                    <Container className="nav-container">
                        <Link to="/">
                            <Menu.Item header>
                                <Image src={logo} size='tiny'/>
                            </Menu.Item>
                        </Link>
                        <Link to="/">
                            <Menu.Item>Home</Menu.Item>
                        </Link>
                        <Menu.Menu position="right">
                            {this.props.authenticated ? (
                                <Menu.Item onClick={() => this.props.logout().then(window.location.replace("/"))}>
                                    Logout
                                </Menu.Item>
                            ) : (
                                    <React.Fragment>
                                        <Link to="/">
                                            <Menu.Item>Login</Menu.Item>
                                        </Link>
                                        <Link to="/signup">
                                            <Menu.Item>SignUp</Menu.Item>
                                        </Link>
                                    </React.Fragment>
                                )}
                        </Menu.Menu>
                    </Container>
                </Menu>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.token !== null,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTryAutoSignin: () => dispatch(actionTypes.authCheckState()),
        logout: () => dispatch(actionTypes.authLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBar)
