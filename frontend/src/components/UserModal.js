import React, { Component } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label,
} from "reactstrap";

export default class UserModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: this.props.activeItem,
        };
    }

    handleChange = (e) => {
        let { name, value } = e.target;

        if (e.target.type === "checkbox") {
            value = e.target.checked;
        }

        const activeItem = { ...this.state.activeItem, [name]: value };

        this.setState({ activeItem });
    };

    render() {
        const { toggle, onSave } = this.props;

        return (
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}>User</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="user-username">Username</Label>
                            <Input
                                type="text"
                                id="user-username"
                                name="username"
                                value={this.state.activeItem.username}
                                onChange={this.handleChange}
                                placeholder="Enter Username"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="user-email">Email</Label>
                            <Input
                                type="text"
                                id="user-email"
                                name="email"
                                value={this.state.activeItem.email}
                                onChange={this.handleChange}
                                placeholder="Enter Email"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="user-password">Password</Label>
                            <Input
                                type="text"
                                id="user-password"
                                name="password"
                                value={this.state.activeItem.password}
                                onChange={this.handleChange}
                                placeholder="Enter Password"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="user-password">Password</Label>
                            <Input
                                type="text"
                                id="user-password2"
                                name="password2 "
                                value={this.state.activeItem.password2}
                                onChange={this.handleChange}
                                placeholder="Confirm Password"
                            />
                        </FormGroup>
                        {/* <FormGroup>
                            <Label for="user-address">Address</Label>
                            <Input
                                type="text"
                                id="user-address"
                                name="address"
                                value={this.state.activeItem.address}
                                onChange={this.handleChange}
                                placeholder="Enter Address"
                            />
                        </FormGroup> */}
                        {/* <FormGroup check>
                            <Label check>
                                <Input
                                    type="checkbox"
                                    name="completed"
                                    checked={this.state.activeItem.completed}
                                    onChange={this.handleChange}
                                />
                Completed
              </Label>
                        </FormGroup> */}
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="success"
                        onClick={() => onSave(this.state.activeItem)}
                    >
                        Save
          </Button>
                </ModalFooter>
            </Modal>
        );
    }
}