import React, { Component } from "react";
import { render } from "react-dom";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loaded: false,
            placeholder: "Loading"
        };
    }

    componentDidMount() {
        fetch("api/user")
            .then(response => {
                if (response.status > 400) {
                    return this.setState(() => {
                        return { placeholder: "Something went wrong!" };
                    });
                }
                return response.json();
            })
            .then(data => {
                this.setState(() => {
                    return {
                        data,
                        loaded: true
                    };
                });
            });
    }

    render() {
        return (
            <div>
                <h1>Number Cruncher</h1>
            <ul>
                {this.state.data.map(user => {
                    return (
                        <div>
                            <li key={user.id}>
                                {user.username} - {user.password}
                            </li>
                        </div>
                    );
                })}
            </ul>
            </div>
        );
    }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);