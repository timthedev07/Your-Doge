import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./css/master.css";
import "bootstrap/dist/css/bootstrap.min.css";
// importing the pages
import { NotFound } from "./pages/NotFound";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { Home } from "./pages/Home";
import { Nav } from "./components/nav/Nav";

export const Routes: React.FC = () => {
  return (
    <Router>
      <Nav transparent={false} />
      <div className="App">
        <Switch>
          {/* Home */}
          <Route exact path="/" component={Home} />

          {/* auth routes */}
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />

          {/* 404 */}
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
};
