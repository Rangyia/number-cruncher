import React, { useState, useEffect } from 'react';
import { Route, Switch } from "react-router-dom";
import { Segment, Sidebar, Container } from 'semantic-ui-react'
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
import NavSideBar from "./components/NavSideBar"
import NavTopBar from "./components/NavTopBar"
import Footer from './components/Footer'
import TitleBar from './components/TitleBar'

const RouteWithSidebar = ({ component: Component, ...rest}) => {

  // side bar toggle state
  const [sideBarVisible, setSidebarVisible] = useState(true)

  const receiveChildValue = (value) => {
    setSidebarVisible(value);
  };

  return (
    <Route {...rest} render={props => (
        <Sidebar.Pushable as={Segment} className="site-container">
          <NavSideBar sideBarVisible={sideBarVisible}/>
          <Sidebar.Pusher>
            <NavTopBar fromChildToParentCallBack={receiveChildValue} sideBarVisibility={sideBarVisible} />
            <div className="site-views">
              <Component {...props} />
              <Footer />
            </div>
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
      <RouteWithSidebar exact path={Routes.Dashboard.path} component={Dashboard} />
      <RouteWithSidebar exact path={Routes.Users.path} component={Users} />
      <RouteWithSidebar exact path={Routes.ChartAccount.path} component={ChartAccount} />
    </Switch>
);