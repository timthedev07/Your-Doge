import React from "react";
import {
  Redirect,
  Route,
  RouteComponentProps,
  StaticContext,
} from "react-router";
import { useAuth } from "../contexts/AuthContext";

interface AuthRouteProps {
  path: string;
  component:
    | React.ComponentType<any>
    | React.ComponentType<RouteComponentProps<any, StaticContext, unknown>>
    | undefined;
  exact: boolean;
}

export const AuthRoute: React.FC<AuthRouteProps> = ({
  path,
  exact,
  component,
}) => {
  const { currUser } = useAuth()!;

  return (
    <Route
      render={() => {
        return currUser ? component : <Redirect to="/login" />;
      }}
      exact={exact}
      path={path}
    />
  );
};
