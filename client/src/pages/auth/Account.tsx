import React from "react";
import { setAccessToken } from "../../accessToken";
import { useAuth } from "../../contexts/AuthContext";
import {
  MeDocument,
  MeQuery,
  useLogoutMutation,
  useMeQuery,
} from "../../generated/graphql";

interface AccountProps {}

export const Account: React.FC<AccountProps> = () => {
  let body;

  const { currUser, setCurrUser } = useAuth()!;
  const [logout, { client }] = useLogoutMutation();

  if (currUser) {
    body = JSON.stringify(currUser);
  } else {
    body = "Not Logged In";
  }

  const handleLogout = async () => {
    await logout();
    setAccessToken("");
    client!.writeQuery<MeQuery>({
      query: MeDocument,
      data: {
        me: null,
      },
    });

    setCurrUser(null);

    client!.clearStore();
  };

  return (
    <div>
      <div>{body}</div>
      <button className="rounded-btn emphasized" onClick={() => handleLogout()}>
        Logout
      </button>
    </div>
  );
};
