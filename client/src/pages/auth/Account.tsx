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

  const [logout, { client }] = useLogoutMutation();
  const { data } = useMeQuery();

  if (data?.me) {
    body = JSON.stringify(data.me);
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
