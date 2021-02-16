import React, { Component } from "react";
import "../App.css";
import {
    Container,
    Divider,
    Grid,
    Header,
    List,
    Menu,
    Segment,
} from "semantic-ui-react";
import { connect } from "react-redux";
import * as actionTypes from "../store/actions/auth";
import { Link } from "react-router-dom";

class Layout extends Component {
    componentDidMount() {
        this.props.onTryAutoSignin();
    }

    render() {
        return (
            <div>
                <Menu inverted>
                    <Container>
                        <Link to="/">
                            <Menu.Item header>Number Cruncher</Menu.Item>
                        </Link>
                        <Link to="/">
                            <Menu.Item>Home</Menu.Item>
                        </Link>
                        <Menu.Menu position="right">
                            {this.props.authenticated ? (
                                <Menu.Item onClick={() => this.props.logout()}>
                                    Logout
                                </Menu.Item>
                            ) : (
                                    <React.Fragment>
                                        <Link to="/login">
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

                {this.props.children}
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(Layout);