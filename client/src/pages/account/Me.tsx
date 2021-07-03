import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { setAccessToken } from "../../accessToken";
import { Information } from "../../components/accountPage/Information";
import { Loading } from "../../components/Loading";
import { TabData, TabSwitcher } from "../../components/TabSwitcher";
import {
  useLogoutMutation,
  useMeQuery,
  MeQuery,
  MeDocument,
} from "../../generated/graphql";

interface MeProps {}

export const Me: React.FC<MeProps> = () => {
  const [logout, { client }] = useLogoutMutation();
  const { data, loading } = useMeQuery();
  const [currAvatarId, setCurrAvatarId] = useState<number>(
    data?.me?.avatarId || 0
  );
  useEffect(() => {
    if (data && data.me) {
      setCurrAvatarId(data.me.avatarId);
    }
  }, [data]);

  if ((!data || !data.me) && !loading) {
    return <Redirect to="/login" />;
  }

  if (!data || !data.me) {
    return <Loading />;
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
      content: (
        <>
          <button
            className="rounded-btn sorrowful"
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
