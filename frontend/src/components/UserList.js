import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import UserModal from "./UserModal";
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
        if (item.is_active == true) {
            item.is_active = false;
            API
                .put(`/api/account/admin/users/${item.id}/`, item)
                .then((res) => this.refreshList());
        }
        return;
    };

    handleActivate = (item) => {
        item.is_active = true;
        API
            .put(`/api/account/admin/users/${item.id}/`, item)
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
                    className={this.state.viewDeleted ? "nav-link" : "nav-link active"}
                    onClick={() => this.displayCompleted(false)}
                >
                    Active
        </span>
                    <span
                        className={this.state.viewDeleted ? "nav-link active" : "nav-link"}
                        onClick={() => this.displayCompleted(true)}
                    >
                                Deactive
                </span>
            </div>
        );
    };

    renderItems = () => {
        const { viewDeleted } = this.state;

        const isSuspended = (item_suspended_date) => {
            let date = new Date();
            const curr_date_str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
            const suspended_date = new Date(item_suspended_date);
            const curr_date = new Date(curr_date_str)

            if (suspended_date.getTime() < curr_date.getTime()) {
                return false;
            }
            return true;
        }

        const newItems = this.state.userList.filter(
            (item) => {

                // Activated
                if (item.is_active != viewDeleted) {

                    // If suspended and activated
                    if (isSuspended(item.suspended_end_date)) {
                        this.handleDelete(item)
                    }
                    return true;

                } else if (item.is_active != viewDeleted) {
                    return false;
                }
            }
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
                <span
                    className={`user-title mr-2 ${this.state.viewDeleted ? "deleted-user" : ""
                        }`}
                    title={item.first_name}
                >
                    {item.first_name}
                </span>
                <span
                    className={`user-title mr-2 ${this.state.viewDeleted ? "deleted-user" : ""
                        }`}
                    title={item.last_name}
                >
                    {item.last_name}
                </span>
                <span
                    className={`user-title mr-2 ${this.state.viewDeleted ? "deleted-user" : ""
                        }`}
                    title={item.address}
                >
                    {item.address}
                </span>
                <span>
                    <button
                        className="btn btn-secondary mr-2"
                        onClick={() => this.editItem(item)}
                    >
                        Edit
             </button>
                    {
                    !item.is_active ? 
                        <button
                            style={{backgroundColor: "green"}}
                            className="btn btn-secondary mr-2"
                                onClick={() => this.handleActivate(item)}
                        >
                            Activate
                        </button>
                        : 
                            <button
                                className="btn btn-danger"
                                onClick={() => this.handleDelete(item)}
                            >
                                Deactivate
                         </button>
                    }
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
                    <UserModal
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