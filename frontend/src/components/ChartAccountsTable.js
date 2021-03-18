import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import API from '../api'
import {
    Form,
    FormGroup,
    Input,
    Label,
    Table,
    Button,
} from "reactstrap";
import { Icon } from "semantic-ui-react";
import COAModal from "../components/COAModal"

// Redux
import { connect } from 'react-redux'
import * as actionTypes from "../store/actions/auth";

class ChartAccountsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accountList: [],
            modal: false,
            searchParam: "",
            activeAccount: {
                name: "",
                number: "",
                description: "",
                normalSide: "",
                category: "",
                subcategory: "",
                initialBalance: "",
                debit: "",
                credit: "",
                balance: "",
                dateAdded: "",
                userID: "",
                order: "",
                statement: ""
            },
            isAdd: false,
            listRendered: false,
        };
    }

    componentDidMount() {
        this.refreshList();
    }

    toggle = () => {
        this.setState({ modal: !this.state.modal });
    };

    handleCreateAccount = () => {
        const account = {
            name: "",
            number: "",
            description: "",
            normalSide: "",
            category: "",
            subcategory: "",
            initialBalance: "",
            debit: "",
            credit: "",
            balance: "",
            dateAdded: "",
            userID: "",
            order: "",
            statement: ""
        };
        this.setState({ activeAccount: account, modal: !this.state.modal, isAdd: !this.state.isAdd });
    }

    handleEditAccount = (account) => {
        this.setState({ activeAccount: account, modal: !this.state.modal, isAdd: false });
    }

    handleDeactivateAccount = (account) => {
        account.is_active = false;
        API
            .put(`/api/coa/admin/${account.id}/`, account)
            .then((res) => this.refreshList()); 
    }

    handleSubmit = (account) => {
        this.toggle();

        if (account.id) {
            API
                .put(`/api/coa/admin/${account.id}/`, account)
                .then((res) => this.refreshList());
            return;
        }

        API
        .post(`/api/coa/admin/`, account)
        .then((res) => this.refreshList()); 
    }

    refreshList = (filterOption = "", dateSelected = null) => {
        if (filterOption == "" && dateSelected == null) {
            API
                .get("/api/coa/admin/")
                .then((res) => this.setState({ accountList: res.data.sort((a, b) => (a.id > b.id ? 1 : -1)) }))
                .catch((err) => console.log(err));
        } else if (filterOption != "" && dateSelected == null) {
            API
                .get("/api/coa/admin/")
                .then((res) => this.setState({ accountList: this.sortList(res.data, filterOption) }))
                .catch((err) => console.log(err));
        } else {
            API
                .get("/api/coa/admin/")
                .then((res) => this.setState({ accountList: this.sortList(res.data, filterOption, dateSelected) }))
                .catch((err) => console.log(err));
        }
    }

    displayActions = (account) => {
        if (localStorage.getItem("is_admin") == "true") {
            return <> 
                <button style={{ marginRight: 10 }} className="btn btn-info" onClick={() => { this.handleEditAccount(account) }}>Edit</button>
                <button className="btn btn-danger" onClick={() => { this.handleDeactivateAccount(account) }}>Deactivate</button>
            </>
        } else {
            return <h3 style={{color: "lightblue"}}>Account</h3>
        }
    }

    
    addCommas(x) {
        if (x != null) {
            var parts = x.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return parts.join(".") + ".00";
        }
        return "0.00"
    }

    renderAccounts = (filterOption = "", dateSelected = null) => {
        if (this.state.searchParam == "" || this.state.searchParam == null) {

            if (filterOption != "" && dateSelected == null) {
                this.refreshList(filterOption)
            } else if (filterOption != "" && dateSelected != null) {
                this.refreshList(filterOption, dateSelected)
            }

            const activeAccounts = this.state.accountList.filter(
                (account) => { return account.is_active }
            )

            return activeAccounts.map((account) => (
                <tr scope="row">
                    <td>
                        {this.displayActions(account)}
                    </td>
                    <td>{account.name}</td>
                    <td>{account.number}</td>
                    <td>{account.description}</td>
                    <td>{account.normal_side}</td>
                    <td>{account.category}</td>
                    <td>{account.subcategory}</td>
                    <td>{this.addCommas(account.initial_balance)}</td>
                    <td>{this.addCommas(account.debit)}</td>
                    <td>{this.addCommas(account.credit)}</td>
                    <td>{this.addCommas(account.balance)}</td>
                    <td>{account.date_added}</td>
                    <td>{account.user_id}</td>
                    <td>{account.order}</td>
                    <td>{account.statement}</td>
                </tr>
            ));
        } else {

            const activeAccounts = this.state.accountList.filter(
                (account) => { 
                    if (account.name == null || account.number == null) {
                    } else {
                        return account.name.includes(this.state.searchParam) || account.number.includes(this.state.searchParam)
                    }
                }
            )
            return activeAccounts.map((account) => (
                <tr scope="row">
                    <td>
                    <td>
                        {this.displayActions(account)}
                    </td>
                    </td>
                    <td>{account.name}</td>
                    <td>{account.number}</td>
                    <td>{account.description}</td>
                    <td>{account.normal_side}</td>
                    <td>{account.category}</td>
                    <td>{account.subcategory}</td>
                    <td>{this.addCommas(account.initial_balance)}</td>
                    <td>{this.addCommas(account.debit)}</td>
                    <td>{this.addCommas(account.credit)}</td>
                    <td>{this.addCommas(account.balance)}</td>
                    <td>{account.date_added}</td>
                    <td>{account.user_id}</td>
                    <td>{account.order}</td>
                    <td>{account.statement}</td>
                </tr>
            ));
        }
    }

    handleChange = (e) => {

        if (e.target.type === "date") {
            this.filterList("date", e.target.value);
            return;
        }

        if (e.target.value == " " || e.target.value == null) {
            if (this.state.listRendered) {
                this.searchList();
                return;
            }
        }

        this.state.searchParam = e.target.value;
    }

    filterList = (option, date) => {
        this.renderAccounts(option, date);
    }
    searchList = () => {
        this.refreshList();
        this.renderAccounts();
    }

    sortList = (list, ...option) => {
        switch (option[0]) {
            case "name":
                return list.sort((a, b) => (a.name < b.name ? 1 : -1));
            case "number":
                return list.sort((a, b) => (a.number < b.number ? 1 : -1));
            case "description":
                return list.sort((a, b) => (a.description < b.description ? 1 : -1));
            case "normal side":
                return list.sort((a, b) => (a.normal_side < b.normal_side ? 1 : -1));
            case "category":
                return list.sort((a, b) => (a.category < b.category ? 1 : -1));
            case "subcategory":
                return list.sort((a, b) => (a.subcategory < b.subcategory ? 1 : -1));
            case "initial balance":
                return list.sort((a, b) => (a.initial_balance < b.initial_balance ? 1 : -1));
            case "debit":
                return list.sort((a, b) => (a.debit < b.debit ? 1 : -1));
            case "credit":
                return list.sort((a, b) => (a.credit < b.namecredit ? 1 : -1));
            case "date added":
                return list.sort((a, b) => (a.date_added < b.date_added ? 1 : -1));
            case "user id":
                return list.sort((a, b) => (a.user_id < b.user_id ? 1 : -1));
            case "balance":
                return list.sort((a, b) => (a.balance < b.balance ? 1 : -1));
            case "order":
                return list.sort((a, b) => (a.order < b.order ? 1 : -1));
            case "statement":
                return list.sort((a, b) => (a.statement < b.statement ? 1 : -1));
            case "date":
                return list.filter((account) => account.date_added == option[1]);
            default: 
                window.alert("Bad filter option")
                break;
        }
    }

    render() {
        return (
            <main>
                <Table dark hover style={{borderRadius:10}}>
                    <thead>
                        <tr>
                            <th scope="col">
                                <Form>
                                    <FormGroup style={{ width: 200, display: "flex", alignItems: "center"}}>
                                        <Button className="btn btn-success" style={{ width: 40, marginRight: 10 }} onClick={() => this.handleCreateAccount()}>
                                            <Icon size='lg' name="plus" onClick={() => this.searchList()} style={{ marginRight: 10, cursor: "pointer" }} />
                                        </Button>
                                        <Icon size='lg' name="search" onClick={() => this.searchList()} style={{ marginRight: 10, cursor: "pointer" }}/>
                                        <Input style={{ float: "right" }}
                                        type="search"
                                        id="acc-search"
                                        placeholder="Search"
                                        onChange={this.handleChange}
                                    />
                                    </FormGroup>
                                </Form>
                                <Form>
                                    <Input
                                        type="date"
                                        name="date"
                                        id="account-date-logged"
                                        placeholder="date placeholder"
                                        onChange={this.handleChange}
                                    />
                                </Form>
                            </th>
                            <th scope="col">
                                <Button style={{ backgroundColor: "transparent" }} onClick={() => this.renderAccounts("name")}>Name</Button>
                            </th>
                            <th scope="col"><Button style={{ backgroundColor: "transparent" }} onClick={() => this.renderAccounts("number")}>Number</Button></th>
                            <th scope="col"><Button style={{ backgroundColor: "transparent" }} onClick={() => this.renderAccounts("description")}>Description</Button></th>
                            <th scope="col"><Button style={{ backgroundColor: "transparent" }} onClick={() => this.renderAccounts("normal side")}>Normal Side</Button></th>
                            <th scope="col"><Button style={{ backgroundColor: "transparent" }} onClick={() => this.renderAccounts("category")}>Category</Button></th>
                            <th scope="col"><Button style={{ backgroundColor: "transparent" }} onClick={() => this.renderAccounts("subcategory")}>Subcategory</Button></th>
                            <th scope="col"><Button style={{ backgroundColor: "transparent" }} onClick={() => this.renderAccounts("initial balance")}>Initial balance</Button></th>
                            <th scope="col"><Button style={{ backgroundColor: "transparent" }} onClick={() => this.renderAccounts("debit")}>Debit</Button></th>
                            <th scope="col"><Button style={{ backgroundColor: "transparent" }} onClick={() => this.renderAccounts("credit")}>Credit</Button></th>
                            <th scope="col"><Button style={{ backgroundColor: "transparent" }} onClick={() => this.renderAccounts("balance")}>Balance</Button></th>
                            <th scope="col"><Button style={{ backgroundColor: "transparent" }} onClick={() => this.renderAccounts("date added")}>Date Added</Button></th>
                            <th scope="col"><Button style={{ backgroundColor: "transparent" }} onClick={() => this.renderAccounts("user id")}>User_id</Button></th>
                            <th scope="col"><Button style={{ backgroundColor: "transparent" }} onClick={() => this.renderAccounts("order")}>Order</Button></th>
                            <th scope="col"><Button style={{ backgroundColor: "transparent" }} onClick={() => this.renderAccounts("statement")}>Statement</Button></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderAccounts()}
                    </tbody>
                </Table>
                {this.state.modal ? (
                    <COAModal
                        activeItem={this.state.activeAccount}
                        toggle={this.toggle}
                        onSave={this.handleSubmit}
                        isAdd={this.state.isAdd}
                    />
                ) : null}
            </main>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.token !== null,
        token: state.token,
        is_admin: state.is_admin,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTryAutoSignin: () => dispatch(actionTypes.authCheckState()),
        logout: () => dispatch(actionTypes.authLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartAccountsTable)