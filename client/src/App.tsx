import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./css/master.css";
import "bootstrap/dist/css/bootstrap.min.css";
// importing the pages
import { NotFound } from "./pages/NotFound";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          {/* auth routes */}
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />

          {/* 404 */}
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
