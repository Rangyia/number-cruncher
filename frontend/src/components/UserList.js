import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import NewUserModal from "./NewUserModal";
import API from '../api'

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewDeleted: false,
            userList: [],
            editModal: false,
            modal: false,
            activeItem: {
                title: "",
                description: "",
                completed: false,
            },
        };
    }

    componentDidMount() {
        this.refreshList();
    }

    refreshList = () => {
        API
            .get("/api/account/admin/users/")
            .then((res) => this.setState({ userList: res.data }))
            .catch((err) => console.log(err));
    };

    toggle = () => {
        this.setState({ modal: !this.state.modal });
    };

    handleSubmit = (item) => {
        this.toggle();

        if (item.id) {
            API
                .put(`/api/account/admin/users/${item.id}/`, item)
                .then((res) => this.refreshList());
            return;
        }
        API
            .post("/api/account/register/", item)
            .then((res) => this.refreshList());
    };

    handleDelete = (item) => {

        if (item.is_active != false) {
            item.is_active = false;
            API
                .put(`/api/account/admin/users/${item.id}/`, item)
                .then((res) => this.refreshList());
            return;
        }

        API
            .delete(`/api/account/admin/users/${item.id}/`, item)
            .then((res) => this.refreshList());
    };

    createItem = () => {
        const item = { 
            username: "", 
            email: "", 
            password: "", 
            password2: "",
        };
        this.setState({ activeItem: item, modal: !this.state.modal });
    };

    editItem = (item) => {
        this.setState({ activeItem: item, modal: !this.state.modal });
    };

    displayCompleted = (status) => {
        if (status) {
            return this.setState({ viewDeleted: true });
        }

        return this.setState({ viewDeleted: false });
    };

    renderTabList = () => {
        return (
            <div className="nav nav-tabs">
                <span
                    className={this.state.viewDeleted ? "nav-link active" : "nav-link"}
                    onClick={() => this.displayCompleted(true)}
                >
                    Deleted
        </span>
                <span
                    className={this.state.viewDeleted ? "nav-link" : "nav-link active"}
                    onClick={() => this.displayCompleted(false)}
                >
                    Active
        </span>
            </div>
        );
    };

    renderItems = () => {
        const { viewDeleted } = this.state;
        const newItems = this.state.userList.filter(
            (item) => item.is_active != viewDeleted
        );

        return newItems.map((item) => (
            <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
            >
                <span
                    className={`user-title mr-2 ${this.state.viewDeleted ? "deleted-user" : ""
                        }`}
                    title={item.username}
                >
                    {item.username}
                </span>
                <span
                    className={`user-title mr-2 ${this.state.viewDeleted ? "deleted-user" : ""
                        }`}
                    title={item.username}
                >
                    {item.email}
                </span>
                <span>
                    <button
                        className="btn btn-secondary mr-2"
                        onClick={() => this.editItem(item)}
                    >
                        Edit
          </button>
                    <button
                        className="btn btn-danger"
                        onClick={() => this.handleDelete(item)}
                    >
                        Delete
          </button>
                </span>
            </li>
        ));
    };

    render() {
        return (
            <main className="container">
                <h1 className="text-uppercase text-center my-4">User List</h1>
                <div className="row">
                    <div className="col-md-6 col-sm-10 mx-auto p-0">
                        <div className="card p-3">
                            <div className="mb-4">
                                <button className="btn btn-primary"
                                    onClick={this.createItem}
                                    style={{ backgroundColor:"#4a5073"}}
                                >
                                    Add User
                                </button>
                            </div>
                            {this.renderTabList()}
                            <ul className="list-group list-group-flush border-top-0">
                                {this.renderItems()}
                            </ul>
                        </div>
                    </div>
                </div>
                {this.state.modal ? (
                    <NewUserModal
                        activeItem={this.state.activeItem}
                        toggle={this.toggle}
                        onSave={this.handleSubmit}
                    />
                ) : null}
            </main>
        );
    }
}

export default UserList;