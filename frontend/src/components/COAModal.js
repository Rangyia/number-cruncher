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

export default class COAModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: this.props.activeItem,
            isAdd: this.props.isAdd
        }
    }

    isAddModal = () => {
        if (this.state.isAdd) {
            return (
                <ModalHeader>New Chart of Account</ModalHeader>
            )
        }
        return (
            <ModalHeader>Edit Chart of Account</ModalHeader>
        )
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
                {this.isAddModal()}
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="account-name">Account Name</Label>
                            <Input
                                type="text"
                                id="account-name"
                                name="name"
                                value={this.state.activeItem.name}
                                onChange={this.handleChange}
                                placeholder="Enter Account Name"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="account-number">Account Number</Label>
                            <Input
                                type="text"
                                id="account-number"
                                name="number"
                                value={this.state.activeItem.number}
                                onChange={this.handleChange}
                                placeholder="Enter Account Number"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="account-description">Description</Label>
                            <Input
                                type="text"
                                id="account-description"
                                name="description"
                                value={this.state.activeItem.description}
                                onChange={this.handleChange}
                                placeholder="Enter Description"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="account-normalSide">Normal Side</Label>
                            <Input
                                type="text"
                                id="account-normalSide"
                                name="normalSide"
                                value={this.state.activeItem.normalSide}
                                onChange={this.handleChange}
                                placeholder="Enter Normal Side"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="account-category">Category</Label>
                            <Input
                                type="text"
                                id="account-category"
                                name="category"
                                value={this.state.activeItem.category}
                                onChange={this.handleChange}
                                placeholder="Enter Category"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="account-subcategory">Subcategory</Label>
                            <Input
                                type="text"
                                id="account-subcategory"
                                name="subcategory"
                                value={this.state.activeItem.subcategory}
                                onChange={this.handleChange}
                                placeholder="Enter Subcategory"
                            />
                        </FormGroup>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <FormGroup>
                                <Label for="account-debit">Debit</Label>
                                <Input
                                    type="text"
                                    id="account-debit"
                                    name="debit"
                                    value={this.state.activeItem.debit}
                                    onChange={this.handleChange}
                                    placeholder="Enter Debit"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="account-credit">Credit</Label>
                                <Input
                                    type="text"
                                    id="account-credit"
                                    name="credit"
                                    value={this.state.activeItem.credit}
                                    onChange={this.handleChange}
                                    placeholder="Enter Credit"
                                />
                            </FormGroup>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <FormGroup>
                                <Label for="account-initialBalance">Initial Balance</Label>
                                <Input
                                    type="text"
                                    id="account-initialBalance"
                                    name="initialBalance"
                                    value={this.state.activeItem.initialBalance}
                                    onChange={this.handleChange}
                                    placeholder="Enter Initial Balance"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="account-balance">Balance</Label>
                                <Input
                                    type="text"
                                    id="account-balance"
                                    name="balance"
                                    value={this.state.activeItem.balance}
                                    onChange={this.handleChange}
                                    placeholder="Enter Balance"
                                />
                            </FormGroup>
                        </div>
                        <FormGroup>
                            <Label for="account-order">Order</Label>
                            <Input
                                type="text"
                                id="account-order"
                                name="order"
                                value={this.state.activeItem.order}
                                onChange={this.handleChange}
                                placeholder="Enter Order"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="account-statement">Statement</Label>
                            <Input
                                type="text"
                                id="account-statement"
                                name="statement"
                                value={this.state.activeItem.statement}
                                onChange={this.handleChange}
                                placeholder="Enter Statement"
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={() => onSave(this.state.activeItem)}>Save</Button>
                </ModalFooter>            
            </Modal>
        )
    }
}