import React, { useEffect } from "react";
import { useState } from "react";
import { setAccessToken } from "../../accessToken";
import { TabData, TabSwitcher } from "../../components/TabSwitcher";
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
  const [avatarSrc, setAvatarSrc] = useState<string>("");

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
  };

  useEffect(() => {
    const getAvatar = async () => {
      const { default: res } = await import(
        "../../assets/images/avatars/batman.svg"
      );
      setAvatarSrc(res);
    };
    getAvatar();
  }, []);

  let TABS: Array<TabData> = [
    {
      content: <img src={avatarSrc} />,
      title: "Information",
    },
    { content: "You did nothing", title: "Statistics" },
    {
      content: (
        <>
          <button
            className="rounded-btn emphasized"
            onClick={() => handleLogout()}
          >
            Logout
          </button>
        </>
      ),
      title: "Settings",
    },
  ];

  return (
    <div id="account-page">
      <div id="account-page-content-container">
        <TabSwitcher tabs={TABS} />
      </div>
    </div>
  );
};
