import React, { useEffect, useState } from "react";
import { Information } from "../components/Information";
import { SettingsTab } from "../components/SettingsTab";
import { TabData, TabSwitcher } from "../components/TabSwitcher";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";

const Account: React.FC = () => {
  const { isAuth, currentUser } = useAuth()!;
  const [currAvatarId, setCurrAvatarId] = useState<number>(
    currentUser?.avatarId || 0
  );

  const { push } = useRouter();

  useEffect(() => {
    const res = isAuth();
    if (res !== undefined) {
      if (res === true) {
        setCurrAvatarId(currentUser!.avatarId);
        return;
      }
      console.log("BOYS");
    }
    // if (currentUser !== null) {
    //   if (currentUser) {
    //     setCurrAvatarId(currentUser!.avatarId);
    //   }
    // } else {
    //   return console.log("HEY");
    // }
  }, [currentUser, push, isAuth]);

  if (!currentUser) {
    return <></>;
  }

  let TABS: Array<TabData> = [
    {
      content: (
        <Information
          avatarId={`${currAvatarId <= 15 ? currAvatarId : 0}` as any}
          bio={currentUser.bio}
          email={currentUser.email}
          username={currentUser.username}
          avatarIdSetter={setCurrAvatarId}
          age={currentUser.age}
        />
      ),
      title: "Information",
    },
    { content: "You did nothing", title: "Statistics" },
    {
      content: <SettingsTab username={currentUser.username} />,
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

export default Account;
