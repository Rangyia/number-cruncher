import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import UserModal from "./UserModal";
import API from '../api'

const userItems = [
    {
        id: 1,
        title: "Go to Market",
        description: "Buy ingredients to prepare dinner",
        deleted: true,
    },
    {
        id: 2,
        title: "Study",
        description: "Read Algebra and History textbook for the upcoming test",
        deleted: false,
    },
    {
        id: 3,
        title: "Sammy's books",
        description: "Go to library to return Sammy's books",
        deleted: true,
    },
    {
        id: 4,
        title: "Article",
        description: "Write article on how to use Django with React",
        deleted: false,
    },
];

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewDeleted: false,
            userList: [],
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
        API
            .delete(`/api/account/admin/users/${item.id}/`, item)
            .then((res) => this.refreshList());
    };

    createItem = () => {
        const item = { username: "", email: "", password: "", password2: "" };
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
            (item) => item.deleted == viewDeleted
        );

        return this.state.userList.map((item) => (
            <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
            >
                <span
                    className={`user-title mr-2 ${this.state.viewDeleted ? "completed-todo" : ""
                        }`}
                    title={item.username}
                >
                    {item.username}
                </span>
                <span
                    className={`user-title mr-2 ${this.state.viewDeleted ? "completed-todo" : ""
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