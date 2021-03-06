import React, { useEffect, useState } from "react";
import { Profile } from "../components/user/Profile";
import { SettingsTab } from "../components/user/SettingsTab";
import { TabSwitcher } from "../components/TabSwitcher";
import { TabData } from "../types/types";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";
import Head from "next/head";
import { Stats } from "../components/user/Stats";

const Account: React.FC = () => {
  const { authState, currentUser } = useAuth()!;
  const [currAvatarId, setCurrAvatarId] = useState<number>(
    currentUser?.avatarId || 0
  );

  const { push } = useRouter();

  useEffect(() => {
    const res = authState();
    if (res === "auth") {
      setCurrAvatarId(currentUser!.avatarId);
    } else if (res === "none") {
      push("/auth/login");
    }
  }, [currentUser, push, authState]);

  if (!currentUser) {
    return <></>;
  }

  const TABS: Array<TabData> = [
    {
      content: (
        <Profile
          avatarId={`${currAvatarId <= 15 ? currAvatarId : 0}` as any}
          bio={currentUser.bio}
          email={currentUser.email}
          username={currentUser.username}
          avatarIdSetter={setCurrAvatarId}
          age={currentUser.age}
        />
      ),
      title: "Profile",
    },
    { content: <Stats />, title: "Statistics" },
    {
      content: <SettingsTab username={currentUser.username} />,
      title: "Settings",
    },
  ];

  return (
    <>
      <Head>
        <title>Account | Your Doge</title>
      </Head>
      <div id="account-page">
        <div id="account-page-content-container">
          <TabSwitcher tabs={TABS} />
        </div>
      </div>
    </>
  );
};

export default Account;
