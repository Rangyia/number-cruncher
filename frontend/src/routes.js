
import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Layout";
import Login from "./components/Login";
import Signup from "./components/Signup";

export const BaseRouter = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
            </Switch>
        </div>
    );
};