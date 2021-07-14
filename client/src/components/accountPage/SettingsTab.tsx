import React from "react";
import {
  useLogoutMutation,
  MeQuery,
  MeDocument,
} from "../../generated/graphql";
import { setAccessToken } from "../../accessToken";

interface SettingsTabProps {}

export const SettingsTab: React.FC<SettingsTabProps> = () => {
  const [logout, { client }] = useLogoutMutation();

  const handleLogout = async () => {
    await logout();
    setAccessToken("");
    client!.writeQuery<MeQuery>({
      query: MeDocument,
      data: {
        me: null,
      },
    });
    localStorage.removeItem("serverId");
  };
  return (
    <div>
      <button className="rounded-btn sorrowful" onClick={() => handleLogout()}>
        Logout
      </button>
      <select defaultValue={"default"} style={{ width: "190px" }}>
        <option>private</option>
        <option>public</option>
      </select>
    </div>
  );
};
