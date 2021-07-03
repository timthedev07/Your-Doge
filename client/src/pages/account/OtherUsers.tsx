import React, { useState } from "react";
import { ReadOnlyProfile } from "../../components/accountPage/ReadOnlyProfile";
import { Loading } from "../../components/Loading";
import { TabData, TabSwitcher } from "../../components/TabSwitcher";
import { useGetProfileQuery } from "../../generated/graphql";

interface OtherUsersProps {
  username: string;
}

export const OtherUsers: React.FC<OtherUsersProps> = ({ username }) => {
  const { data, loading } = useGetProfileQuery({ variables: { username } });
  const [currAvatarId] = useState<number>(data?.getProfile?.avatarId || 0);

  if (!data || !data.getProfile) {
    if (loading) return <Loading />;
    return <h1>User does not exist</h1>;
  }

  let TABS: Array<TabData> = [
    {
      content: (
        <ReadOnlyProfile
          avatarId={`${currAvatarId < 14 ? currAvatarId : 0}` as any}
          bio={data.getProfile.bio}
          email={data.getProfile.email}
          username={data.getProfile.username}
          age={data.getProfile.age}
        />
      ),
      title: "Information",
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
