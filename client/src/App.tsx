import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { RouteData } from "./data/Routes";
import "./css/master.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          {RouteData.map((each) => {
            return each?.notFound ? (
              <Route key={each.path}>{each.page}</Route>
            ) : (
              <Route key={each.path} exact path={each.path}>
                {each.page}
              </Route>
            );
          })}
        </Switch>
      </Router>
    </div>
  );
};

export default App;
