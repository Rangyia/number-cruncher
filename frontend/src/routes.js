
import React from "react";
import { Routes, Route, Switch } from "react-router-dom";

// Pages
import SignupPage from "./components/pages/SignupPage"

// Layouts
import MainLayout from './layouts/MainLayout'
import DashboardLayout from './layouts/DashboardLayout'

export const BaseRouter = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={MainLayout} />
                <Route exact path="/signup" component={SignupPage} />
                <Route exact path="/dashboard" component={DashboardLayout} />
            </Switch>
        </div>
    );
};