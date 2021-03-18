import React, { useState, useEffect, Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "./routes";

// CSS
import './css/App.css'

// pages
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Dashboard from "./pages/Dashboard";

// apps
import Users from "./pages/admin/Users"
import ChartAccount from "./pages/coa/ChartAccount"

// components
import Sidebar from "./components/Sidebar"
import Navbar from "./components/Navbar"
import { Grid } from 'semantic-ui-react';

const RouteWithSidebar = ({ component: Component, ...rest}) => {

  return (
    <Route {...rest} render={props => (
      <div className="site-container">
        <Grid className="site-wrapper" columns='equal'>
          <Grid.Column className="site-sidebar" width={2}>
            <Sidebar />
          </Grid.Column>
          <Grid.Column className="site-content">
              <Navbar />
              <Component {...props}/>
          </Grid.Column>
        </Grid>
      </div>
    )}
    />
  );
};

export default () => (
    <Switch>
      {/* login */}
      <Route exact path={Routes.SignIn.path} component={SignIn} />
      <Route exact path={Routes.SignUp.path} component={SignUp} />
      
      {/* pages */}
      <RouteWithSidebar exact path={Routes.Dashboard.path} component={Dashboard}/>
      <RouteWithSidebar exact path={Routes.Users.path} component={Users} />
    <RouteWithSidebar exact path={Routes.ChartAccount.path} component={ChartAccount} />
    </Switch>
);