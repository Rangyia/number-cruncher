import React, { useState, useEffect, Component, useCallback } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { Header, Icon, Image, Menu, Segment, Sidebar, SidebarPushable, SidebarPusher } from 'semantic-ui-react'
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
import NavSidebar from "./components/Sidebar"
import Navbar from "./components/Navbar"
import { Grid } from 'semantic-ui-react';

const RouteWithSidebar = ({ component: Component, ...rest}) => {
  const [sideBarVisible, setSidebarVisible] = useState(true)

  const sidebarWrapper = useCallback(
    (visible) => {
      setSidebarVisible(visible);
    },
    [sideBarVisible]
  );

  return (
    <Route {...rest} render={props => (
        <Sidebar.Pushable as={Segment} className="site-container">
          <NavSidebar visible={sideBarVisible}/>
          <Sidebar.Pusher>
            <Navbar 
            sideBarVisible={sideBarVisible}
            setSidebarVisible={sidebarWrapper} />
            <Component {...props}/>
          </Sidebar.Pusher>
      </Sidebar.Pushable>
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