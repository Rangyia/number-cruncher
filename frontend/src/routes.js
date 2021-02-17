
import React from "react";
import { Route, Switch } from "react-router-dom";

// Pages
import LoginPage from "./components/pages/LoginPage"
import SignupPage from "./components/signup/SignupPage"
import DashboardPage from "./components/pages/DashboardPage"

export const BaseRouter = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={LoginPage} />
                <Route exact path="/signup" component={SignupPage} />
                <Route exact path="/dashboard" component={DashboardPage} />
            </Switch>
        </div>
    );
};