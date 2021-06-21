import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./css/master.css";
import "bootstrap/dist/css/bootstrap.min.css";
// importing the pages
import { NotFound } from "./pages/NotFound";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { Home } from "./pages/Home";

export const Routes: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          {/* Home */}
          <Route exact path="/" component={Home} />

          {/* auth routes */}
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />

          {/* 404 */}
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
};
