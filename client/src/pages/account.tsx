import React, { useEffect, useState } from "react";
import { Information } from "../components/Information";
import { SettingsTab } from "../components/SettingsTab";
import { Loading } from "../components/Loading";
import { TabData, TabSwitcher } from "../components/TabSwitcher";
import { useMeQuery } from "../generated/graphql";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";

const Account: React.FC = () => {
  const { data, loading } = useMeQuery();
  const [currAvatarId, setCurrAvatarId] = useState<number>(
    data?.me?.avatarId || 0
  );

  const auth = useAuth()!;

  console.log(data, auth);

  const { push } = useRouter();

  useEffect(() => {
    if (data && data.me) {
      setCurrAvatarId(data.me.avatarId);
    }
  }, [data]);

  if (loading) {
    return <Loading />;
  }

  if (!data || !data.me) {
    push("/auth/login");
    return <></>;
  }

  let TABS: Array<TabData> = [
    {
      content: (
        <Information
          avatarId={`${currAvatarId <= 15 ? currAvatarId : 0}` as any}
          bio={data.me.bio}
          email={data.me.email}
          username={data.me.username}
          avatarIdSetter={setCurrAvatarId}
          age={data.me.age}
        />
      ),
      title: "Information",
    },
    { content: "You did nothing", title: "Statistics" },
    {
      content: <SettingsTab username={data.me.username} />,
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
