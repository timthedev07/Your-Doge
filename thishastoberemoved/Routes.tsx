import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./css/master.css";

// importing the pages
import { NotFound } from "../pages/NotFound";
import { Login } from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";
import { Home } from "../pages/Home";
import { Nav } from "../components/nav/Nav";
import { NewHomework } from "../pages/NewHomework";
// import { Dashboard } from "./pages/Dashboard";
import { Account } from "../pages/account/Account";
import { AuthControl } from "../contexts/AuthContext";
import { Confirm } from "../pages/auth/Confirm";
import { Me } from "../pages/account/Me";
import { Forgot } from "../pages/auth/Forgot";

export const Routes: React.FC = () => {
  return (
    <AuthControl>
      <Router>
        <Nav transparent={false} />
        <div className="App">
          <Switch>
            {/* Home */}
            <Route exact path="/" component={Home} />

            {/* User specific routes */}
            {/* <Route exact path="/dashboard" component={Dashboard} /> */}
            <Route path="/u/:username" component={Account} />
            <Route exact path="/account" component={Me} />

            {/* auth routes */}
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route path="/auth/confirm/:token" component={Confirm} />
            <Route exact path="/auth/confirm" component={Confirm} />
            <Route path="/auth/forgot-password/:token" component={Forgot} />
            <Route path="/auth/forgot-password" component={Forgot} />

            {/* homework routes */}
            <Route exact path="/new_homework" component={NewHomework} />

            {/* 404 */}
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    </AuthControl>
  );
};
