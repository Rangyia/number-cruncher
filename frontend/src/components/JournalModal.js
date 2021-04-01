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
import { Header, Table, Checkbox, Dropdown } from 'semantic-ui-react'
import API from '../api'


export default class JournalModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: this.props.activeItem,
            isAdd: this.props.isAdd,
            coas: this.props.coas
        }
    }

    isAddModal = () => {
        if (this.state.isAdd) {
            return (
                <ModalHeader>New Journal Entry</ModalHeader>
            )
        }
        return (
            <ModalHeader>Edit Journal Entry</ModalHeader>
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
        const { onSave } = this.props;

        return (
            <Modal isOpen={true}>
                {this.isAddModal()}
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="account-name">Status</Label>
                            <Input
                                type="select"
                                id="entry-status"
                                name="status"
                                value={this.state.activeItem.status}
                                onChange={this.handleChange}
                            >
                                <option value={1}>Approved</option>
                                <option value={2}>Pending</option>
                                <option value={3}>Rejected</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="account-number">COA</Label>
                            <Input
                                type="select"
                                id="entry-coa"
                                name="coa"
                                value={Number.parseInt(this.state.activeItem.coa)}
                                onChange={this.handleChange}
                            >
                                {this.state.coas.map(coa => (<option value={coa.id}>{coa.name}</option>))}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="account-description">Debit</Label>
                            <Input
                                type="text"
                                id="entry-debit"
                                name="debit"
                                value={this.state.activeItem.debit}
                                onChange={this.handleChange}
                                placeholder={0.00}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="account-normalSide">Credit</Label>
                            <Input
                                type="text"
                                id="entry-credit"
                                name="credit"
                                value={this.state.activeItem.credit}
                                onChange={this.handleChange}
                                placeholder={0.00}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="account-category">Amount</Label>
                            <Input
                                type="text"
                                id="entry-amount"
                                name="amount"
                                value={this.state.activeItem.amount}
                                onChange={this.handleChange}
                                placeholder={0.00}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="account-subcategory">Source</Label>
                            <Input
                                type="text"
                                id="entry-source"
                                name="source"
                                value={this.state.activeItem.source}
                                onChange={this.handleChange}
                                placeholder="Enter Source"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="account-subcategory">Comment</Label>
                            <Input
                                type="text"
                                id="entry-comment"
                                name="comment"
                                value={this.state.activeItem.comment}
                                onChange={this.handleChange}
                                placeholder="Enter Comment"
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