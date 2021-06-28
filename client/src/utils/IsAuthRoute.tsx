import React from "react";
import {
  Redirect,
  Route,
  RouteComponentProps,
  StaticContext,
} from "react-router";
import { useMeQuery } from "../generated/graphql";

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
  const { data } = useMeQuery();

  return (
    <Route
      render={() => {
        return data?.me ? component : <Redirect to="/login" />;
      }}
      exact={exact}
      path={path}
    />
  );
};
