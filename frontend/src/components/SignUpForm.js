import React, { Component } from "react";
import {
    Button,
    Form,
    Grid,
    Header,
    Message,
    Segment,
} from "semantic-ui-react";
import { connect } from "react-redux";
import { authSignup } from "../store/actions/auth";
import { Link } from "react-router-dom";

class SignUpForm extends Component {
    state = {
        username: "",
        email: "",
        password1: "",
        password2: "",
        firstName: "",
        lastName: "",
        dob: ""
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleSubmit = () => {
        const { username, email, password1, password2, firstName, lastName, dob } = this.state;
        this.props.signup(username, email, password1, password2, firstName, lastName, dob);
        this.setState({ username: "", email: "", password1: "", password2: "", firstName: "", lastName: "", dob: null });
    };

    render() {
        const { loading, error } = this.props;
        const { username, email, password1, password2, firstName, lastName, dob } = this.state;
        return (
            <>
            <Grid
                textAlign="center"
                style={{ height: "100vh" }}
                verticalAlign="middle"
            >
                <Grid.Column className="signup-form" style={{ maxWidth: 450 }}>
                    <Header as="h2" color="teal" textAlign="center">
                        Create an account
          </Header>
                    <Form size="large" onSubmit={this.handleSubmit} error={error}>
                        <Segment stacked>
                            <Form.Input
                                fluid
                                name="username"
                                value={username}
                                onChange={this.handleChange}
                                icon="user"
                                iconPosition="left"
                                placeholder="Username"
                            />
                            <Form.Input
                                fluid
                                name="email"
                                value={email}
                                onChange={this.handleChange}
                                icon="mail"
                                iconPosition="left"
                                placeholder="Email address"
                            />
                            <Form.Input
                                fluid
                                name="password1"
                                value={password1}
                                onChange={this.handleChange}
                                icon="lock"
                                iconPosition="left"
                                placeholder="Password"
                                type="password"
                            />
                            <Form.Input
                                fluid
                                name="password2"
                                value={password2}
                                onChange={this.handleChange}
                                icon="lock"
                                iconPosition="left"
                                placeholder="Confirm password"
                            />
                            <Form.Input
                                fluid
                                name="firstName"
                                value={firstName}
                                onChange={this.handleChange}
                                icon="check"
                                iconPosition="left"
                                placeholder="First Name"
                            />
                            <Form.Input
                                fluid
                                name="lastName"
                                value={lastName}
                                onChange={this.handleChange}
                                icon="check"
                                iconPosition="left"
                                placeholder="Last Name"
                            />
                            <Form.Input
                                fluid
                                name="dob"
                                value={dob}
                                onChange={this.handleChange}
                                icon="calendar"
                                iconPosition="left"
                                type="date"
                            />
                            {error && (
                                <Message
                                    error
                                    header="There was an error"
                                    content="Please check your credentials"
                                />
                            )}
                            <Button
                                color="teal"
                                loading={loading}
                                disabled={loading}
                                fluid
                                size="large"
                            >
                                SignUp
              </Button>
                        </Segment>
                    </Form>
                    <Message>
                        Already have an account? <Link to="/"> Login</Link>
                    </Message>
                </Grid.Column>
            </Grid>
            <h1>hello</h1>
            </>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signup: (username, email, password1, password2, firstName, lastName, dob) =>
            dispatch(authSignup(username, email, password1, password2, firstName, lastName, dob)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);